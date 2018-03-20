<template>
  <header>
      <a><img src="../assets/cnodejs_light.svg"></a>
      <nav ref="nav">
            <a><i class="iconfont icon-information" @click="getAboutInfo"></i></a>
            <a><i class="iconfont icon-edit" @click="postTopic"></i></a>
            <a><i v-show="!isLogin" @click="login" class="iconfont icon-account"></i></a>
            <a><img class="new" v-show="isLogin" @click="getUserInfo" :src="avatar"></a>
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
        login() {
            this.$router.push({name:'login'});
            this.$store.state.currentPage = "登录";
        },
        getUserInfo() {
            this.$router.push({name:'user',params:{user:this.loginname}});
            this.$store.state.currentPage = "我的主页"
        },
        getAboutInfo() {
            this.$store.dispatch('popMsg',{content:'暂时不装这个b了'});
        },
        postTopic() {
            if(this.isLogin) {
                this.$router.push({name:'postNew'})
            } else {
                this.$store.dispatch('popMsg',{content:'请登录后使用'})
            }
        }
    },
    mounted() {
        this.$refs.nav.addEventListener('touchstart', function(e){
            e.target.style.color = '#42b983'
        });
        this.$refs.nav.addEventListener('touchend', function(e) {
            e.target.style.color = '#fff';
        })
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
        box-shadow: 0px 0px 10px 0px #888888;
        img{
            width: 8em;
        }
        nav{
            display: flex;
            align-items: center;
            justify-content: center;
            a{
                text-decoration: none
            }
            i{
                font-size:1em;
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
                cursor: pointer;
                width: 2em;
                border-radius: 50%;
            }
        }
    }
    @media screen and (max-width:700px) {
        nav i:hover{

        }
    }
</style>
