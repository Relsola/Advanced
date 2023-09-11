import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter)

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
        path: "/demo",
        name: "demo",
        component: () => import("@/views/Demo.vue")
    },

    {
        path: "/about",
        name: "about",
        component: () => import("@/views/About.vue"),
        children: [
            {
                path: "/about/one/:id?/:age?",
                name: "one",
                component: () => import("@/components/One.vue")
            },

            {
                path: "two",
                name: "two",
                component: () => import("@/components/Two.vue")
            },
        ]
    },

    {
        path: "*",
        name: "404",
        component: () => import("@/components/Three.vue")
    }
]

//默认情况下 我们使用的是hash路由
const router = new VueRouter({
    mode: "history", // 使用history路由
    routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
    // to表示去哪里 from 表示从哪里来 next表示放行
    console.log("to--", to);
    console.log("from--", from);
    console.log("next--", next);
    next()
})

export default router;