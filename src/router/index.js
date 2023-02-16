import VueRouter from 'vue-router'

import Home from '../components/Home/Home.vue'
import RecommendList from '../pages/RecommendList/RecommendList.vue'
import Player from '../pages/Player/Player.vue'


const router = new VueRouter({
    routes: [
        {
            //路由重定向
            path: '/',
            redirect: '/home'
        },
        {
            name: 'home',
            path: '/home',
            component: Home
        },
        {
            name: 'recommendList',
            path: '/recommendList/:recommendId',
            component: RecommendList,
            meta: { keepAlive: true }
            // children:[
            //     {
            //         name: 'player',
            //         path: 'player/:musicId',
            //         component: Player
            //     }
            // ]
        },
        {
            name: 'player',
            path: '/player/:recommendId/:musicId',
            component: Player
        }
    ]
})

export default router;