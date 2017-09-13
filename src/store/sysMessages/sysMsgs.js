
const PUSH_MESSAGE = "PUSH_MESSAGE";
const DELETE_MESSAGE = "DELETE_MESSAGE";

const state = {
    msgs:[]
}
const mutations = {
    [PUSH_MESSAGE](state,msg) {
        state.msgs.push(msg);
    },
    [DELETE_MESSAGE](state,msg) {
        let index = state.msgs.indexOf(msg);
        state.msgs.splice(index,1);
    }
}
const actions = {
    popMsg({commit},msg) {
        let msgContent = msg.content;
        commit(PUSH_MESSAGE,msgContent);
        setTimeout(function() {
            commit(DELETE_MESSAGE,msgContent)
        },2000)
    }
}
export default {
    state,
    mutations,
    actions
}