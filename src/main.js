import Vue from 'vue';
import axios from 'axios';
import {VueRouter,router} from './routes/router';
import {Vuex,store} from './store/store';

Vue.use(VueRouter);
const xhr = axios.create({
    baseURL: 'https://cnodejs.org/api/v1/',
    timeout: 1000
});
Vue.prototype.$xhr = xhr;
import App from './App'
new Vue({
    el:'#app',
    router,
    store,
    render:h=>{
        return h(App)
    }
})
