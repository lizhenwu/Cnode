<template>
    <div>
    <tool-bar></tool-bar>
    <article>
        <header>
            <h4><i ref="collect" :class="{collect: article.is_collect}" @click="collect(article.id,article.is_collect)" class="iconfont icon-discount"></i>{{article.title}}</h4>
            <p>
            发布于{{article.create_at | timeFormat}} by <span class="author" @click="getAuthor(author.loginname)">{{author.loginname}}</span>
            <span style="color:#373c38">{{article.reply_count}}次回复</span>/<span>{{article.visit_count}}次浏览</span>
            </p>  
        </header>
        <section  v-html="article.content" class="article">
        </section>
        <h4 class="title">所有回复</h4>
        <comments :replies='article.replies'></comments>
    </article>
    </div>
</template>
<script>
import toolBar from './toolBar';
import comments from './comments';
import { mapGetters } from 'vuex';
import timeFormat from '../utils/timeFormat';
export default {
    name: 'content',
    data:function() {
        return {
            article:{},
            author:{}
        }
    },
    computed: {
        ...mapGetters([
            'isLogin',
            'accessToken'
        ])
    },
    components: {
        toolBar,
        comments
    },
    filters:{
        timeFormat
    },
    methods:{
        getAuthor(username) {
            this.$router.push({name:'user',params:{user:username}});
        },
        collect(id,isCollect) {
            if(this.isLogin) {
                let url = isCollect ? 'topic_collect/de_collect' : 'topic_collect/collect ';
                this.$xhr.post(url,{
                accesstoken: this.accessToken,
                topic_id: id
                }).then(response=>{
                    let resInfo = isCollect ? '取消收藏成功' :  '收藏成功';
                    if(response.data['success']) {
                        this.article.is_collect = !this.article.is_collect; //is_collect动态改变
                    } else {
                        resInfo = '操作失败';
                    }
                    console.log(resInfo)
                    this.$store.dispatch('popMsg',{content:resInfo});
                }).catch(err=>{
                    console.log(err);
                    if(err){
                        this.$store.dispatch('popMsg',{content:'此操作出现了问题'});
                    }
                })
            } else {
                this.$store.dispatch('popMsg',{content:'请登录后收藏'});
            }
        }
    },
    created() {
        console.log('content');
    },
    beforeRouteEnter:function(to,from,next) {
        next(vm=>{
            vm.$store.commit('loading');
            vm.$xhr.get(`topic/${to.params.id}`,{params:{
                accesstoken: vm.isLogin ? vm.accessToken : null //可获取当前用户是否对该主题有收藏等操作
            }}).then(response=>{
                vm.$store.commit('loading');
                console.log(response.data);
                vm.article = response.data.data;
                vm.author = response.data.data.author;
            }).catch(err=>{
                vm.$store.commit('loading');
                vm.$store.dispatch('popMsg',{content:'加载失败'});
                console.log(err)
            })
            vm.$store.state.currentPage = '文章详情';
        })
  },
  beforeRouteLeave(to, from, next) {
      this.article = null;
      this.author = null;
      next();
  }
}
</script>
<style lang="less" scoped>
    article{
        word-wrap: break-word;
        background: white;
        width: 70%;
        margin: 0 15%;
        padding: 0 10px;
        padding-top: 3em;
        h4{
            font-size: 22px;
            font-weight: 700;
        }
        p{
            color: #838383;
            font-size: 12px
        }
        i{
            color:#838383;
            cursor: pointer;
            margin-right: 1em;
            &:hover{
                color: #3333;
            }
        }
        .article{
            padding:10px 0px;
            min-height: 120px;
            border-bottom: 3px solid #f0f2f7
        }
        .collect{
            color: #42b983
        }
        .author{
            cursor: pointer;
            &:hover{
                text-decoration: underline;
                color: black
            }
        }
        .title{
            color: #373c38;
        }
    }
    @media screen and (max-width:700px) {
        article{
            margin:0;
            width: 100%;
        }
    }
</style>

