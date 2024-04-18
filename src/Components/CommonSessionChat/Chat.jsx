import React, { useEffect, useState, useRef } from 'react';
import Scrollbar from "../Common/Scrollbar/Scrollbar.jsx";
import MessageInput from "../Common/MessageInput/MessageInput.jsx";
import Message from "./Message/Message.jsx";
import './CommonSessionChat.css';
import EmptyNavbar from "../Navbar/EmptyNavbar.jsx";
import {useSocket} from "../../Context/SocketContext.jsx";

const Chat = () => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const [value, setValue] = useState("");
    const socket = useSocket();
    const [messages, setMessages] = useState([]);
    // const [joined, setJoined] = useState(false);
    const [sender, setSender] = useState("mongia");
    const [typing, setTyping] = useState('');
    const messagesEndRef = useRef(null);
    const [nbNestedReplies, setNbNestedReplies] = useState(0);

    useEffect(() => {
        const join = () => {
            socket?.emit('join', sender, () => {
                console.log('joined');
            });
        };
        join();
    }, [socket]);


    let timeout;
    const emitTyping = () => {
        socket?.emit('typing', {isTyping: true});
        timeout = setTimeout(() => {
            socket?.emit('typing', {isTyping: false});
        },2000);
    }
    useEffect(() => {
        const handleTyping = (data) => {
            if (data.isTyping) {
                setTyping(data.sender);
            } else {
                setTyping('');
            }
        };

        socket?.on('typing', handleTyping);

        return () => {
            socket?.off('typing', handleTyping);
        };
    }, [socket]);
    const send = (message) => {
        socket?.emit('message', message, (response) => {
            if (response.error) {
                console.error('Error sending message:', response.error);
            }
        });
    };
    const deleteMsg = (id)=>{
        socket?.emit('deleteMessage',id);
    }

    const getAllMessages = () => {
        socket?.emit('findAllMessages', (messages) => {
            setMessages(messages);
        });
    };
    useEffect(() => {
        getAllMessages();
    }, [socket]);

    useEffect(() => {
        socket?.on('allMessages', (messages) => {
            setMessages(messages);
        });

        return () => {
            socket?.off('allMessages');
        };
    }, [socket]);


    const messageListener = (data) => {
        setMessages(data);
        scrollToBottom();
    };

    useEffect(()=> {
        socket?.on('message', messageListener);
        return () => {
            socket?.off('message', messageListener);
        }
    },[messageListener])

    useEffect(()=> {
        socket?.on('deletedMessage', messageListener);
        return () => {
            socket?.off('deletedMessage', messageListener);
        }
    },[messageListener])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (value.trim() !== "") {
            send({content:value});
            setValue("");
        }
    }

    const handleValueChange = (e) => {
        emitTyping();
        setValue(e.target.value);
    }

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView();
    };

    return (
        <EmptyNavbar width={'27rem'}>
            <div className="common-chat d-flex flex-column align-items-center justify-content-between">
                <div className="d-flex flex-column align-items-center">
                    <h1 className="text-center fw-bold">
                        Questions & Answers
                    </h1>
                    <hr className="mt-2" style={{width: "70%"}}/>
                </div>


                <Scrollbar thumbColor={"#692E5F"} trackColor={"#F0EDF2"} maxHeight={`${screenWidth >992 ? '65vh':'100vh'}`}>
                    <div className="messages" >
                        {messages.map((message, index) => (
                            <Message
                                key={index}
                                deleteMsg={deleteMsg}
                                message={message}
                                isStudent={true}
                                send={send}
                                emitTyping={emitTyping}
                                nbNestedReplies={nbNestedReplies}
                                pickerUnderInput={index === 0 || index === 1}
                            />
                        ))}

                        <div ref={messagesEndRef}></div>
                    </div>
                </Scrollbar>


                <div className="container">
                    <div >
                        {typing && (
                        <div className="typing d-flex px-4 mt-2">
                            <div className="typing d-flex align-items-center">
                                {typing} is typing
                            </div>
                            <div className="typing-indicator">
                                <div className="typing-circle"></div>
                                <div className="typing-circle"></div>
                                <div className="typing-circle"></div>
                                <div className="typing-shadow"></div>
                                <div className="typing-shadow"></div>
                                <div className="typing-shadow"></div>
                            </div>
                        </div>
                        )}
                    </div>
                    <hr className="mb-3 mt-2"/>
                    <MessageInput
                        handleSubmit={handleSubmit}
                        handlePromptChange={handleValueChange}
                        prompt={value}
                        setPrompt={setValue}
                        fromChatBot={false}
                    />
                </div>
            </div>
        </EmptyNavbar>
    );
};

export default Chat;