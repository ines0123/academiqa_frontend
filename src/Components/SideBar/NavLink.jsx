import { faPlus, faUserPlus, faUsers, faCartShopping, faCartPlus, faUserPen, faIcons, faGift, faGifts, faHouse, faBookOpenReader, faComment, faComments, faNoteSticky, faCalendar, faCalendarDay, faCalendarDays, faCalendarAlt, faCalendarCheck, faCalendarPlus, faCalendarWeek, faCalendarXmark } from '@fortawesome/free-solid-svg-icons'

export const links = [
    {
        name: "Home",
        path: "home",
        icon: faHouse,
        role: '1995'
    },
    {
        name: "My Courses",
        path: "courses",
        icon: faBookOpenReader,
        role: '1995'
    },
    {
        name: "Contact Teachers",
        path: "contact",
        icon: faComments,
        role: ['1995', '1992'],
        className: "icon-button-messages"
    },
    {
        name: "My Notes",
        path: "notes",
        icon: faNoteSticky,
        role: ['1995', '1999']
    },
    {
        name: "My Calendar",
        path: "calendar",
        icon: faCalendarDays,
        role: ['1995', '1999']
    },
    {
        name: "See More Courses",
        path: "recommend",
        icon: "",
        image: "../../public/BotIcon.png",
        role: ['1995', '1999']
    }


]