import React, { useEffect, useState, useRef } from 'react';
import Scrollbar from "../Common/Scrollbar/Scrollbar.jsx";
import io from "socket.io-client";
import axios from "axios";
import NotificationCard from "../Notification/NotificationCard.jsx";
import MessageInput from "../Common/MessageInput/MessageInput.jsx";
import Message from "./Message/Message.jsx";
import './CommonSessionChat.css';
import EmptyNavbar from "../Navbar/EmptyNavbar.jsx";
import {useSocket} from "../../Context/SocketContext.jsx";

const Chat = () => {
    const [value, setValue] = useState("");
    const socket = useSocket();
    const [messages, setMessages] = useState([]);
    const [joined, setJoined] = useState(false);
    const [sender, setSender] = useState("mongia");
    const [typing, setTyping] = useState('');
    const messagesEndRef = useRef(null);
    const [nbNestedReplies, setNbNestedReplies] = useState(0);

    const join = () => {
        socket?.emit('join', sender,() => {
            setJoined(true);
        });
        console.log('joined');
    }

    let timeout;
    const emitTyping = () => {
        socket?.emit('typing', {isTyping: true});
        timeout = setTimeout(() => {
            socket?.emit('typing', {isTyping: false});
        },2000);
    }

    const send = (message) => {
        socket?.emit('message', message);
    }

    const getAllMessages = () => {
        socket?.emit('findAllMessages', (messages) => {
            setMessages(messages);
        });
    }

    useEffect(()=>{
        socket?.emit('findAllMessages', (messages) => {
            setMessages(messages);
        });
    }, [socket]);

    useEffect(() => {
        join();
    }, [socket]);

    const messageListener = () => {
        getAllMessages();
    }

    useEffect(() => {
        socket?.on('typing', (data) => {
            if (data.isTyping) {
                setTyping(data.sender);
            } else {
                setTyping('');
            }
        });
    }, [socket]);

    useEffect(()=> {
        socket?.on('message', messageListener);
        return () => {
            socket?.off('message', messageListener);
        }
    },[messageListener])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (value !== "") {
            send({message:value});
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

    useEffect(() => {
        scrollToBottom();
    }, [typing]);

    return (
        <EmptyNavbar width={'27rem'}>
            <div className="common-chat d-flex flex-column align-items-center justify-content-around">
                <h1 className="text-center fw-bold">
                    Questions & Answers
                </h1>
                <hr className="mt-2" style={{width: "70%"}}/>
                <Scrollbar thumbColor={"#692E5F"} trackColor={"#F0EDF2"} maxHeight={"65vh"}>
                    <div className="messages">
                        {messages.map((message, index) => (
                            <Message
                                key={index}
                                message={message}
                                isStudent={true}
                                send={send}
                                getAllMessages={getAllMessages}
                                emitTyping={emitTyping}
                                nbNestedReplies={nbNestedReplies}
                            />
                        ))}
                        {typing && (
                            <div className="typing d-flex">
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
                        <div ref={messagesEndRef}></div>
                    </div>
                </Scrollbar>

                <div className="container">
                    <hr className="mb-3 mt-2"/>
                    <MessageInput
                        handleSubmit={handleSubmit}
                        handlePromptChange={handleValueChange}
                        prompt={value}
                        setPrompt={setValue}
                        // setPrompt={setValue}
                        fromChatBot={false}
                    />
                </div>
            </div>
        </EmptyNavbar>
    );
};

export default Chat;
