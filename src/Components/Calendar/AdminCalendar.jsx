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
  import { registerLicense } from '@syncfusion/ej2-base';
  import '../../Components/Calendar/styles.css'
  
  registerLicense('Ngo9BigBOggjHTQxAR8/V1NBaF5cXmRCekx1RXxbf1x0ZFxMYFRbQHFPMyBoS35RckVnWX5ed3RTRWdeWEJy');
  
  
  const AdminCalendar = ({sessions}) => {
    const nav = useNavigate();
    const instance = new Internationalization();
    const getTimeString = (value) => {
      return instance.formatDate(value, { skeleton: "hm" });
    };
  
    const eventSettings = {
      dataSource: sessions

    //   template: eventTemplate,
    };
  
    return (
      <div>
      <ScheduleComponent
        width="100%"
        height="70vh"
        selectedDate={new Date(2018, 1, 15)}
        eventSettings={eventSettings}
        allowDragAndDrop={true}
        allowResizing={true}
        actionComplete={(args) => {
          if (args.requestType === "eventChanged") {
            console.log(args.data);
            alert("Session Changed");
            // Post request to update the session in the database
          }
          if (args.requestType === "eventCreated") {
            console.log(args.data);
            alert("Session Created");
            // Post request to add the session to the database
        }}
        }
      >
        <ViewsDirective>
          <ViewDirective option="Day" />
          <ViewDirective option="Week" startHour="05:00" endHour="23:00" />
          <ViewDirective option="WorkWeek" startHour="08:00" endHour="18:00" isSelected={true}/>
          <ViewDirective option="Month" />
        </ViewsDirective>
        <Inject services={[Day, Week, WorkWeek, Month]} />
      </ScheduleComponent>
      </div>
    );
  };
  
  export default AdminCalendar;
  