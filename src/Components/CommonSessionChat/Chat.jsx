import React, {useContext, useEffect, useRef, useState} from 'react';
import Scrollbar from "../Common/Scrollbar/Scrollbar.jsx";
import MessageInput from "../Common/MessageInput/MessageInput.jsx";
import Message from "./Message/Message.jsx";
import './CommonSessionChat.css';
import EmptyNavbar from "../Navbar/EmptyNavbar.jsx";
import {useSocket} from "../../Context/SocketContext.jsx";
import {CurrentUser} from "../../Context/CurrentUserContext.jsx";

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
    const {user,currentUser} = useContext(CurrentUser);
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
        console.log("message deleted", id)
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
        setMessages((prevMessages) => {
            const handleReply = (messages) => {
                return messages.map((message) => {
                    if (message.id === data.parent?.id) {
                        return {
                            ...message,
                            replies: [...(message.replies || []), data],
                        };
                    }

                    if (message.replies) {
                        return {
                            ...message,
                            replies: handleReply(message.replies),
                        };
                    }

                    return message;
                });
            };
            if (data.parent) {
                return handleReply(prevMessages);
            } else {
                return [...prevMessages, data];
            }
        });

        // Scroll to bottom (assuming this is defined elsewhere)
        scrollToBottom();
    };



    useEffect(()=> {
        socket?.on('message', messageListener);
        return () => {
            socket?.off('message', messageListener);
        }
    },[messageListener])
    const handleDeletedMessage = (id) => {
        setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== id));
    };
    useEffect(()=> {
        socket?.on('deletedMessage', handleDeletedMessage);
        return () => {
            socket?.off('deletedMessage', handleDeletedMessage);
        }
    },[handleDeletedMessage])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (value.trim() !== "") {
            send({content:value, author: currentUser});
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