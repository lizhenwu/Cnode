import { getCookies,setCookie,deleteCookies } from '../../utils/cookies';

const INIT_USER_INFO = 'INIT_USER_INFO'; 
const INIT_USER_DATA = 'INIT_USER_DATA';
const state = {
    isLogin: false,
    accesstoken: '',
    avatar_url: '',
    id: '',
    loginname: '',
    success: false,
    userMsgsCount: 0          /*是否需要一个定时器发送请求轮询消息*/
}
let cookies = getCookies();
if(cookies && cookies["success"] === "true") {
    state.isLogin = true;
    Object.assign(state,cookies);
} else {
    console.log(cookies,cookies["success"] === "true")
}

const mutations = {
    [INIT_USER_INFO](state,info) {
        state.isLogin = true;
        Object.assign(state,info);
        Object.keys(info).forEach(key=>{
            setCookie(key,info[key])
        })
    },
    [INIT_USER_DATA](state,count) {
        state.userMsgsCount = count;
    }
}
const actions = {
    initUserData({commit,state},data) {
        commit(INIT_USER_INFO,data.data);
        window.setTimeout(function(){
            data.vm.$xhr.get('message/count',{params:{accesstoken: state.accesstoken}}).then(response=>{
                commit(INIT_USER_DATA,response.data.data);
                console.log(response.data.data)
            }).catch(err=>{
                console.log('err');
            })
        },500)
    }
}
const getters = {
    hasLogin: state => state.success,
    userMsgsCount: state => state.userMsgsCount,
    loginname: state => state.loginname,
    avatar: state => state.avatar_url,
    id: state => state.id
}

export default {
    state,
    mutations,
    actions,
    getters
}