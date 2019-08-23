<template>
  <div id="app" v-cloak>

    <router-view/>

  </div>
</template>

<script>

  export default {
    name: 'home',
    data(){
      return {

      }
    },


  }
</script>

<!--scoped:只作用于当前的组件-->
<style scoped lang="scss">
  [v-cloak]{
    display: none!important;
  }
  .footer-box .router-link-exact-active {
    color: #8cc31f!important;
    background-color: #fff!important;
  }
</style>
