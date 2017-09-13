<template>
  <header>
      <a><img src="../assets/cnodejs_light.svg"></a>
      <nav>
          <ul>
              <li><button>关于</button></li>
              <li v-show="isLogin"><button>消息{{userMsgsCount}}</button></li>
              <li v-show="!isLogin"><button @click="login">登录</button></li>
              <li v-show="isLogin"><button @click="getUserInfo">我</button></li>
          </ul>
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
            'loginname'
        ])
    },
    methods: {
        login: function() {
            this.$router.push({name:'login'})
        },
        getUserInfo: function() {
            this.$router.push({name:'user',params:{user:this.loginname}})
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
        ul{
            list-style: none;
            button{
                background: transparent;
                border: none;
                color: white;
                padding: 0;
                cursor: pointer;
                outline: none;
            }
            margin: 0;
            display: flex;
            li{
                margin: 0 10px;
            }
        }
    }
</style>
