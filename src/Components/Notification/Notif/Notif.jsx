import Administration from '../../../assets/images/administration.svg'
import './Notif.css';
// eslint-disable-next-line react/prop-types
const Notif = ({message,color}) => {
    // ordinary yellow => read ,red => admin Absences Limits, green => content added,blue => new msg, pink => marked absent
    const colors = ['#FEF7EF', '#FA8F88', '#EBF5E9', '#F2F9F9', '#F9E9E6'];
    return (
        <div className="notif d-flex align-items-center" style={{backgroundColor: colors[color]}}>
            <img
                className="img"
                src={Administration}
                alt="sender"
            />
            <div className="notification-content ms-3">
                {message}
            </div>

        </div>
    );
};

export default Notif;