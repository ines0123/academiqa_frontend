import {BsReplyFill} from "react-icons/bs";
import {AiOutlineMessage} from "react-icons/ai";
import {useState} from "react";
import MessageInput from "../../Common/MessageInput/MessageInput.jsx";
import './Message.css'
import Sellaouti from "../../../assets/images/Sellaouti.jpg";
import DeleteButton from "../../Common/DeleteButton/DeleteButton.jsx";


// eslint-disable-next-line react/prop-types
const Message = ({message, isStudent, send,getAllMessages,emitTyping,nbNestedReplies}) => {
    const [viewReplies, setViewReplies] = useState(false);
    const [viewReplyForm, setViewReplyForm] = useState(false);
    const [value, setValue] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        if (value !== "") {
            send({message:value, parentId:message.id});
            getAllMessages();
            setValue("");
            setViewReplies(true);
            setViewReplyForm(false);
        }
    }

    const handleValueChange = (e) => {
        emitTyping();
        setValue(e.target.value);
    }

    const handleViewReplies = () => {
        setViewReplies(!viewReplies);
    }
    const handleViewReplyForm = () => {
        setViewReplyForm(!viewReplyForm);
    }
    return (
        <div className="message pb-0 pt-4 px-3 me-1 d-flex flex-column">
            <div className="d-flex">
                <img
                    className="rounded-circle img "
                    src={Sellaouti}
                    alt="sender"
                />
                <div className="sender-message">
                    <div className="message-sender ms-3 mb-1">
                        {message.sender}
                    </div>
                    <div className="d-flex justify-content-center">
                        <div
                            className={`message-content rounded-4 px-3 pt-1 pb-1 ms-2 ${isStudent ? 'light' : 'dark'}`}>
                            {message.message}
                        </div>
                        <div className="delete-msg" >
                            <DeleteButton/>
                        </div>
                    </div>

                </div>
            </div>
            <div className="under-msg">
                <div className="reply-view d-flex align-items-center mt-1">
                    {message.replies?.length > 0 && (
                        <div className="view-button d-flex align-items-center me-4" onClick={handleViewReplies}>
                            <div className={`view-replies me-1 ms-2 ${viewReplies ? '' : 'active'}`}
                                 style={{transform: 'rotate(190deg)', color: `${viewReplies ? '' : '#717171'}`}}>
                                <BsReplyFill size={25}/>
                            </div>
                            <span style={{color: `${viewReplies ? '' : '#717171'}`}}>
                                {viewReplies ? `Hide replies` : `View replies`}
                            </span>
                        </div>)}

                    {nbNestedReplies < 3 &&(<div className="reply-button d-flex align-items-center" onClick={handleViewReplyForm}>
                        <div className={`reply me-1 mb-1 ${viewReplyForm ? '' : 'active'}`}>
                            <AiOutlineMessage size={20}/>
                        </div>
                        <span style={{color: `${viewReplyForm ? '' : '#717171'}`}}>Reply</span>
                    </div>)}

                </div>
                {message?.replies?.length > 0 && (
                    <div>
                        {viewReplies &&
                            message.replies.map((reply, index) => (
                                <Message
                                    key={index}
                                    message={reply}
                                    emitTyping={emitTyping}
                                    send={send}
                                    getAllMessages={getAllMessages}
                                    nbNestedReplies={nbNestedReplies + 1}
                                />
                            ))}
                    </div>

                )}
                <div className="reply-input">
                    {viewReplyForm && nbNestedReplies < 3 && (
                        <MessageInput
                            handleSubmit={handleSubmit}
                            handlePromptChange={handleValueChange}
                            prompt={value}
                            setPrompt={setValue}
                            fromChatBot={false}
                        />
                    )}
                </div>
            </div>
            </div>
    );
};

export default Message;