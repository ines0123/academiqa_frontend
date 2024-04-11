import { faPlus, faUserPlus, faUsers, faCartShopping, faCartPlus, faUserPen, faIcons, faGift, faGifts, faHouse, faBookOpenReader, faComment, faComments, faNoteSticky, faCalendar, faCalendarDay, faCalendarDays, faCalendarAlt, faCalendarCheck, faCalendarPlus, faCalendarWeek, faCalendarXmark } from '@fortawesome/free-solid-svg-icons'

export const links = [
    {
        name: "Home",
        path: "/",
        icon: faHouse,
        role: 'student',
    },
    {
        name: "Home",
        path: "/",
        icon: faHouse,
        role: 'teacher'
    },
    {
        name: "My Courses",
        path: "/student/courses",
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
        path: "/student/notes",
        icon: faNoteSticky,
        role: 'student'
    },
    {
        name: "My Calendar",
        path: "calendar",
        icon: faCalendarDays,
        role: ['student', 'teacher']
    }

]