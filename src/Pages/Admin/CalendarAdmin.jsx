import AdminCalendar from "../../Components/Calendar/AdminCalendar";

export default function CalendarAdmin(){
    return(
    <div style={{ width: '100%'}}>
        <div style={{ marginLeft: '30px', marginTop: '20px'}}>
            <h1 style={{fontFamily: "Inika"}}>
                Admin Calendar
            </h1>
        <AdminCalendar />
        </div>
    </div>
    )
}