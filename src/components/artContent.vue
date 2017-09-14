<template>
    <div>
    <tool-bar></tool-bar>
    <article>
        <header>
            <h4>{{article.title}}<i :class="{collect: !article.is_collect}" @click="collect" class="iconfont icon-discount"></i></h4>
            <p>
            发布于{{article.create_at | timeFormat}} by <span class="author" @click="getAuthor(author.loginname)">{{author.loginname}}</span>
            <span style="color:#373c38">{{article.reply_count}}次回复</span>/<span>{{article.visit_count}}次浏览</span>
            </p>  
        </header>
        <section  v-html="article.content" class="article">
        </section>
        <section class="comments">
        </section>
    </article>
    </div>
</template>
<script>
import toolBar from './toolBar';
import { mapGetters } from 'vuex';
import timeFormat from '../utils/timeFormat';
export default {
    data:function() {
        return {
            article:{},
            author:{}
        }
    },
    components: {
        toolBar
    },
    filters:{
        timeFormat
    },
    methods:{
        getAuthor(username) {
            this.$router.push({name:'user',params:{user:username}});
        },
        collect() {

        }
    },
    beforeRouteEnter:function(to,from,next) {
        next(vm=>{
            vm.$xhr.get(`topic/${to.params.id}`).then(response=>{
                console.log(response.data);
                vm.article = response.data.data;
                // console.log(response.data.data.author.loginname)
                vm.author = response.data.data.author;
            }).catch(err=>{
                console.log(err)
            })
            vm.$store.state.currentPage = '文章详情';
        })
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
    }
    @media screen and (max-width:700px) {
        article{
            margin:0
        }
    }
</style>

