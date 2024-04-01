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
import "./styles.css";

import { Internationalization } from "@syncfusion/ej2-base";
import { useNavigate } from "react-router-dom";
import { sessionsData } from "../../data/data";
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('Ngo9BigBOggjHTQxAR8/V1NBaF5cXmRCekx1RXxbf1x0ZFxMYFRbQHFPMyBoS35RckVnWX5ed3RTRWdeWEJy');


const FirstCalendar = () => {
  const nav = useNavigate();
  const instance = new Internationalization();
  const getTimeString = (value) => {
    return instance.formatDate(value, { skeleton: "hm" });
  };

  const eventTemplate = (props) => {
    return (
      <div
        className={`e-appointment ${props.Color}`}
        onClick={() => { window.location.href = `student/session/${props.Id}`; }}
      >
        <div className="subject">{props.Subject}</div>
        <div className="time">{getTimeString(props.EndTime)}</div>
      </div>
    );
  };

  const eventSettings = {
    dataSource: sessionsData,
    template: eventTemplate,
  };

  return (
    <div>
    <ScheduleComponent
      width="100%"
      height="80vh"
      selectedDate={new Date(2018, 1, 15)}
      eventSettings={eventSettings}
      readOnly={true}
      popupOpen={(args) => {
        args.cancel = true;
      }}
      showQuickInfo={false}
      
    >
      <ViewsDirective>
        <ViewDirective option="Day" />
        <ViewDirective option="Week" startHour="05:00" endHour="23:00" />
        <ViewDirective option="WorkWeek" startHour="08:00" endHour="18:00" />
        <ViewDirective option="Month" showWeekend={false} />
      </ViewsDirective>
      <Inject services={[Day, Week, WorkWeek, Month]} />
    </ScheduleComponent>
    </div>
  );
};

export default FirstCalendar;
