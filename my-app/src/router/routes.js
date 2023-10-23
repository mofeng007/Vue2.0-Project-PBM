// import Home from '../views/Home.vue'
// import User from '../views/User.vue'

export default [
    {
        path: '/',
        // 重定向
        redirect: '/home',
        component: () => import('../views/Main.vue'),
        children: [
            // 首页
            {
                name: "home",
                path: "home",
                // 路由懒加载
                component: () => import('../views/Home.vue'),
            },
            // 用户管理
            {
                name: "user",
                path: "user",
                component: () => import('../views/User.vue'),
            },
            // 商品管理
            {
                name:"mall",
                path:"mall",
                component:()=>import('../views/Mail.vue') 
            },
            // 页面1
            {
                name:"page1",
                path:"page1",
                component:()=>import('../views/PageOne.vue')
            },
            // 页面2
            {
                name:"page2",
                path:"page2",
                component:()=>import('../views/PageTwo.vue')
            },
        ],
    },
]