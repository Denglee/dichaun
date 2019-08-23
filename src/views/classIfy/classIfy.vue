<template>
    <div>
        <!--头部-->
        <header class="header-box">
            <nav class="header-nav">
                <div class="header-top">分类</div>
            </nav>
        </header>

        <van-pull-refresh  v-model="isLoading" @refresh="onRefresh">
            <div class="classify-box">
                <!--左边一级导航-->
                <ul class="nav nav-tabs" id="myTab">
                    <li class="myTab-item"   v-for="(item, index) in classify"  :key='index'  @click="tabClassify($event,index)"
                        :data-value="item.value"  :class='{"active":index==currentIndex}'>
                        <img :src="item.iconUrl" alt="">
                        {{item.name}}
                    </li>
                </ul>

                <!-- 右边二级导航-->
                <div class="tab-content index-nav-content">
                    <div class="nav-right">
                        <h6 class="nav-right-title">{{classifysecondTitle}}</h6>
                        <div class="nav-right-link">
                            <router-link :to='{name:"classIfyInfo",params:{ bizType:item.bizType,id:item.id }}' class="box"  v-for="(item, index) in classifysecond"  :key='index'>
                                {{item.name}}
                            </router-link>
                        </div>
                    </div>
                </div>

            </div>
        </van-pull-refresh>

        <bomBar/>
    </div>
</template>

<script>
    export default {
        name: "classIfy",
        data(){
          return{
              // title:'分类',
              // routerName:'home',
              isLoading: false,

              // 一级导航分类数据
              currentIndex:0,
              classify:[],
              classifyValue:'',

              // 二级分类
              classifysecond:[],
              classifysecondTitle:'',


              tabIcon:[
                  {iconUrl:require('../../assets/icon/sub_ic_select.png'),},
                  {iconUrl:require('../../assets/icon/sub_ic_business.png'),},
                  {iconUrl:require('../../assets/icon/sub_ic_holiday.png'),},
                  {iconUrl:require('../../assets/icon/sub_ic_match.png'),},
                  {iconUrl:require('../../assets/icon/sub_ic_select.png'),},
              ]
            }
        },
        methods:{
            // 下拉刷新
            onRefresh() {
                setTimeout(() => {
                    this.$toast('刷新成功');
                    this.isLoading = false;

                    // this.getClassify();
                    // this.tabClassify(this.currentIndex)
                    this.getClassifySecond(this.classifyValue);
                }, 500);
            },

            // 一级导航选中切换
            tabClassify(e,index){
                // 二级标题
                this.classifysecondTitle=e.currentTarget.innerText;

                this.currentIndex=index;
                let classifyValue=e.currentTarget.dataset.value;

                this.getClassifySecond(classifyValue);
            },

            // 获取二级分类数据
            getClassifySecond(classifyValue){
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
            },

            getClassify(){
                // 一级导航数据接口
                this.$axios.get('/index.php?c=statics&a=typelistb')
                    .then(res =>{
                        let tabArr=res.data.list,
                            iconArr=this.tabIcon;
                        this.classify=tabArr;

                        for(let i=0; i<tabArr.length;i++){
                            tabArr[i].iconUrl=iconArr[i].iconUrl;
                        };
                        console.log(tabArr);


                        let classifyValue=res.data.list[0].value;  //二级分类的id
                        this.classifyValue=classifyValue;

                        this.classifysecondTitle=res.data.list[0].name;//二级分类的title

                        this.getClassifySecond(classifyValue);
                    })
                    .catch(error=>{
                        console.log("一级导航分类:" + error)
                    })
            }
        },
        created() {
          this.getClassify();
        },

    }


</script>

<style scoped lang="scss">

</style>