import {useState} from 'react';
import {MdOutlineAddPhotoAlternate} from "react-icons/md";
import {PiPaperPlaneTiltBold} from "react-icons/pi";
import "./MessageInput.css";
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import { MdOutlineEmojiEmotions } from "react-icons/md";


// eslint-disable-next-line react/prop-types
const MessageInput = (
    {
        handleSubmit,
        handleIconClick,
        prompt,
        setPrompt,
        fileInputRef,
        handleFileChange,
        handlePromptChange,
        selectedImage,
        fromChatBot
    }) => {
    const [showPicker, setShowPicker] = useState(false);
    const openClosePicker = ()=>{
        setShowPicker(!showPicker);
    }
    const onEmojiClick = (emojiObject)=>{
        const newPrompt = prompt + emojiObject.native;
        setPrompt(newPrompt);
        openClosePicker();
    }
    return (
        <form className="prompt-form" onSubmit={handleSubmit}>
            <div className="container box-container d-flex flex-column">
                {selectedImage && (
                    <img src={URL.createObjectURL(selectedImage)} alt="Selected Image" style={{width:"15%",height:"auto"}} />
                )}
                <div className="row mt-1">
                        <div
                            className="col-sm-9 send-input-chatbot mb-1 p-0 d-flex align-items-center justify-content-center">
                                <textarea
                                    autoFocus
                                    rows="1"
                                    placeholder={`${fromChatBot? 'Ask AcademIQa Bot ...' : 'Type a message ...'}`}
                                    value={prompt}
                                    onChange={handlePromptChange}
                                />
                        </div>
                        <div className="col-sm-3 d-flex justify-content-end">
                            {fromChatBot ? (<div
                                    className="add-image p-2 formatting sendIconButton d-flex justify-content-center align-items-center">
                                    <MdOutlineAddPhotoAlternate size={27} onClick={handleIconClick}/>
                                    <input
                                        type="file"
                                        className="image-prompt"
                                        accept="image/*"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                    />
                                </div>)
                                : <>
                                    {showPicker && <div className="emoji-picker">
                                        {/*<Picker*/}
                                        {/*    data={data}*/}
                                        {/*    previewPosition={"top"}*/}
                                        {/*    onEmojiSelect={onEmojiClick}*/}
                                        {/*    theme={'dark'}*/}
                                        {/*/>*/}
                                        <Picker set='apple' />
                                    </div>}
                                    <div
                                        className=" p-2 formatting sendIconButton d-flex justify-content-center align-items-center">
                                        <MdOutlineEmojiEmotions size={27} onClick={openClosePicker}/>
                                    </div>
                                </>
                            }
                            <div
                                className="send-prompt  p-0 formatting d-flex justify-content-center align-items-center">
                                <button type="submit" className="sendIconButton" >
                                    <PiPaperPlaneTiltBold size={26} />
                                </button>
                            </div>
                        </div>
                </div>
            </div>
        </form>
    );
};

export default MessageInput;