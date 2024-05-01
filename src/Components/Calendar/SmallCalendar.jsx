import {
    ScheduleComponent,
    Day,
    Week,
    WorkWeek,
    Month,
    Inject,
    ViewsDirective,
    ViewDirective,
  } from "@syncfusion/ej2-react-schedule";
  import "./smallCalendar.css";
  import { useState } from "react"
  
  import { Internationalization } from "@syncfusion/ej2-base";
  import { useNavigate } from "react-router-dom";
  import { registerLicense } from '@syncfusion/ej2-base';
  import {groups} from '../../data/LevelsData';
registerLicense('Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCekxwWmFZfVpgdVRMYF5bRXBPMyBoS35RckVgWn9fcXRXR2ZUVUV2');
  
  const SmallCalendar = ({role, sessions}) => {
    const nav = useNavigate();


    const instance = new Internationalization();
    const getTimeString = (value) => {
      return instance.formatDate(value, { skeleton: "hm" });
    };
  
    const eventSettings = {
      dataSource: sessions,
    };
  
    return (
      <div>
        
      <ScheduleComponent
        // width="100%"
        height="320px"
        style={{borderRadius: '30px'}}
        selectedDate={new Date(2018, 1, 14)}
        eventSettings={eventSettings}
        readOnly={true}
        popupOpen={(args) => {
          args.cancel = true;
        }}
        showQuickInfo={false}
        showHeaderBar={false}
        // rowAutoHeight={true}
      >
        <ViewsDirective>

          {/* <ViewDirective option="WorkWeek" startHour="08:00" endHour="18:00" isSelected={true}/> */}
          <ViewDirective option='Day' interval={3} displayName='3 Days'startHour="08:00" endHour="18:00" isSelected={true} />

        </ViewsDirective>
        <Inject services={[Day, Week, WorkWeek, Month]} />
      </ScheduleComponent>
      </div>
    );
  };
  
  export default SmallCalendar;
  