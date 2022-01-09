// Auth
import Login from "../components/Login"
import Register from "../components/Register"
import NotFound from "../components/common/NotFound"
import GuestPage from "../pages/Guest/GuestPage";


// Admin
import Applications from "../pages/Admin/Applications";
import AdminStatistics from "../pages/Admin/Statistics";
import AdminAccountSettings from "../pages/Admin/AccountSettings";




//Cafe Admin
import CafeAdminStatistics from "../pages/CafeAdmin/Statistics"
import CafeAdminEstablishments from "../pages/CafeAdmin/Establishments"
import CafeAdminGuestBase from "../pages/CafeAdmin/GuestBase";
import CafeAdminStaff from "../pages/CafeAdmin/Staff";
import CafeAdminAccountSettings from "../pages/CafeAdmin/AccountSettings"


import Chat from "../pages/common/Chat"





export const authRoutes = [
    {
        path: "/guest",
        exact: true,
        component: GuestPage
    },
    {
        path: "/login",
        exact: false,
        component: Login
    },
    {
        path: "/register",
        exact: false,
        component: Register
    },
    // {
    //     path: "/404",
    //     exact: false,
    //     component: NotFound
    // }
]

export const adminRoutes = [
    {
        path: ["/applications", "/applicn/:id", "addapplication"],
        exact: true,
        component: Applications
    },
    {
        path: "/statistics",
        exact: true,
        component: AdminStatistics
    },
    {
        path: "/chat",
        exact: true,
        component: Chat
    },
    {
        path: "/accountsettings",
        exact: true,
        component: AdminAccountSettings
    },
    {
        path: "/404",
        exact: false,
        component: NotFound
    }
]


export const cafeAdminRoutes = [
    {
        path: "/statistics",
        exact: false,
        component: CafeAdminStatistics
    },
    {
        path: "/staff",
        exact: false,
        component: CafeAdminStaff
    },
    {
        path: ["/establishments", "/establishment/:id", "/addestablishment"],
        exact: false,
        component: CafeAdminEstablishments
    },
    {
        path: "/guestbase",
        exact: false,
        component: CafeAdminGuestBase
    },
    {
        path: "/accountsettings",
        exact: true,
        component: CafeAdminAccountSettings
    },
    {
        path: "/chat",
        exact: true,
        component: Chat
    },
    {
        path: "/404",
        exact: false,
        component: NotFound
    }

]