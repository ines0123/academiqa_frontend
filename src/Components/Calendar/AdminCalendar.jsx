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
  import { L10n } from '@syncfusion/ej2-base';
  import { Internationalization } from "@syncfusion/ej2-base";
  import { useNavigate } from "react-router-dom";
  import { registerLicense } from '@syncfusion/ej2-base';
  import '../../Components/Calendar/styles.css'
  
  registerLicense('Ngo9BigBOggjHTQxAR8/V1NBaF5cXmRCekx1RXxbf1x0ZFxMYFRbQHFPMyBoS35RckVnWX5ed3RTRWdeWEJy');
  
  
  const AdminCalendar = ({role, sessions}) => {
    const nav = useNavigate();
    const instance = new Internationalization();
    const getTimeString = (value) => {
      return instance.formatDate(value, { skeleton: "hm" });
    };

    L10n.load({
      'en-US': {
          'schedule': {
              'saveButton': 'Add',
              'cancelButton': 'Close',
              'deleteButton': 'Remove',
              'newEvent': 'Add Session',
              'editEvent': 'Edit Session',
          },
      }
  });

  const editTimeFormat = (data) => {
    // Start time format edit
    const dateObject = new Date(data.StartTime);
    // Format the Date object into the desired format (ISO 8601 format)
    data.StartTime = dateObject.toISOString();
    // End time format edit
    const endDateObject = new Date(data.EndTime);
    // Format the Date object into the desired format (ISO 8601 format)
    data.EndTime = endDateObject.toISOString();
    return data;
  }


  
    const eventSettings = {
      dataSource: sessions,
      fields: {
        id: 'Id',
        subject: { name: 'Subject', title: 'Subject' },
        location: { name: 'type', title: 'Session Type' },
      },
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
        showQuickInfo = {false}
        hover={(args) => {
          if( sessions.length == 0) {args.element.setAttribute('title', 'select a group');}
          if(role != "teacher" ) {
          // add title :
          if (args.element.classList[0]=="e-work-cells" ) {
            args.element.setAttribute('title', 'double click to add a session');
          }
          if (args.element.classList[0]=="e-appointment") {
          args.element.setAttribute('title', 'double click to edit the session');
          }
        }}
        }
        popupOpen={(args) => {
          if (role === "teacher" || sessions.length === 0) {
            args.cancel = true;
          }
          args.duration = 90;
        }}
        cellClick={
          (args) => {
            args.cancel = true;
        }}

        eventClick={
          (args) => {
            if (role === "teacher") {
              nav(`/teacher/session/${args.event.Id}`);
            }
          }
        }
        actionComplete={(args) => {
          if (args.requestType === "eventChanged") {
            editTimeFormat(args.data[0]);
            console.log(args.data[0]);
            alert("Session Changed");
            // Post request to update the session in the database
          }
          if (args.requestType === "eventCreated") {
            editTimeFormat(args.data[0]);
            console.log(args.data[0]);
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
  