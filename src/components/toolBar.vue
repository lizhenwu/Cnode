<template>
  <nav :class="scrollY > 0 ? 'active':''" >
      <span @click="goBack"><i class="iconfont icon-back"></i></span>
      <h3>{{pageName}}</h3>
      <span @click="goHome"><i class="iconfont icon-shouye"></i></span>
  </nav>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'content',
  computed: {
      ...mapGetters([
          'pageName',
          'scrollY'
      ])
    //   computed: {
    //     classObject: function () {
    //         return {
    //         active: this.scrollY > 0,
    //         'background': '#373c38'
    //         }
    //     }
  },
  methods: {
      goBack: function() {
          this.$router.back();
      },
      goHome: function() {
          this.$router.push({name:'home'});
      }
  }
}
</script>

<style lang="less" scoped>
@hundred:100%;
@theme: #373c38;
nav{
    position: fixed;
    color: @theme;
    padding: 10px 10px;
    display: flex;
    background: transparent;
    justify-content: space-between;
    height: 3em;
    width: @hundred*.7;
    margin: 0 15%;
    transition: all .5s ease;
    h3{
        margin: 0;
        padding: 0;
        display: inline-block;
        max-width: 80%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    span{
        cursor: pointer;
    }
    i{
        font-size: 1.5em;
    }
}
.active{
    background:#373c38;
    color: white;
    transition: all .5s ease;
    box-shadow: 0px 1px 3px 0px #888888;
}
@media screen and (max-width:700px){
    nav{
        width: 100%;
        margin: 0;
    }
}
</style>

