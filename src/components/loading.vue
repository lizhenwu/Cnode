<template>
  <div class="loading" v-show="isLoading">
      <p><i><img src="../assets/refresh.svg"></i> 加载中</p>
  </div>
</template>
<script>
export default {
  computed:{
      isLoading:function() {
          return this.$store.state.isLoading;
      }
  }
}
</script>
<style lang="less" scoped>
    .loading{
        position: fixed;
        z-index: 40;
        width: 5em;
        height: 1em;
        margin: 40vh auto;
        top:0;
        bottom:0;
        left:0;
        right:0;
        text-align: center;
        p{
            margin: 0;
            font-size: 1em;
        }
    }
    img{
        vertical-align: middle;
        width: 1em;
        height: 80%;
        animation: roll .5s infinite;
    }
    @keyframes roll {
        0%{
            transform: rotate(0deg);
        }
        100%{
            transform: rotate(360deg);
        }
    }
</style>


