import { createRouter, createWebHistory } from "vue-router";
import { useAccountStore } from "../stores/account";
import HelloWorld from "../views/HelloWorld.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Profile from "../views/Profile.vue";
import EmailConfirm from "../views/EmailConfirm.vue";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", name: "home", component: HelloWorld },
        { path: '/login', name: "login", component: Login },
        { path: '/register', name: "register", component: Register },
        { path: '/2fa_confirm', name: "2fa_confirm", component: Login },
        { path: '/profile', name: "profile", component: Profile },
        { path: '/email_confirm/:uid/:token', name: "email_confirm", component: EmailConfirm },
        // { path: '/enable_2fa_confirm', name: "enable_2fa_confirm", component: Profile },
        // { path: '/password_reset_confirm/:uid/:token', name: "password_reset_confirm", component: Profile },
    ]
})

const authRequiredRoutes = [
    'profile',
]

const anonOnlyRoutes = [
    'login',
    'register',
]

router.beforeEach(async (to) => {
    const authRequired = authRequiredRoutes.includes(to.name)
    const account = useAccountStore()
    const isAuthenticated = account.isAuthenticated()

    console.log(to.name)

    if (authRequired && !isAuthenticated){
        return '/login'
    }

    const anonOnlyRequired = anonOnlyRoutes.includes(to.name)
    if (anonOnlyRequired && isAuthenticated){
        return '/'
    }
})
