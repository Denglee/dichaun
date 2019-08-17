<template>
    <div>
        <!--头部-->
        <topTabbar :title="title"/>
        <div class="classify-box">
            <!--左边一级导航-->
            <ul class="nav nav-tabs" id="myTab">
                <li class="myTab-item" v-for="(item, index) in classify"  :key='index'  @click="tabClassify($event,index)"
                    :data-value="item.value"  :class='{"active":index==currentIndex}'>
                    <img src="../../assets/icon/sub_ic_select.png" alt="">
                    {{item.name}}
                </li>
            </ul>

            <!-- 右边二级导航-->
            <div class="tab-content index-nav-content">
                <div class="nav-right">
                    <h6 class="nav-right-title">{{classifysecondTitle}}</h6>
                    <div class="nav-right-link">
                        <router-link :to='{name:"classIfyInfo",params:{ bizType:item.bizType }}' class="box"  v-for="(item, index) in classifysecond"  :key='index'>
                            {{item.name}}
                        </router-link>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "classIfy",
        data(){
          return{
              // 一级导航分类数据
              currentIndex:0,
              classify:[],
              classifyValue:'',

              // 二级分类
              classifysecond:[],
              classifysecondTitle:'',
              title:'分类',
            }
        },
        methods:{

            // 一级导航选中切换
            tabClassify(e,index){
                // 二级标题
                this.classifysecondTitle=e.currentTarget.innerText;

                this.currentIndex=index;
                let classifyValue=e.currentTarget.dataset.value;
                this.getClassifysecond(classifyValue);
            },

            // 获取二级分类数据
            getClassifysecond(classifyValue){
                this.$axios.get('/index.php?c=upfile',{
                    params:{
                        a:"systag",
                        type:2,
                        bizType:classifyValue,
                    }
                })
                .then(res =>{
                    console.log(res.data);
                    this.classifysecond=res.data.list;
                })
                .catch(error=>{
                    console.log("二级导航分类:" + error)
                })
            }
        },
        created() {

            // 一级导航数据接口
            this.$axios.get('/index.php?c=statics&a=typelistb')
            .then(res =>{
                console.log(res.data.list);
                this.classify=res.data.list;
                let classifyValue=res.data.list[0].value;  //二级分类的id
                this.classifyValue=classifyValue;

                this.classifysecondTitle=res.data.list[0].name;//二级分类的title

                this.getClassifysecond(classifyValue);
            })
            .catch(error=>{
                console.log("一级导航分类:" + error)
            })
        },

        computed:{
            isShow(){
                return this.$store.getters.isShow;
                // console.log(this.$store.getters.isShow);
            }
        },
        watch:{
            // $route(to,from){ //跳转组件页面后，监听路由参数中对应的当前页面以及上一个页面
            //     console.log(to)
            //     if(to.name=='book'||to.name=='my'){ // to.name来获取当前所显示的页面，从而控制该显示或隐藏footerBar组件
            //         this.$store.dispatch('showFooter') // 利用派发全局state.showFooter的值来控制        }else{
            //         this.$store.dispatch('hideFooter')
            //     }else{
            //         this.$store.dispatch('hideFooter')
            //     }
            // }
        },

    }


</script>

<style scoped lang="scss">

</style>