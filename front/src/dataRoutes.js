import Auth from "./components/pages/Auth/Auth";
import Home from "./components/pages/Home/Home";
import NewWorkout from "./components/pages/NewWorkout/NewWorkout";

export const routes = [
    {
        path: '/',
        exact: true,
        component: Home,
        auth: false
    },
    {
        path: '/auth',
        exact: false,
        component: Auth,
        auth: false
    },
    {
        path: '/new-workout',
        exact: false,
        component: NewWorkout,
        auth: true
    }
];