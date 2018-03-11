<template>
  <div>
  <div class="loading" v-show="isLoading">
      <p><i class="iconfont icon-refresh"></i> 加载中</p>
  </div>
  <transition name="boom-in">
        <div class="backTop" @click="backTop" v-show="scrollY>0"><i class="iconfont icon-jiantoushang"></i></div>
  </transition>
 </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
    computed:mapState([
        'isLoading',
        'scrollY'
    ]),
    methods:{
        backTop:function(){
            let rate = window.scrollY/10;
            let rocket = window.setInterval(()=>{
                if(window.scrollY <= 0){
                    rate = null;
                    window.clearInterval(rocket);
                }else {
                    rate = window.scrollY/10;
                    window.scrollTo(0,window.scrollY-rate);
                }
            },5)
        }
    }
}
</script>
<style lang="less" scoped>
    .loading{
        position: fixed;
        z-index: 40;
        width: 5em;
        height: 1.5em;
        border-radius: 5px;
        box-shadow: 0px 0px 1px 0px gray;
        margin: 40vh auto;
        top:0;
        bottom:0;
        left:0;
        right:0;
        text-align: center;
        background: rgba(55,60,56,.7);
        color: white;
        p{
            margin: 0;
            font-size: 1em;
            i{
                display: inline-block;
                animation: roll .5s infinite;
            }
        }
    }
    @keyframes roll {
        0%{
            transform: rotate(0deg);
        }
        100%{
            transform: rotate(360deg);
        }
    }
    .backTop{
        padding-top: .6em;
        position: fixed;
        margin-right: 15vw;
        right: 0;
        bottom: 10px;
        height: 4em;
        width: 4em;
        border-radius: 50%;
        background: #263238;
        transition: opacity .5s ease,transform 0.2s ease-out;/*会覆盖vue过渡动画的transition属性，怎么解决？
                                                              *原来可以写多个的...
                                                              */                     
        text-align: center;
        box-shadow:0 3px 5px -1px rgba(0,0,0,.2), 0 6px 10px 0 rgba(0,0,0,.14), 0 1px 18px 0 rgba(0,0,0,.12);
        i{
            color: white;
            font-size: 2em
        }
        &:hover{
            transition: all .5s ease;
            opacity: .8;
        }
    }
    @media screen and (max-width:700px){
        .backTop{
            margin-right: 10px;
        }
    }
</style>


