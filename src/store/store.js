import Vue from 'vue';
import Vuex from 'vuex';
import userData from './userData/userData';
import sysMsgs from './sysMessages/sysMsgs';

Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        isLoading: false,
        currentPage: '',
        scrollY: 0
    },
    getters:{
        isLogin: state => userData.state.isLogin,
        accessToken: state => userData.state.accesstoken,
        pageName: state => state.currentPage,
        scrollY: state => state.scrollY
    },
    mutations:{
        loading:function(state) {
            state.isLoading = !state.isLoading;
        }
    },
    modules:{
        userData,
        sysMsgs
    }
})
window.addEventListener('scroll',function(){
    store.state.scrollY = window.scrollY;
})
export {Vuex,store}