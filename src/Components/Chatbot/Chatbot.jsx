import { useEffect, useState } from 'react';
import PopUp from "../Common/PopUp/PopUp";
import OldDiscussions from "./OldDiscussions.jsx";
import ChatbotDiscussion from "./ChatbotDiscussion.jsx";
import './Chatbot.css';
import chatbotChatbot from "../../assets/images/chatbot-chatbot.svg";

const Chatbot = () => {
    const [discussionId, setDiscussionId] = useState(1);
    const [discussions, setDiscussions] = useState([
        {
            id: 1,
            conversationHistory: [
                {
                    id: 1,
                    prompt: 'Hello',
                    response: 'Hello, how can I help you?',
                },
            ]
        },
        {
            id: 2,
            conversationHistory: [
                {
                    id: 1,
                    prompt: 'I need help with my assignment I need help with my assignment I need help with my assignment ',
                    response: 'Sure, I can help you with that. Please provide me with the assignment details. Sure, I can help you with that. Please provide me with the assignment details. Sure, I can help you with that. Please provide me with the assignment details.',
                }
            ]
        }
    ]);
    const [isMediumScreen, setIsMediumScreen] = useState(window.innerWidth < 906);

    useEffect(() => {
        const handleResize = () => setIsMediumScreen(window.innerWidth < 906);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const updateDiscussion = (updatedDiscussion) => {
        setDiscussions(prevDiscussions =>
            prevDiscussions.map(disc =>
                disc.id === updatedDiscussion.id ? updatedDiscussion : disc
            )
        );
    };

    return (
        <PopUp width={"77vw"}>
            <div className="mx-2">
                <div className="container d-flex flex-column justify-content-center align-items-center ">
                    <div
                        className={`Welcome row mb-4 p-0 d-flex justify-content-center align-items-center rounded-5`}>
                        <div className="title row p-0 col-10 d-flex flex-column justify-content-end align-items-center">
                            <h1 className={`p-0 pe-2 fw-bold text-center`}> Welcome to AcademIQa Bot </h1>
                            {!isMediumScreen ? (<span
                                className="d-flex flex-column mt-1 justify-content-end align-items-end fw-semibold"> Gemini-Pro</span>) : null}
                        </div>

                        {!isMediumScreen ? (<div className="col-2 p-0">
                            <img
                                src={chatbotChatbot}
                                alt="Chatbot"
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </div>) : null}

                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-2 col-md-2 ps-0 pe-1 mb-1">
                            <OldDiscussions onDiscussionSelect={setDiscussionId} />
                        </div>
                        <div className="col-lg-10 col-md-10 pe-0 ps-1 mb-1">
                            <ChatbotDiscussion
                                discussion={discussions.find(item => item.id === discussionId)}
                                onUpdateDiscussion={updateDiscussion}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </PopUp>
    );
};

export default Chatbot;
