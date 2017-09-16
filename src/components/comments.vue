<template>
    <section>
        <ul>
            <li v-for="item of replies">
                <div class="content" v-html="item.content"></div>
                <div class="info">
                    <p id="time" class="timeinfo">{{item.create_at | timeFormat}} <i @click="upVote(item)" :style="item.is_uped ? 'color:red':''"  class="iconfont icon-good"></i> {{item.ups.length}}
                    <i class="iconfont icon-skip" @click="newReply += `@${item.author.loginname}`;reply_id=item.id"></i>
                    </p>
                    <p class="userinfo" @click="getAuthor(item.author.loginname)" ><img :src="item.author.avatar_url"> {{item.author.loginname}}</p>
                </div>
            </li>
        </ul>
        <div class="input">
            <i @click="post(newReply,reply_id)" class="iconfont icon-Send"></i>
            <input placeholder="输入回复" v-model="newReply" type="text">
        </div>
    </section>
</template>
<script>
import timeFormat from '../utils/timeFormat';
import { mapGetters } from 'vuex';
export default {
    data: function() {
        return {
            newReply: '',
            reply_id: String
        }
    },
    props: ['replies'],
    computed: {
        ...mapGetters([
            'isLogin',
            'accessToken',
            'loginname',
            'avatar',
            'id'
        ])
    },
    methods: {
        getAuthor(name) {
            this.$parent.getAuthor(name);
        },
        upVote(item) {
            if(this.isLogin) {
                this.$xhr.post(`reply/${item.id}/ups`,{
                    accesstoken: this.accessToken
                }).then(response=>{
                    let res = response.data;
                    let resinfo = '';
                    if(res['success']) {
                        resinfo = res['action'] === 'down' ? '取消了赞' : '点赞成功';
                        item.is_uped = !item.is_uped;
                    } else {
                        resinfo = '操作失败';
                    }
                    this.$store.dispatch('popMsg',{content:resinfo});
                }).catch(err=>{
                    if(err) { 
                        this.$store.dispatch('popMsg',{content:'服务出现了问题'});
                    }
                })
            } else {
                this.$store.dispatch('popMsg',{content:'请登录后点赞'});
            }
        },
        post(value,reply_id) {
            let topicid = this.$parent.$data.article.id; 
            if(this.isLogin) {
                this.$xhr.post(`topic/${topicid}/replies`,{
                    accesstoken: this.accessToken,
                    content: this.newReply,
                    reply_id: this.reply_id || ''
                }).then(response=>{
                    let resinfo = '';
                    if(response.data['success']) {
                        resinfo = '评论成功';
                        let newReply = {
                            author:{
                                avatar_url: this.avatar,
                                loginname: this.loginname
                            },
                            ups:[],
                            is_uped: false,
                            id: response.data.reply_id,
                            reply_id: this.reply_id || null,
                            content: `<div class="markdown-text">${value}</div>`,
                            create_at: new Date().toUTCString()
                        }
                        this.replies.push(newReply);
                        this.reply_id = '';
                    } else {
                        resinfo = '评论失败';
                    }
                    this.$store.dispatch('popMsg',{content:resinfo});
                }).catch(err=>{
                    if(err) {
                        this.$store.dispatch('popMsg',{content:'服务出现了问题'});
                    }
                })
            } else {
                this.$store.dispatch('popMsg',{content:'请登录后回复'});
            }
        }
    },
    filters: {
        timeFormat
    }
}
</script>
<style lang="less" scoped>
    section{
        padding-bottom: 3em; 
        ul{
            list-style: none;
            margin: 0;
            padding: 0;
            li{
                min-height: 100px;
                border-bottom: 1px solid #ddd;
                padding: 10px 0px;
                margin: 10px 0px;
                .info{
                    padding-top: 30px;
                    bottom: 0;
                    display: flex;
                    align-items: center;
                    color: gray;
                    font-size: 12px; 
                    p{
                        margin: 0;
                    }
                    .timeinfo{
                        width: 80%;
                        flex-shrink: 0;
                        i{
                            cursor: pointer;
                            &:hover{
                                color: black;
                            }
                        }
                    }
                    .userinfo{
                        cursor: pointer;
                        margin-left: 30px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    img{
                        display: inline-block;
                        vertical-align: middle;
                        height: 2em;
                        border-radius: 50%; 
                    }
                }         
            }
        }
        .input{
            transform: translateX(-10px);
            background: #373c38;
            display: flex;
            justify-content: center;
            height: 3em;
            padding: 10px 10px;
            width: 70%;
            position: fixed;
            bottom: 0;
            i{
                margin-right: 5px;
                font-size: 1.5em;
                color: white;
                cursor: pointer;
            }
            input{
                border-radius: 10px;
                flex-grow: 1;
                outline: none;
                padding: 0 10px;
            }
        }
    }
    @media screen and (max-width:700px){
        #time{
            width: 60%;
        }
        section .input{
            transform: translateX(0);
            left: 0;
            width: 100%;
        }
    }
</style>


