<template>
  <header>
      <a><img src="../assets/cnodejs_light.svg"></a>
      <nav>
            <i class="iconfont icon-information"></i></li>
            <button v-show="!isLogin" @click="login">登录</button>
            <img class="new" v-show="isLogin" @click="getUserInfo" :src="avatar">
      </nav>
  </header>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
    computed: {
        ...mapGetters([
            'isLogin',
            'userMsgsCount',
            'loginname',
            'avatar'
        ])
    },
    methods: {
        login: function() {
            this.$router.push({name:'login'});
            this.$store.state.currentPage = "登录";
        },
        getUserInfo: function() {
            this.$router.push({name:'user',params:{user:this.loginname}});
            this.$store.state.currentPage = "我的主页"
        }
    }
}
</script>
<style lang="less" scoped>
    header{
        overflow: hidden;
        color: white;
        display: flex;
        justify-content: space-between;;
        align-items: center;
        background: rgb(55,60,56);
        height: 80px;
        width: 100%;
        padding: 10px 10px;
        box-shadow: 1px 1px 5px 1px #888888;
        img{
            width: 8em;
        }
        nav{
            display: flex;
            align-items: center;
            justify-content: center;
            i{
                font-size:1.5em;
                cursor: pointer;
                margin-right: 1em;
                &:hover{
                    color: #42b983;
                }
            }
            button{
                background: transparent;
                border: none;
                color: white;
                padding: 0;
                cursor: pointer;
                outline: none;
                vertical-align: baseline;
            }
            img{
                position: relative;
                cursor: pointer;
                width: 2em;
                border-radius: 50%;
            }
        }
    }
</style>
