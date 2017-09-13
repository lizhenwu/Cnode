import Vue from 'vue';
import Vuex from 'vuex';
import userData from './userData/userData';
import sysMsgs from './sysMessages/sysMsgs';

Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        isLoading: false,
    },
    getters:{
        isLogin: state => userData.state.isLogin,
        accessToken: state => userData.state.accesstoken
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

export {Vuex,store}