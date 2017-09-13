<template>
    <article v-html="content"></article>
</template>
<script>
export default {
    data:function() {
        return {
            content:''
        }
    },
    beforeRouteEnter:function(to,from,next) {
        next(vm=>{
            vm.$xhr.get(`topic/${to.params.id}`).then(response=>{
                vm.content = response.data.data.content;
            }).catch(err=>{
                console.log(err)
            })
        })
  }
}
</script>
<style lang="less" scoped>
    article{
        margin: 0 15%;
        padding: 0 10px;
    }
    @media screen and (max-width:700px) {
        article{
            margin:0
        }
    }
</style>

