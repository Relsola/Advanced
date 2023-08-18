// createRouter 创建路由
// createWebHashHistory 创建一个hash路由
// createWebHistory 创建一个history
import { createRouter, createWebHashHistory } from "vue-router";

// 创建路由规则

const routes = [
    {
        path: "/home",
        redirect: "/"
    },
    {
        path: "/",
        name: "home",
        component: () => import("../views/Home.vue")
    },
    {
        path: "/about",
        name: "about",
        component: () => import("../views/About.vue"),
        children: []
    },
    {
        path: "/:pathMatch(.*)",
        name: "404",
        component: () => import("../components/Demo.vue")
    }
];


const router = createRouter({
    history: createWebHashHistory(),
    routes
})


router.beforeEach((to, from, next) => {
    console.log("to...", to);
    console.log("from...", from);
    console.log("next...", next);
    next()
})

export default router