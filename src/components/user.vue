<template>
  <div>
  <tool-bar></tool-bar>
  <section>
      <div class="user">
        <img :src="avatar">
        <p>{{this.$route.params.user}}</p>
        <p><i class="iconfont icon-github"></i>@{{githubName}}<br>{{creatTime}}</p>
      </div>
      <div class="about">
        <ul class="tabs">  
          <li v-show="loginname === this.$route.params.user"><a class="tab" @click="toggleTab('msg',$event)">消息</a></li>
          <li><a class="tab" id="init" @click="toggleTab('reply',$event)">最近</a></li>
        </ul>
        <h3>{{title.active}}</h3>
        <div ref="msg" class="msg" v-show="loginname === this.$route.params.user">
            <ul>
                <li v-for="item of not_read"></li>
            </ul>
        </div>
        <div ref="reply" class="reply">
            <ul>
                <li v-for="item of recent_topics">
                    <label>发布主题</label><br>
                    <a @click="getItem(item)">{{item.title}}</a>
                    <span class="time">{{item.last_reply_at | timeFormat}}</span>
                </li>
                <li v-for="item of recent_replies">
                    <label>发布回复</label><br>
                    <a @click="getItem(item)">{{item.title}}</a>
                    <span class="time">{{item.last_reply_at | timeFormat}}</span>
                </li>
            </ul>
        </div>
      </div>
  </section>
  </div>
</template>
<script>
import toolBar from './toolBar';
import { mapGetters } from 'vuex';
import timeFormat from '../utils/timeFormat';
export default {
    data: function() {
        return {
            msgContent: '',
            avatar: '',
            creatTime: '',
            githubName: '',
            has_read: [],
            not_read: [],
            recent_replies: [],
            recent_topics: [],
            title:{
                'msg':'全部消息',
                'reply':'最近动态',
                'active':''
            }
        }
    },
    computed: {
        ...mapGetters([
            'isLogin',
            'accessToken',
            'loginname'
        ])
    },
    methods:{
        toggleTab: function(name,event) {
            let tabs = document.getElementsByClassName('tab');
            for(let i of tabs) {
                i.classList.remove('active');
            }
            event.path[0].classList.add('active');
            for(let i in this.$refs) {
                this.$refs[i].style.opacity = 0;
            }
            this.title['active'] = this.title[name];
            this.$refs[name].style.opacity = 1;
            name === 'msg' ? this.getUserMsgs() : this.getUserActs(this.$route.params.user);
        },
        getItem:function(item,event) {
            this.$router.push({name:'article',params:{id:item.id}})
        },
        getUserMsgs: function() {
            if(this.isLogin) {
                this.$xhr.get('messages',{params: {
                    accesstoken : this.accessToken,
                }}).then(response=>{
                    this.has_read = response.data.data.has_read_messages;
                    this.not_read = response.data.data.hasnot_read_messages;
                }).catch(err=>{
                    console.log(err);
                })
            }
        },
        getUserActs: function(username) {
                this.$xhr.get(`user/${username}`).then(response=>{
                    this.recent_replies = response.data.data.recent_replies;
                    this.recent_topics = response.data.data.recent_topics;
                    this.avatar = response.data.data.avatar_url;
                    this.creatTime = response.data.data.create_at;
                    this.githubName = response.data.data.githubUsername;
                }).catch(err=>{
                    console.log(err);
                })
        }
    },
    filters:{
        timeFormat
    },
    components:{
        toolBar
    },
    beforeRouteEnter(to,from,next) {
        next(vm=>{
            vm.$el.querySelector('#init').click();
            vm.$store.state.currentPage = '个人主页';
        })
    }
    // bef () {
    //     let vm = this; // 此钩子不能访问$refs指定的dom //能访问但是不能操作，定时器异步就可以
    //     setTimeout(function(){
    //         vm.toggleTab('msg');
    //     },500)
    // }
}
</script>
<style lang="less" scoped>
@theme: #373c38;
section{
    padding-top: 3em;
    color: @theme;
    margin: 0 15%;
    min-height: 100vh; //没有达到预期效果而是超过了页面高度的100%所以加了overflow
    overflow: hidden;
    background: white;
    .user{
        text-align: center;
        img{
            border-radius: 50%;
            height: 120px;
        }
        i{
            margin-right: 1em
        }
        width: 100%;
    }
    .about{
        width: 100%;
        ul{
            padding: 0;
            list-style: none;
            display: flex;
        }
        .tabs{
            border-bottom: 1px solid #f0f2f7;
            li{
                margin: 0 20px;
                a{
                    line-height:2em;
                    &:visited{
                        color: red
                    }
                }
            }
        }
        .msg,.reply{
            width: 100%;
            opacity: 0;
            transition: opacity .2s ease;
            ul{
                width: inherit;
                display: flex;
                flex-direction: column;
                overflow: hidden;
                text-overflow: ellipsis;
                li{
                    height: 80px;
                    border-bottom: 2px solid #f0f2f7;
                    position: relative;
                    label{
                        font-size: 10px;
                        color: gray;
                    }
                    a{
                        max-width: 70%;
                        white-space: nowrap;
                        word-wrap: break-word;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    span,a{
                        display: inline-block;
                        margin: 10px 10px;
                    }
                    .time{
                        position: absolute;
                        bottom: 0;
                        right: 0;
                    }
                }
            }
        }
        .active{
            font-weight: 800;
            border-bottom: 3px solid @theme;
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

