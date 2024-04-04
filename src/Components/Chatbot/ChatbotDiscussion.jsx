import React, {useEffect, useRef, useState} from 'react';
import Scrollbar from "../Common/Scrollbar/Scrollbar";
import Markdown from "react-markdown";
import axios from "axios";
import LoaderPen from "../Common/LoaderPencil/loader.jsx";
import Loader from "../Common/Loader/loader.jsx";
import MessageInput from "../Common/MessageInput/MessageInput.jsx";
import Sellaouti from "../../assets/images/Sellaouti.jpg";
import chatbotMsg from "../../assets/images/chatbot-msg.png";
import NoDiscussions from "../../assets/images/NoDiscussions.svg"
// eslint-disable-next-line react/prop-types
const ChatbotDiscussion = ({discussion,getDiscussions}) => {
    const [prompt, setPrompt] = useState('');
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // State to track if conversation is loading
    const discussionContainerRef = useRef(null); // Reference to discussion container
    const fileInputRef = useRef(null); // Reference to hidden file input
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };


    const config = {
        headers: {
            "Content-Type": "multipart/form-data", // Set the content type for the FormData
        },
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await setIsLoading(true);
        scrollToBottom();
        const data = {
            prompt: prompt,
            discussionId: discussion?.id,
            image: image
        }
        console.log('Form Data:', data);

        try {
            const res = await axios.post('http://localhost:5000/chat', data, config);
            setPrompt('');
            setImage(null);
            setIsLoading(false);
            console.log('Response:', res.data);
            getDiscussions();
            // const updatedConversationHistory = [
            //     ...discussion.conversationHistory,
            //     {
            //         id: discussion.conversationHistory.length + 1,
            //         prompt: res.data.prompt,
            //         response: res.data.response,
            //         image: res.data.image
            //     }
            // ];
            //
            // // Update the discussion with the new conversation history
            // onUpdateDiscussion({
            //     ...discussion,
            //     conversationHistory: updatedConversationHistory
            // });

            console.log('Discussion:', discussion);

        } catch (error) {
            console.error('Error:', error);
            setIsLoading(false);
        }
        fileInputRef.current.value = null;
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleIconClick = () => {
        fileInputRef.current.click(); // Trigger click on hidden file input
    };
    const handlePromptChange = (e) => {
        setPrompt(e.target.value);
    }



    return (
        <div className="discussion container p-3 pt-0 pb-2 d-flex flex-column justify-content-between">
            <Scrollbar thumbColor={"#692E5F"} trackColor={"#F0EDF2"} maxHeight={"310px"}>
                <div ref={discussionContainerRef} className="container p-0" id="discussion-container">
                    {discussion && discussion.conversationHistory ? discussion.conversationHistory.map((message, index) => (
                        <div key={index}>
                            <div className="d-flex align-items-start prompt p-2 px-3 me-1 mb-3 ">
                                <img
                                    className=" p-0 rounded-circle img"
                                    src={Sellaouti}
                                    alt="sender"
                                    width={100}
                                    height={100}
                                    style={{width: '38px', height: '38px'}}
                                />

                                <div className="ps-3 d-flex flex-column">
                                    {message.prompt}
                                    {message.image && (<img src={`http://localhost:5000/${message.image}`}
                                                            style={{maxWidth: '40%', height: 'auto'}}
                                                            alt={"image-prompt"}/>)}
                                </div>
                            </div>
                            <div className="d-flex align-items-start prompt p-2 px-3 me-1 mb-3">
                                <img
                                    className="p-0 rounded-full img chatbot"
                                    src={chatbotMsg}
                                    alt="sender"
                                    width={100}
                                    height={100}
                                    style={{width: '35px', height: '53px'}}
                                />

                                <div className="response-ul ps-3">
                                    <Markdown>{message.response}</Markdown>
                                </div>
                            </div>
                        </div>
                    )) : null
                    }
                    {isLoading && (
                        <div ref={messagesEndRef} className="row prompt p-2 px-3 me-1 mb-3">
                            <div className="d-flex align-items-center">
                                <div className="me-2"><LoaderPen/></div>
                                <Loader/>
                            </div>
                        </div>
                    )}

                </div>

            </Scrollbar>

            <div className="container">
                <hr className="mb-2 mt-2"/>

                <MessageInput
                    fileInputRef={fileInputRef}
                    handleFileChange={handleFileChange}
                    handleSubmit={handleSubmit}
                    handlePromptChange={handlePromptChange}
                    handleIconClick={handleIconClick}
                    prompt={prompt}
                    selectedImage={image}
                    fromChatBot={true}
                />
            </div>
        </div>
    );
};

export default ChatbotDiscussion;