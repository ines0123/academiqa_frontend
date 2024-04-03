import MessageInput from "../Common/MessageInput/MessageInput.jsx";
import Scrollbar from "../Common/Scrollbar/Scrollbar.jsx";
import Message from "./Message/Message.jsx";
import './CommonSessionChat.css'
import {useState} from "react";
const Chat = () => {
    const [messages, setMessages] = useState([
        {
            message: "Hello",
            sender: "user",
            replies: [
                {
                    message: "Hi",
                    sender: "prof",
                    replies: [
                        {
                            message: "How are you How are you How are you How are you?",
                            sender: "prof"
                        },
                        {
                            message: "I am fine",
                            sender: "user"
                        },
                    ]
                },
                {
                    message: "How are you?",
                    sender: "prof"
                },
                {
                    message: "I am fine",
                    sender: "user"
                },
            ]
        },
        {
            message: "Hi",
            sender: "prof"
        },
        {
            message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa dicta eos harum magni ullam?\n" +
                "                        Cum delectus distinctio eaque facere iste possimus, quibusdam quo repellat repellendus\n" +
                "                        tempore. Deserunt dolorum quaerat vero.",
            sender: "user"
        },
        {
            message: "I am fine",
            sender: "prof"
        },
        ]);
    const [value, setValue] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        if (value !== "") {
            setValue("");
            setMessages([...messages, {message: value, sender: "user"}]);
        }
    }
    const handleValueChange = (e) => {
        setValue(e.target.value);
    }
    return (
        <div className="container d-flex flex-column align-items-center">
            <h1 className="text-center fs-1 fw-bold">
                Questions & Answers
            </h1>
            <hr className="mt-2 mb-2" style={{width:"50%"}}/>
            <Scrollbar thumbColor={"#692E5F"} trackColor={"#F0EDF2"} maxHeight={"60vh"}>
                <div className="container" style={{backgroundColor:"#D1C4D8"}}>
                    {messages.map((message, index) => (
                        <Message key={index} message={message} isStudent={false}/>
                    ))}

                </div>

            </Scrollbar>

            <div className="container">
                <hr className="mb-2 mt-2"/>

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
    );
};

export default Chat;