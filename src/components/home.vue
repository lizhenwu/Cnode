<template>
    <div class="home">
    <nav-bar></nav-bar>
    <section>
    <ul class="tabs">
        <li v-for="(tabCh,tab,idx) in tabs" :key="idx" @click="getTab(tab,1,true);" :class="tabActive === tab ? 'activeTab':''">
            <!-- (键值,键,索引) -->
            <a>{{tabCh}}</a>
        </li>
    </ul>
    <ul ref="items" class="items">
        <li v-for="(item,idx) in items" :key="idx">
            <div class="leftInfo">
                <label v-show="all">{{tabs[item.tab]}}</label>
                <label id="top" v-show="item.top">置顶</label><span v-show="item.top || all">{{item.reply_count}}/{{item.visit_count}} {{item.last_reply_at | timeFormat}}</span>
                <br v-show="item.top || all">
                <a @click="getItem(item)">{{item.title}}</a><br>
                <span span v-show="!(item.top || all)">{{item.reply_count}}/{{item.visit_count}} {{item.last_reply_at | timeFormat}}</span>
            </div>
            <img :src="item.author.avatar_url">
        </li>
    </ul>
    </section>
    </div>
</template>
<script>
import navBar from './navBar';
import timeFormat from '../utils/timeFormat';
export default {
    data:function() {
      return {
          tabActive:'all',
          page:1,
          all:true,
          tabs:{
            'all':'全部',
            'good':'精华',
            'ask':'问答',
            'share':'分享',
            'job':'招聘',
            'dev':'客户端测试'
          },
          items:[]
       }
    },
    components:{
        navBar
    },
    methods:{
        getTab:function(tab,page,toggle){
            this.all = tab === "all" ? true : false;
            this.$store.commit('loading');
            this.$xhr.get(`topics`,{params:{
                tab:tab,
                page:page         
            }}).then(response=>{
                let items = response.data.data;
                toggle ? this.items = items : this.items.push(...items);
                this.$store.commit('loading');
                this.tabActive = tab;
                this.page = 1;
            }).catch(err=>{
                this.$store.commit('loading');
                this.$store.dispatch('popMsg',{content:'加载失败'});
                console.log(err);
            })
        },
        getItem:function(item) {
            this.$router.push({name:'article',params:{id:item.id}});
        },
        loadMoreItems:function(e) {
            // this.$store.state.scrollY = window.scrollY;
            if(!this.$store.state.isLoading && window.document.documentElement.offsetHeight <= window.screen.height + window.scrollY) {
                this.getTab(this.tabActive,++this.page,false)
            }
        },
        addEvent:function(){
            window.addEventListener('scroll',this.loadMoreItems);
        },
        itemsInit:function() {
            let vm = this;
            this.$xhr.get('topics',{
                params:{
                    page:1,
                }
            }).then(response=>{
                vm.items = response.data.data;
            }).catch(err=>{
                console.log(err);
            })
        }
    },
    filters:{
        timeFormat: timeFormat
    },
    created() {
        this.itemsInit();
        console.log('home');
    },
    mounted() {
        this.$refs.items.addEventListener('touchstart', function(e) {
            if(e.target.tagName === 'UL') return;
            let target = e.target;
            while(target.tagName !== 'LI') {
                target = target.parentNode;
            }
            target.style.background = 'rgba(189,192,186,.1)';
        });
        this.$refs.items.addEventListener('touchend', function(e) {
            if(e.target.tagName === 'UL') return;
            let target = e.target;
            while(target.tagName !== 'LI') {
                target = target.parentNode;
            }
            target.style.background = 'transparent';
        })
    },
    beforeRouteEnter(to,from,next) {
        next(vm=>{
            vm.addEvent();
        });
    },
    beforeRouteLeave(to,from,next) {
        window.removeEventListener('scroll',this.loadMoreItems);
        next();
    }
}
</script>
<style lang="less" scoped>
@hundred:100%;
@itemHeight:70px;
    .home{
        margin:0 15%;
        ul{
            display: flex;
            padding-left:0;
            list-style: none;
            width:@hundred;
        }
    }
    section{
        box-shadow: 0px 0px 12px -5px #888888;
        background: white
    }
    .tabs{
        // display: block;
        // padding: 0 10px;
        overflow:hidden;
        justify-content: space-around;
        .activeTab{
            border-bottom: solid 2px #33A6B8;
        }
        li{
            cursor: pointer;
            background: transparent;
            border: solid 1px transparent;
            // appearance: button;
            padding: 10px;
            flex: 1;
            white-space: nowrap;
            text-align: center;
            outline: none;
            position: relative;
            overflow: hidden;
            &:after{
                content: "";
                display: block;
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                pointer-events: none;
                background-image: radial-gradient(circle, #33A6B8 10%, transparent 10.01%);
                background-repeat: no-repeat;
                background-position: 50%;
                transform: scale(10, 10);
                opacity: 0;
                transition: transform .3s, opacity .5s;
            }
            &:active::after {
                transform: scale(0, 0);
                opacity: .3;
                transition: 0s;
            }
            // margin-right:20px;
            a{
                color: black;
                &:hover{
                    color:#33A6B8
                }
            }
        }
    }
    .items{
        flex-direction:column;
        li{
            .leftInfo{
                display: inline-block;
                width: @hundred*0.8;
                label{
                    border-radius: 3px;
                    padding: 3px;
                    font-size:12px;
                    color:white;
                    background: #42b983;
                    &:nth-of-type(2){
                        background-color: #C73E3A
                    }
                }
                a{
                    color: #268785;
                    display: inline-block;
                    white-space: nowrap;
                    max-width:@hundred;
                    vertical-align: middle;
                    overflow: hidden;//overflow加text-overflow和white-space才能使text-overflow生效
                    text-overflow: ellipsis;
                }
                span{
                    color: gray;
                    font-size: 8px;
                }
            }
            padding: @itemHeight*0.2 10px;
            width:@hundred;
            height:@itemHeight;
            img{
                height: @itemHeight*0.6;
                width: @itemHeight*0.6;
                border-radius: 50%;
                float: right;
                // vertical-align: middle;
            }
            // transition:all .3s ease;
            &:hover{
                background: rgba(189,192,186,.1);
                // transition:all .3s ease;
            }
        }
    }
    @media screen and (max-width:700px){
        .home{
            width: @hundred;
            margin: 0;
        }
        .tabs li:last-child{
            flex-grow: 2.5
        }
        .items{
            li{
                &:hover{
                    background: transparent
                }
            }
        }
    }
</style>



