import { createRouter, createWebHistory } from "vue-router";
import HelloWorld from "../views/HelloWorld.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", name: "home", component: HelloWorld },
        { path: '/login', name: "login", component: Login },
        { path: '/register', name: "register", component: Register },
        { path: '/2fa_confirm', name: "2fa_confirm", component: Login },
        { path: '/profile', name: "profile", component: Login },
    ]
})
