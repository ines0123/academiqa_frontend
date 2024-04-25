import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Inject,
  ViewsDirective,
  ViewDirective,
  dataBinding,
  dataBound,
} from "@syncfusion/ej2-react-schedule";
import "./styles.css";
import { useState } from "react"

import { Internationalization } from "@syncfusion/ej2-base";
import { useNavigate } from "react-router-dom";
import { registerLicense } from '@syncfusion/ej2-base';
import {groups} from '../../data/LevelsData';
import { Sessions } from "../../data/sessionsData";
registerLicense('Ngo9BigBOggjHTQxAR8/V1NBaF5cXmRCekx1RXxbf1x0ZFxMYFRbQHFPMyBoS35RckVnWX5ed3RTRWdeWEJy');


const FirstCalendar = ({role, sessions}) => {
  const nav = useNavigate();
  const instance = new Internationalization();
  const getTimeString = (value) => {
    return instance.formatDate(value, { skeleton: "hm" });
  };

  const eventTemplate = (props) => {
    console.log(props);
    return (
      <div
        className={`e-appointment ${props.type == "cours" ? "beige" : props.type == "TP" ? "green" : "blue"} `}
        onClick={() => { 
          // window.location.pathname = `${role}/session/${props.Id}`; 
          nav(`/${role}/session/${props.Id}`);
      }}
      >
        <div className="subject"><b>{props.Subject}</b>: {Sessions.find((session) => session.Id == props.Id).type}</div>
        <div className="time">{getTimeString(props.EndTime)}</div>
        <div className="time">{groups.find((level) => props.LevelId.includes(level.id)).abbreviation} </div>
      </div>
    );
  };


  const eventSettings = {
    dataSource: sessions,
    

    template: role === 'student' ? eventTemplate : null,
  };

  return (
    <div>
      
    <ScheduleComponent
      width="100%"
      height="70vh"
      selectedDate={new Date(2018, 1, 15)}
      eventSettings={eventSettings}
      readOnly={true}
      popupOpen={(args) => {
        args.cancel = true;
      }}
      showQuickInfo={false}
      eventClick={(args) => {
        nav(`/teacher/session/${+args.event.Id}`);
      }}
      


      
    >
      <ViewsDirective>
        <ViewDirective option="Day" />
        <ViewDirective option="Week" startHour="05:00" endHour="23:00" />
        <ViewDirective option="WorkWeek" startHour="08:00" endHour="18:00" isSelected={true}/>
      </ViewsDirective>
      <Inject services={[Day, Week, WorkWeek, Month]} />
    </ScheduleComponent>
    </div>
  );
};

export default FirstCalendar;
