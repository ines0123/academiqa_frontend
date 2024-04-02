import {BiSolidMessageSquareAdd} from "react-icons/bi";
import Scrollbar from "../Common/Scrollbar/Scrollbar";
import {useEffect, useState} from "react";
import Discussion from "../../assets/images/old-discussion.svg";

// eslint-disable-next-line react/prop-types
const OldDiscussions = ({onDiscussionSelect}) => {

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
    return (
        <div className={`${isMediumScreen ? 'small' : 'large'} historique p-1 pt-3`}>
            <div
                className="d-flex justify-content-center align-items-lg-start align-items-md-center  cursor-pointer flex-lg-row  flex-md-column  ">
                <div>
                    <BiSolidMessageSquareAdd size={25}/>
                </div>
                <p className="fw-bold ps-1 mt-1 text-sm-center">New discussion</p>
            </div>
            <p className="mt-2 mb-1 text-center">
                Recent discussions
            </p>

            <div className="container px-1">
                <Scrollbar thumbColor={"#692E5F"} trackColor={"#D1C4D8"}
                           maxHeight={`${isMediumScreen ? '70px' : '200px'}`}>
                    <div className=" old-discussion m-1 d-flex justify-content-center" onClick={()=> handleDiscussionClick(1)}>
                        <img src={Discussion} alt={"discussion"} width={15} height={15}/>
                        <p className="mb-0 ms-1">
                            Lorem ipsum dolor sit samet, consectetur
                        </p>
                    </div>
                    <div className="old-discussion m-1 mt-3 d-flex justify-content-center " onClick={()=> handleDiscussionClick(2)}>
                        <img src={Discussion} alt={"discussion"} width={15} height={15}/>
                        <p className="mb-0 ms-1">
                            Lorem ipsum dolor sit samet, consectetur
                        </p>
                    </div>
                </Scrollbar>
            </div>
        </div>

    );
};

export default OldDiscussions;