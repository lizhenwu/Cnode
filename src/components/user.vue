<template>
  <section>
      <tool-bar></tool-bar>
      <div class="user">
        <img :src="avatar">
        <p>{{loginname}}</p>
        <p><i class="iconfont icon-github"></i>@{{githubName}}<br>{{creatTime}}</p>
      </div>
      <div class="about">
        <a>消息</a><a>最近</a>
        <div class="topic">

        </div>
        <div class="reply">
        </div>
      </div>
  </section>
</template>
<script>
import toolBar from './toolBar';
import { mapGetters } from 'vuex';
export default {
    data: function() {
        return {
            msgContent: '',
            avatar: '',
            creatTime: '',
            githubName: '',
            has_read: [],
            not_read: []
        }
    },
    computed: {
        ...mapGetters([
            'isLogin',
            'accessToken',
            'loginname'
        ])
    },
    components:{
        toolBar
    },
    beforeRouteEnter(to,from,next) {
        next(vm=>{
            if(vm.isLogin) {
                vm.$xhr.get('messages',{params: {
                    accesstoken : vm.accessToken,
                }}).then(response=>{
                    vm.has_read = response.data.data.has_read_messages;
                    vm.not_read = response.data.data.hasnot_read_messages;
                }).catch(err=>{
                    console.log(err);
                })
                vm.$xhr.get(`user/${vm.loginname}`).then(response=>{
                    vm.avatar = response.data.data.avatar_url;
                    vm.creatTime = response.data.data.create_at;
                    vm.githubName = response.data.data.githubUsername;
                }).catch(err=>{
                    console.log(err);
                })
            }
      })
    }
}
</script>
<style lang="less" scoped>
@theme: #373c38;
section{
    color: @theme;
    margin: 0 15%;
    min-height: 100vh; //没有达到预期效果而是超过了页面高度的100%所以加了overflow
    overflow: hidden;
    background: white;
    .user{
        text-align: center;
        img{
            border-radius: 50%
        }
        i{
            margin-right: 1em
        }
        width: 100%;
    }
    .about{
        a{
            margin: 0 1em;
        }
    }
}
@media screen and (max-width:700px){
        section{
            margin: 0;
            width: 100%;
        }
    }
</style>

