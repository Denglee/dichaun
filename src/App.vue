<template>
  <div id="app" v-cloak>

    <router-view/>

    <!-- 底部栏 -->
    <footer class="footer-box">
      <ul class="footer-nav">
        <li v-for='(tabbar,index) in tabbars' :key='tabbars.id'  class="footer-item">
          <div v-if="tabbar.goBack == 1">
            <img  :src="tabbar.tabImgSrc">
            <p  class="text">{{tabbar.title}}</p>
          </div>

          <div v-else>
            <router-link :to='tabbar.routerName' @click.native="changeHash(index)" :class='{"footer-active":index==currentIndex}'>
              <img v-if="currentIndex!=index" :src="tabbar.tabImgSrc">
              <img v-else :src="tabbar.tabImgActiveSrc">
              <p class="text">{{tabbar.title}}</p>
            </router-link>
          </div>
        </li>
      </ul>
    </footer>
  </div>
</template>

<script>
  // 底部栏图标显示
  import home from "./assets/icon/ic_home_gray.png"
  import homeActive from "./assets/icon/ic_home_green.png"
  import classify from "./assets/icon/ic_sort_gray.png"
  import classifyActive from "./assets/icon/ic_sort_green.png"
  import app from "./assets/icon/ic_app_gray.png"
  import user from "./assets/icon/ic_mine_gray.png"
  import userActive from "./assets/icon/ic_mine_green.png"
  let tabbars=[
    {id:1, tabImgSrc:home, tabImgActiveSrc:homeActive, title:"首页",routerName:{name:'home',}},
    {id:2, tabImgSrc:classify, tabImgActiveSrc:classifyActive, title:"分类",routerName:{name:'classIfy',}},
    {id:3, tabImgSrc:app, title:"APP",routerName:{name:'app',},goBack:1},
    {id:4, tabImgSrc:user, tabImgActiveSrc:userActive, title:"个人中心",routerName:{name:'userCenter',}},
  ];

  export default {
    name: 'home',
    data(){
      return {
        //底部栏数据
        selected:"",
        tabbars:tabbars,  //底部栏数据
        currentIndex:0,
      }
    },

    created(){
      let index=sessionStorage.getItem('currentIndex');
      this.currentIndex=index;
      console.log(index);
    },

    methods:{
      // 底部导航栏选中切换
      changeHash(index){
        console.log(index);
        this.currentIndex=index;
        sessionStorage.setItem('currentIndex', index)
      },
    },

    watch:{
      // 监听tabbar选中
      selected:function(newV,oldV){
        console.log("当前的："+newV,"上一个："+oldV);
        console.log("selected："+this.selected);
        this.$router.push({name:this.selected});
      }
    }
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
