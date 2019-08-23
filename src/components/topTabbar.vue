<template>
    <header class="header-box">
        <nav class="header-nav">
            <div class="header-top" >
                <img src="../assets/icon/ic_return.png" class="goBack" alt=""  @click='goBack'  :noIndex='noIndex' :data-routername="routerName">
                {{title}}
            </div>
        </nav>
    </header>
</template>

<script>
  export default {
    name: "topTabbar",
    data() {
      return {

      }
    },
    props:{
      "title":String,
      "noIndex":Boolean,
       "routerName":String,
    },
    methods:{
      goBack(e){
          // console.log()
          let routerName=e.target.dataset.routername;
          console.log(routerName)
        this.$router.push({name:routerName});
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>

