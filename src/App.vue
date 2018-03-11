<template>
    <div>
    <!-- <transition name="slide-fade" appear mode="out-in"> -->
      <keep-alive exclude="content">
        <router-view></router-view>
      </keep-alive>
    <!-- </transition> -->
    <sys-msgs></sys-msgs>
    <loading></loading>
    </div>
</template>
<script>
import sysMsgs from './components/sysMsgs';
import loading from './components/loading';
export default {
    components:{
        sysMsgs,
        loading
    }
}
</script>
<style lang="less">
    @import (less) './style/main.less';
</style>

