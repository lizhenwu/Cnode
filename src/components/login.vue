<template>
  <div>
  <tool-bar></tool-bar>
  <section  class="login">
      <img src="../assets/logo.svg">
      <div class="input">
        <i class="iconfont icon-ziyuan"></i>
        <input ref="password" type="text">
        <span @click="login">登录</span>
      </div>
  </section>
  </div>
</template>
<script>
import toolBar from './toolBar'; 
import { mapActions } from 'vuex';
export default {
  components: {
      toolBar
  },
  methods: {
      login: function() {
          let accesstoken = this.$refs.password.value.trim();
          if(accesstoken.length == 0) {
            this.popMsg({content:'请输入accesstoken'})
          }else {
              this.$xhr.post('accesstoken',{
                    accesstoken:accesstoken
                }).then(response=>{
                    let vm = this;
                    let data = Object.assign({accesstoken:accesstoken},response.data);
                    this.initUserData({data:data,vm:vm});
                    this.popMsg({content:'登录成功'});
                    this.$router.push({name:'home'});
                }).catch(err=>{
                    this.popMsg({content:'😥登录失败'});
                    console.log(err);
                })
          }
      },

      ...mapActions([
          'initUserData',
          'popMsg'
      ])
  }
}
</script>
<style lang="less" scoped>
@hundred:100%;
section{
    background: white;
    padding: 0;
    padding-top: 3em;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin:0 15%;
    // width: 70%;
    height: 100vh;
    overflow: hidden;
        img{
            box-sizing: content-box;
            width: 30vh;
            max-width: @hundred*0.9;
            padding: 50px 50px;
            display: block;
            background: black;
            box-shadow: 1px 1px 20px 5px gray  
        }
        .input{
            margin-top: 20px;
            position: relative;
            i{
                margin-top: 5px;
                color: grey;
                font-size: 1em;
                position: absolute;
            }
            input{
                padding-left: 1.5em;
                width: 100%;
            }
            span{
                cursor: pointer;
            }   
        }
}
@media screen and (max-width:700px){
        section{
            margin: 0;
            width: 100%;
        }
}
</style>

