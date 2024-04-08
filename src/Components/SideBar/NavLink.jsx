import { faPlus, faUserPlus, faUsers, faCartShopping, faCartPlus, faUserPen, faIcons, faGift, faGifts, faHouse, faBookOpenReader, faComment, faComments, faNoteSticky, faCalendar, faCalendarDay, faCalendarDays, faCalendarAlt, faCalendarCheck, faCalendarPlus, faCalendarWeek, faCalendarXmark } from '@fortawesome/free-solid-svg-icons'

export const links = [
    {
        name: "Home",
        path: "student/",
        icon: faHouse,
        role: 'student',
    },
    {
        name: "Home",
        path: "teacher/",
        icon: faHouse,
        role: 'teacher'
    },
    {
        name: "My Courses",
        path: "student/courses",
        icon: faBookOpenReader,
        role: 'student'
    },
    {
      name: "My Courses",
        path: "teacher/courses",
        icon: faBookOpenReader,
        role: 'teacher' 
    },
    {
        name: "My Messages",
        path: "chat",
        icon: faComments,
        role: ['student', 'teacher'],
        className: "sidebar-icon-button-messages"
    },
    {
        name: "My Notes",
        path: "student/notes",
        icon: faNoteSticky,
        role: 'student'
    },
    {
        name: "My Calendar",
        path: "student/calendar",
        icon: faCalendarDays,
        role: 'student'
    },
    {
        name: "My Calendar",
        path: "teacher/calendar",
        icon: faCalendarDays,
        role: 'teacher'
    },
    {
        name: "Calendar",
        path: "admin/calendar",
        icon: faCalendarDays,
        role: 'admin',
    },
    {
        name: "See More Courses",
        path: "student/recommend",
        icon: "",
        image: "../../public/BotIcon.png",
        role: 'student'
    },

]