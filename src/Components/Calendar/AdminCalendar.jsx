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
  import { groups } from "../../data/LevelsData";
  
  registerLicense('Ngo9BigBOggjHTQxAR8/V1NBaF5cXmRCekx1RXxbf1x0ZFxMYFRbQHFPMyBoS35RckVnWX5ed3RTRWdeWEJy');
  
  
  const AdminCalendar = ({role, sessions}) => {
    const nav = useNavigate();
    const instance = new Internationalization();
    const getTimeString = (value) => {
      return instance.formatDate(value, { skeleton: "hm" });
    };

    const popupOpen = (args) => {
      if (role === "teacher") {args.cancel = true;}}
  
    const eventSettings = {
      dataSource: sessions,
      fields: {
        id: 'Id',
        subject: { name: 'Subject' },
        location: { name: 'type' },
      }
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
        eventClick={
          (args) => {
            if (role === "teacher") {
              // alert("You are not allowed to create a session");
              // window.location.reload();
              // console.log('id:',args)
              // window.location.href = `/teacher/session/${args.data.Id}`;
              nav(`/teacher/session/${args.event.Id}`);
            }
          }
        }
        // popupOpen={(args) => {
        //   popupOpen(args);
        // }}
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
  