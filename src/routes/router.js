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
const router = new VueRouter({routes});

export {VueRouter,router};