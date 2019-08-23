<template>
    <div>
        <!--头部-->
        <topTabbar :title="title"/>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh" class="classifyinfo-box">
            <form action="/">
                <van-search
                        v-model="searchVal"
                        placeholder="请输入搜索关键词"
                        show-action
                        @search="onSearch"
                        @cancel="onCancel"
                />
            </form>

            <van-image lazy-load fit="imgFit" src="../../assets/img/classify_banner.png" class="img-fluid classify-banner">
                <template v-slot:error>加载失败</template>
            </van-image>
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
                            <van-image lazy-load fit="imgFit"  class="img-fluid"  :src="nowUrl+'/Uploads/'+item.cover" />
                            <div class="ellipsis list-name">{{item.name}}</div>
                        </div>
                        <div class="shop-price">{{item.price}} 金币</div>
                        <!--<button type="button">500金币</button>-->
                        <div class="btn-group">
                            <a v-bind:href="[nowUrl+'/v/'+item.code]" class="btn-look">查看</a>
                            <!--<a v-bind:href="[nowUrl+'/#/scene/create/'+item.id+'?pageId=1']" class="btn-edit">编辑</a>-->
                            <button typt="button" class="btn-look" @click="btnBuy">购买</button>
                        </div>
                    </li>

                </ul>
            </div>
        </van-pull-refresh >
    </div>
</template>

<script>
    // import Vue from 'vue';
    // import { PullRefresh,Search } from 'vant';
    //
    // Vue.use(PullRefresh);
    // Vue.use(Search);

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

              isLoading: false,

              searchVal:'',
          }
        },
        methods:{
            // 下拉刷新
            onRefresh() {
                setTimeout(() => {
                    this.$toast('刷新成功');
                    this.isLoading = false;

                    console.log(this.tagId)
                    this.getSecondCode(this.tagId);
                }, 500);
            },

            //点击切换  二级分类  并且获取分类数据
            tabClassify(e,index){
                let tagId=e.currentTarget.dataset.tagid;
                this.tagId=tagId;
                console.log(tagId);
                this.currentIndex=index;

                this.getSecondCode(tagId);
            },

            // 获取二级分类 导航 数据
            getClassifySecond(classifyValue){
                this.$axios.get('/index.php?c=upfile&a=systag',{
                    params:{
                        type:2,
                        bizType:classifyValue,
                    }
                })
                .then(res =>{
                    console.log(res.data);
                    this.classifysecond=res.data.list;

                    let tagId=res.data.list[0].id;
                    this.tagId=tagId;
                    this.getSecondCode(tagId);
                })
                .catch(error=>{
                    console.log("二级导航分类:" + error)
                })
            },

            // 获取二级分类 列表数据
            getSecondCode(tagId){
                this.$axios.get('/index.php?c=eqs&a=promotion',{
                    params:{
                        pageNo:this.pageNo,
                        pageSize:this.pageSize,
                        tagId:tagId,
                    }
                })
                .then(res =>{
                    console.log(res.data);
                    console.log(typeof (res.data));

                    this.classifySecondCode=res.data.list;
                })
                .catch(error=>{
                    console.log("二级导航分类:" + error)
                })
            },

            // 表单搜索
            onSearch(e){
                console.log(this.searchVal);
                let name=this.searchVal;
                this.$axios.post('/index.php?c=eqs&a=search',{
                    data:{
                        pageNo:this.pageNo,
                        pageSize:this.pageSize,
                        name:name,
                    }
                })
                .then(res =>{
                    console.log(res.data);
                    console.log(typeof(res.data));
                    this.classifySecondCode=res.data.list;
                })
                .catch(error=>{
                    console.log("二级导航分类:" + error)
                })
            },
            onCancel(e){
                console.log('取消');
            },

            // 购买
            btnBuy(){

            },
        },
        created() {
            let bizType=this.$route.params.bizType;  //一级页面传过来的二级导航id

            if(bizType){
                localStorage.setItem('bizType',bizType);
            }else {
                bizType=localStorage.getItem('bizType');
            }

            this.getClassifySecond(bizType);
        }
    }
</script>

<style scoped lang="scss">
    .classifyinfo-box{
        background-color: #f4f4f4;
        padding-top: .15rem;
        min-height: calc(100vh - .94rem);
    }

</style>