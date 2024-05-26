import { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import StudentsList from "../StudentsList/StudentsList.jsx";
import {toast} from "react-toastify";

const WebcamCapture = ({sessionId,students,setStudents,setAbsentStudents,absentStudents}) => {
  const webcamRef = useRef(null);
  const [socket, setSocket] = useState(null);
  const [WaitingForAnswer, setWaitingForAnswer] = useState(true);
  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8765');
    newSocket.onopen = async () => {
      console.log('WebSocket connected');
      console.log("Sending session id", sessionId)
      newSocket.send("S" + sessionId);
    };
    newSocket.onmessage = (event) => {
      console.log(event.data)
      if(event.data === "1"){
        newSocket.close();
      }else if( event.data === "2"){
        console.log("Error")
      }else if(event.data === "3"){
        newSocket.send("S" + sessionId);
      } else if(event.data !== "0"){
        const data = JSON.parse(event.data);
        console.log("Student found", data)
        setStudents([...students, {'id':data.id,'username': data.username, 'isPresent': true}]);
        // console.log("Student added to the list", event.data.username)
        // eslint-disable-next-line react/prop-types
        setAbsentStudents(absentStudents.filter(s => s.id !== data?.id));
        setWaitingForAnswer(false);
      } else {
        setWaitingForAnswer(false);
      }
    };
    setSocket(newSocket);
    return()=>{
      newSocket.close();
    }
  }, []);
  useEffect(() => {
    console.log("absentStudents", absentStudents);
  }, [absentStudents]);
  useEffect(() => {
    const captureFrame = async () => {
      if(WaitingForAnswer===false){
      const imageSrc = webcamRef.current.getScreenshot();
      const test = imageSrc;
    try {
      socket.send(test);
      console.log('Image sent to server.');
      setWaitingForAnswer(true);
    } catch (error) {
      console.error('Error sendingg image to sserver:', error);
      socket.close();
      return;
    }
  }
   };

   const intervalId = setInterval(captureFrame, 33);

   return () => clearInterval(intervalId);
  }, [socket, WaitingForAnswer]);
  
  return (
    <div className="d-flex justify-content-start">
      <Webcam forceScreenshotSourceSize={true} mirrored={true} style={{width:"80%"}} audio={false} ref={webcamRef} screenshotFormat="image/jpeg"/>
      <div style={{width:"100%", height:"100%"}} className="mt-5 mx-3">
        <StudentsList presence={true} group={students}/>
      </div>
    </div>
  );

};

export default WebcamCapture;
