<template>
  <div class="dialog">
        <ul>
            <transition-group name="slide-up">
            <li v-for="msg of msgs" v-bind:key="msg">
                <p><i class=""></i>{{msg}}</p>
            </li>
            </transition-group>
        </ul>
  </div>
</transition>
</template>
<script>
export default {
  computed: {
      msgs() {
          return this.$store.state.sysMsgs.msgs;
      }
  },
}
</script>
<style lang="less" scoped>
@height:50px;
@width:100px;
@hundred:100%;
.dialog{
    position: fixed;
    bottom: 0;
    left: @hundred*0.5;
    transform: translate3d(-@hundred*0.5,0,0);
    margin: 0 auto;
    ul{
        margin: 0;
        padding: 0;
        list-style: none;
        li{
            box-shadow: 1px 1px 10px 2px gray; 
            z-index: 200;
            padding: 10px 30px;
            color: white;
            white-space: nowrap;
            width: auto;
            height: @height;
            background: #323232;
            p{
                margin: 0 0;
            }
        }
    }
}
.slide-up-enter-active,.slide-up-leave-active {
    transition: all .8s ease;
}
.slide-up-enter,.slide-up-leave-to {
    transform: translate3d(0,100%,0)
}
</style>

