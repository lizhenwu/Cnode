<template>
<div>
  <tool-bar></tool-bar>
  <section>
      <div class="slectTab">
          <h4>选择版块</h4>
            <select name="tab" ref="tab" class="tab">
                <option value="share">分享</option>
                <option value="ask">问答</option>
                <option value="job">招聘</option>
                <option value="dev">客户端测试</option>
            </select>
      </div>
      <div class="newTitle">
          <h4>文章标题</h4>
          <input required type="text" ref="title" class="title" placeholder="标题字数10字以上">
      </div>
      <div class="newContent">
        <h4>文章内容</h4><button @click="publish" >发布</button>
        <textarea required ref="content" class="content" cols="30" rows="10"></textarea>
      </div>
  </section>
</div>
</template>
<script>
import { mapGetters } from 'vuex'; 
import toolBar from './toolBar';
export default {
    computed: {
        ...mapGetters([
            'isLogin',
            'loginname',
            'accessToken'
        ])
    },
    methods: {
        log: function() {
            console.log({title: this.$refs.title.value,
                    tab: this.$refs.tab.value,
                    content: this.$refs.content.value});
        },
        publish() {
            if(this.isLogin) {
                this.$xhr.post('topics',{
                    accesstoken: this.accessToken,
                    title: this.$refs.title.value,
                    tab: this.$refs.tab.value,
                    content: this.$refs.content.value
                }).then(response=>{
                    if(response.data['success']) {
                        this.$store.dispatch('popMsg',{content:'发布成功'});
                        this.$router.push({name:'article',params:{id:response.data.topic_id}});
                    } else {
                        this.$store.dispatch('popMsg',{content:'发布失败'});
                    }
                }).catch(err => {
                    this.$store.dispatch('popMsg',{content: '请检查字数'});
                })
            } else {
                this.$store.dispatch('popMsg',{content:'请先登录'});
            }
        }
    },
    components: {
        toolBar
    },
    beforeRouteEnter(to,from,next,) {
        next(vm=>{
            vm.$store.state.currentPage = '发布主题';
        })
    }
}
</script>
<style lang="less" scoped>
@color-border: #42b983;
@color-shadow: lighten(@color-border,0.2);
section{
    div{
        margin: 2em 0;
    }
    h4{
        display: inline-block;
        margin: 0px 10px;
    }
    height: 100vh;
    width: 70%;
    margin: 0 15%;
    background: white;
    padding: 0 10px;
    padding-top: 3em;
    .selectTab,.newTitle{
        display: flex;
    }
    select{
        width: 200px;
    }
    select,input{
        flex: 1;
        outline: none;
        border: 1px solid #dcdcdc;
        border-radius: 5px;
        vertical-align: middle;
        height: 2em;
        padding: 0 10px;
        transition: box-shadow .2s linear;
        &:focus{
            border-color: @color-border;
            box-shadow: 0px 0px 3px @color-shadow;
        }
    }
    .newContent{
        position: relative;
        h4{
            display: inline-block;
        }
        button{
            position: absolute;
            right: 0;
            margin: 0 10px;
            height: 2em;
            width: 5em;
            outline: none;
            background: #42b983;
            border: none;
            color: white;
            border-radius: 5px;
            cursor: pointer;
            &:hover{
                background: #6ba44e;
            }
        }
        textarea{
            margin-top: 2em;
            width: 100%;
            vertical-align: text-top;
            min-height: 30vh;
            border: none;
            border-top: 2px solid #ddd;
            outline: none;
            word-break: break-all;
            white-space: pre-wrap;
            overflow: visible;
            padding-top: 10px;
            font-size: 14px;
            font-family: inherit;
        }
    }
}
@media screen and (max-width: 700px){
    section{
        width: 100%;
        margin: 0;
    }
}
</style>

