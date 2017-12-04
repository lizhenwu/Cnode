import VueRouter from 'vue-router';
import home from '../components/home'
import artContent from '../components/artContent';
import login from '../components/login';
import user from '../components/user';
import postNew from '../components/postNew';

const routes = [
    {name:'home',path:'/',component:home},
    {name:'article',path:'/article/:id',component:artContent},
    {name:'login',path:'/login',component:login},
    {name:'user',path:'/user/:user',component:user},
    {name:'postNew',path:'/postnew',component:postNew}
]
const router = new VueRouter({
    mode: 'history',
    base: './', // 用webpack生成dist版本时需要，关于vue-router使用history模式的坑
    routes,
    scrollBehavior (to, from, savedPosition) {
        if(savedPosition) {
            return savedPosition
        }else {
            return { x: 0, y: 0 }
        }
    }
});

export {VueRouter,router};