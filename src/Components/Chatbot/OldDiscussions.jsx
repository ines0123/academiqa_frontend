import {BiSolidMessageSquareAdd} from "react-icons/bi";
import Scrollbar from "../Common/Scrollbar/Scrollbar";
import {useEffect, useState} from "react";
import Discussion from "../../assets/images/old-discussion.svg";

// eslint-disable-next-line react/prop-types
const OldDiscussions = ({onDiscussionSelect, discussions}) => {

    const [isMediumScreen, setIsMediumScreen] = useState(window.innerWidth < 768);
    useEffect(() => {
        const handleResize = () => setIsMediumScreen(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const handleDiscussionClick = (id) => {
        if (onDiscussionSelect) {
            onDiscussionSelect(id);
        }
    }
    const createNewDiscussion = () => {
        if (onDiscussionSelect) {
            onDiscussionSelect(null);
        }
    }

    return (
        <div className={`${isMediumScreen ? 'small' : 'large'} historique p-1 pt-2`}>
            <div
                className="mt-2 d-flex justify-content-center align-items-lg-start align-items-md-center  cursor-pointer flex-lg-row  flex-md-column  "
                onClick={createNewDiscussion}
            >
                <div>
                    <BiSolidMessageSquareAdd size={25}/>
                </div>
                <p className="fw-bold ps-1 mt-1 text-sm-center">New discussion</p>
            </div>
            <p className="mt-3 mb-2 text-center">
                Recent discussions
            </p>

            <div className="container px-1 old-ones d-flex justify-content-center">
                <Scrollbar thumbColor={"#692E5F"} trackColor={"#D1C4D8"} maxHeight={`${isMediumScreen ? '65px' : '200px'}`}>
                    {/*<div className="d-flex flex-column align-items-center">*/}
                        {discussions?.map((discussion, index) => (
                                <div key={index} className="old-discussion m-1 mt-2 d-flex justify-content-center"
                                     onClick={() => handleDiscussionClick(discussion.id)}>
                                    <img src={Discussion} alt={"discussion"} width={15} height={15}/>
                                    <p className="mb-0 ms-1">
                                        {/* each discussion contains objects */}
                                        {discussion.conversationHistory[0].prompt}
                                    </p>
                                </div>

                        )).reverse()}
                    {/*</div>*/}
                </Scrollbar>
            </div>
        </div>

    );
};

export default OldDiscussions;