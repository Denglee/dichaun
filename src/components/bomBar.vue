<template>
    <div>
        <!-- 底部栏 -->
        <footer class="footer-box">
            <ul class="footer-nav">
                <li v-for='(tabbar,index) in tabbars' :key='tabbars.id'  class="footer-item">
                    <div v-if="tabbar.goBack == 1" @click="backApp">
                        <img  :src="tabbar.tabImgSrc">
                        <div  class="text">{{tabbar.title}}</div>
                    </div>

                    <div v-else>
                        <router-link :to='tabbar.routerName' @click.native="changeHash(index)">
                            <!--<img v-if="tabCurrentIndex!=index" :src="tabbar.tabImgSrc">-->
                            <img :src="tabbar.tabImgSrc">
                            <div class="text">{{tabbar.title}}</div>
                        </router-link>
                    </div>
                </li>
            </ul>
        </footer>
    </div>
</template>

<script>
    // 底部栏图标显示
    import home from "@/assets/icon/ic_home_gray.png"
    import homeActive from "@/assets/icon/ic_home_green.png"
    import classify from "@/assets/icon/ic_sort_gray.png"
    import classifyActive from "@/assets/icon/ic_sort_green.png"
    import app from "@/assets/icon/ic_app_gray.png"
    import user from "@/assets/icon/ic_mine_gray.png"
    import userActive from "@/assets/icon/ic_mine_green.png"
    let tabbars=[
        {id:1, tabImgSrc:home, tabImgActiveSrc:homeActive, title:"首页",routerName:{name:'home',}},
        {id:2, tabImgSrc:classify, tabImgActiveSrc:classifyActive, title:"分类",routerName:{name:'classIfy',}},
        {id:3, tabImgSrc:app, title:"APP",routerName:{name:'app',},goBack:1},
        {id:4, tabImgSrc:user, tabImgActiveSrc:userActive, title:"个人中心",routerName:{name:'userCenter',}},
    ];

    export default {
        name: "bomBar",
        data(){
            return{
                //底部栏数据
                selected:"",
                tabbars:tabbars,  //底部栏数据
                tabCurrentIndex:0,
                index1:0,
            }
        },
        created(){
            // let index=sessionStorage.getItem('tabCurrentIndex');
            // console.log('created'+index);

            // this.tabCurrentIndex=index;
        },

        methods:{
            // 底部导航栏选中切换
            changeHash(index){
                this.tabCurrentIndex=index;

                // sessionStorage.setItem('tabCurrentIndex', index);
            },
            // 安卓返回app
            backApp(){
                window.android.backApp();
            }
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

<style scoped>
    .footer-nav .router-link-exact-active {
        color: #8cc31f;
        background-color: #fff;
    }
</style>