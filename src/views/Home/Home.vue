<template>
  <div class="home">
      <!--头部-->
      <topTabbar :title="title"/>
        index
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
    data(){
      return{
         title:'首页',
          // noIndex:false
      }
    },
  components: {
    // HelloWorld
  }
}
</script>
