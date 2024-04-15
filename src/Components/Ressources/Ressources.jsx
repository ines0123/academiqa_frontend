import "./Ressources.css"
import React, {useState} from 'react';
import AddButton from "../Common/AddButton/AddButton.jsx";
import Scrollbar from "../Common/Scrollbar/Scrollbar.jsx";
import {FaRegFile} from "react-icons/fa6";
import {TbWorldWww} from "react-icons/tb";
import {RxDownload} from "react-icons/rx";
import {FaDeleteLeft} from "react-icons/fa6";
import noRessources from "../../assets/images/no-ressources.svg";

function Ressources({role}) {

    const [files, setFiles] = useState([]);
    const handleFileSelect = (fileOrLink) => {
        // Here you can perform any operations with the selected file,
        // such as uploading it to a server or passing it to another component.
        if (typeof fileOrLink === 'string') {
            // Link submission
            setFiles([...files, {name: fileOrLink, type: 'link'}]);
        } else
            // File selection
        {
            // Add the file to the state
            setFiles([...files, fileOrLink]);
        }
    };

    const handleDownload = (fileIndex) => {
        const file = files[fileIndex];
        window.open(file.name, '_blank');
    };

    const handleDelete = (fileIndex) => {
        const newFiles = [...files];
        newFiles.splice(fileIndex, 1);
        setFiles(newFiles);
    }

    return (
        <div className="ressources-box h-[250px] ">
            <div className="ressources-title pl-4 pr-5 flex font-IstokWebRegular font-semibold ">
                <div className="overflow-hidden max-w-40 mr-2.5 mb-2"
                     title="Ressources"
                >
                    Ressources
                </div>
                { role === 'teacher' && (<AddButton onFileSelect={handleFileSelect} onLinkAdd={handleFileSelect}/>)}
            </div>
            <div className="ressources-content container ">
                <Scrollbar
                    trackColor="rgba(233, 177, 176, 0.25)"
                    thumbColor="rgba(233, 177, 176, 0.60)"
                    maxHeight="170px"
                >
                    {files.length === 0 && (
                        <div className="no-ressources max-h-52 w-1/2 mx-auto mt-10 ">
                            <img src={noRessources} alt="No ressources"/>
                        </div>
                    )}
                    {files.map((file, index) => (

                        <div key={index}>
                            {!(file.name.toLowerCase().includes('http')) ? (
                                <div
                                    className="ressources-file max-w-72 max-h-11 p-2 flex rounded-full mx-3.5 mb-2 ">
                                    <FaRegFile className="file-icon grow-0 min-w-7 min-h-7 ml-3.5 mr-2"/>
                                    <button
                                        className="text-left pt-1 font-IstokWebRegular grow max-h-7 max-w-[180px] truncate overflow-hidden text-ellipsis hover:font-semibold"
                                        title={file.name}
                                        onClick={() => handleDownload(index)}
                                    >
                                        {file.name}
                                    </button>
                                    <button className="ressources-icon grow-0 container max-w-4"
                                            onClick={() => handleDownload(index)}>
                                        <RxDownload className="min-w-4 min-h-4 hover:scale-110 "/>
                                    </button>
                                    {
                                        role === 'teacher' && (
                                            <button className="file-delete-button container max-w-4 "
                                                    onClick={() => handleDelete(index)}>
                                                <FaDeleteLeft className="ressources-icon  min-w-4 min-h-4 grow-0 hover:scale-110"/>
                                            </button>
                                        )
                                    }
                                </div>
                            ) : (
                                <div className="ressources-file max-w-72 p-2 flex  rounded-full mx-3.5 mb-3">
                                    <TbWorldWww className="file-icon grow-0 min-w-7 min-h-7 ml-3.5 mr-2"/>
                                    <button
                                        className="text-left pt-1 font-IstokWebRegular grow max-h-7 max-w-[180px] truncate overflow-hidden text-ellipsis hover:font-semibold"
                                        title={file.name}
                                        onClick={() => handleDownload(index)}
                                    >
                                        {file.name}
                                    </button>
                                    {
                                        role === 'teacher' && (
                                            <button className="file-delete-button container grow-0 max-w-4 "
                                                    onClick={() => handleDelete(index)}>
                                                <FaDeleteLeft className="ressources-icon  min-w-4 min-h-4 hover:scale-110"/>
                                            </button>
                                        )
                                    }
                                </div>
                            )}

                        </div>
                    ))}
                </Scrollbar>
            </div>
        </div>
    );
}

export default Ressources;
