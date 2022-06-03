import { createRouter, createWebHistory } from "vue-router";
import HelloWorld from "../views/HelloWorld.vue";
import Login from "../views/Login.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", name: "home", component: HelloWorld },
        { path: '/login', name: "login", component: Login },
    ]
})

export default router
