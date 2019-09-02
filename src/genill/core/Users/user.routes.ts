// @ts-ignore
import AddQuestions from '@/genill/core/quiz/AddQuestions.vue';
import { ProfileGuard } from '@/genill/core/Users/profile/profile.guard';
// @ts-ignore
import Profile from '@/genill/core/Users/profile/Profile.vue';
// @ts-ignore
import example from '@/genill/core/Users/profile/example.vue';
// @ts-ignore
import Logout from '@/genill/core/Users/signin/Logout.vue';
// @ts-ignore
import Register from '@/genill/core/Users/signin/Register.vue';
// @ts-ignore
import Signin from '@/genill/core/Users/signin/signin.vue';
import {UserRoutes} from '@/genill/core/Users/user-routing.model';
// @ts-ignore
import App from '../../../App.vue';
// @ts-ignore
import About from '../../../views/About.vue';
// @ts-ignore
import Home from '../../../views/Home.vue';

const userRoutes = [
    {
        path: UserRoutes.WELCOME,
        name: UserRoutes.WELCOME,
        component: Home,
        beforeEnter(routeTo: any, routeFrom: any, next:any) {
            ProfileGuard();
            next();
        },
    },
    {
        path: '/example',
        name: 'example',
        component: example,
        beforeEnter(routeTo: any, routeFrom: any, next:any) {
            ProfileGuard();
            next();
        },
    },
    {
        path: UserRoutes.LOGIN,
        name: UserRoutes.LOGIN,
        component: Signin,
        meta: {
            requiresVisitor: true,
        },
    },
    {
        path: UserRoutes.REGISTER,
        name: UserRoutes.REGISTER,
        component: Register,
        meta: {
            requiresVisitor: true,
        },
    },
    {
        path: `${UserRoutes.PROFILE}`,
        name: UserRoutes.PROFILE,
        component: Profile,
        meta: { requiresAuth: true },
        props: true,
        beforeEnter(routeTo: any, routeFrom: any, next:any) {
            ProfileGuard();
            next();
        },
    },
    {
        path: '/todo',
        name: 'todo',
        component: App,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: UserRoutes.ABOUT,
        name: UserRoutes.ABOUT,
        component: About,
        meta: { requiresAuth: true },
    },
    {
        path: UserRoutes.ADD_QUIZ,
        name: UserRoutes.ADD_QUIZ,
        component: AddQuestions,
        meta: { requiresAuth: true },
    },
    {
        path: UserRoutes.LOGOUT,
        name: UserRoutes.LOGOUT,
        component: Logout,
        meta: {
            requiresAuth: true,
        },
    },
];

export default userRoutes;
