<template>
    <div class="classifyinfo-box">
        <!--头部-->
        <topTabbar :title="title"/>
        <form onsubmit="return false;" class="search-classify">
            <input type="输入关键字" class="input-search">
            <button type="button" class="btn-search"></button>
        </form>

        <img src="../../assets/img/classify_banner.png" class="img-fluid classify-banner" alt="">

        <div class="classify-main">
            <!--导航-->
            <div class="nav-classify-link">
                <span v-for="(item, index) in classifysecond"  :key='index' :class='{"active":index == currentIndex}'
                      @click="tabClassify($event,index)"  :data-tagid="item.id" >
                    {{item.name}}
                </span>
            </div>


            <!--分类数据-->
            <ul class="shop-box clearfix">
                <li v-if="classifySecondCode == ''">此分类下暂无场景</li>
                <li class="shop-item" v-for="(item,index) in classifySecondCode" :key="index" v-else>
                    <div class="content">
                        <img class="img-fluid"  :src="'http://192.168.0.152:10007/Uploads/'+item.cover" alt="">
                        <div class="ellipsis list-name">{{item.name}}</div>
                    </div>
                    <div class="btn-group">
                        <a v-bind:href="['http://192.168.0.152:10007/v/'+item.code ]" class="btn-look">
                            查看
                        </a>
                        <a v-bind:href="['http://192.168.0.152:10007/#/scene/create/'+item.id+'?pageId=1']" class="btn-edit">
                          编辑
                        </a>
                          <!--<button type="button">500金币</button>-->
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "classIfyInfo",
        data(){
          return{
              title:"行业精选",

              // 二级分类导航
              classifyValue:'',
              classifysecond:[],
              currentIndex:0,

              // 二级分类列表
              classifySecondCode:[],
              tagId:'',
              pageNo: 1,
              pageSize: 10,
          }
        },
        methods:{
            //点击切换  二级分类  并且获取分类数据
            tabClassify(e,index){
                let tagId=e.currentTarget.dataset.tagid;
                console.log(tagId);
                this.currentIndex=index;

                this.getSecondCode(tagId);
            },

            // 获取二级分类 导航 数据
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

                    let tagId=res.data.list[0].id;
                    this.getSecondCode(tagId);
                })
                .catch(error=>{
                    console.log("二级导航分类:" + error)
                })
            },

            // 获取二级分类 列表数据
            getSecondCode(tagId){
                this.$axios.get('/index.php?c=eqs',{
                    params:{
                        a:"promotion",
                        // type:2,
                        pageNo:this.pageNo,
                        pageSize:this.pageSize,
                        tagId:tagId,
                    }
                })
                .then(res =>{
                    console.log(res.data);
                    this.classifySecondCode=res.data.list;
                })
                .catch(error=>{
                    console.log("二级导航分类:" + error)
                })
            },

        },
        created() {
            let bizType=this.$route.params.bizType || 101;  //一级页面传过来的二级导航id
            console.log(bizType);
            this.getClassifysecond(bizType);
        }
    }
</script>

<style scoped lang="scss">
    .classifyinfo-box{
        background-color: #f4f4f4;
        padding-top: .15rem;
        min-height: calc(100vh - 1.20rem);
    }
    .list-name{
        font-size: .12rem;
    }
</style>