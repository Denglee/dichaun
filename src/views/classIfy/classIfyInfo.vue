<template>
    <div class="classifyInfo-box">
        <topTabbar :title="title"  :routerName="routerName"/>
        <!-- <h4>文章列表</h4> -->
        <div calss="page-loadmore-wrapper" ref="wrapper" :style="{height:wrapperHeight +'px'}" style="overflow: scroll" >

            <mt-loadmore  :top-method="loadTop" @top-status-change="handleTopChange" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="autoFill">
                <form onsubmit="return false;">
                    <van-search
                            v-model="searchVal"
                            placeholder="请输入搜索关键词"
                            show-action
                            @search="onSearch"
                            @cancel="onCancel"
                    />
                </form>

                <img alt="" class="img-fluid classify-banner" :src="nowUrl+'/shop/img/classify_banner.png'">

                <!--导航-->
                <ul class="nav-classify-link" >
                    <li v-for="(item, index) in classifysecond" :key="index">
                        <span v-if="tagId == item.id" class="active"  @click="tabClassify($event)" :data-tagid="item.id" :class='{"active":item.id == tagId}'>{{item.name}}</span>
                        <span v-else  @click="tabClassify($event)" :data-tagid="item.id" :class='{"active":item.id == tagId}'>{{item.name}}</span>
                    </li>
                </ul>

                <!--列表数据-->
                <ul class="shop-ul">
                    <li v-if="classifySecondCode == ''">此分类下暂无场景</li>
                    <li class="shop-item" v-for="(item,index) in classifySecondCode" :key="index" v-else>
                        <router-link :to='{name:"showTpl",params:{ codeId:item.code,source:"classInfo" }}' class="content">
                            <van-image lazy-load fit="imgFit"  class="img-fluid"  :src="nowUrl+'/Uploads/'+item.cover" />
                            <div class="ellipsis list-name">{{item.name}}</div>
                        </router-link>
                        <div class="shop-price">{{item.price}} 金币</div>
                        <div class="btn-group">
                            <router-link :to='{name:"showTpl",params:{ codeId:item.code,source:"classInfo" }}' class="btn-look">查看</router-link>
                            <button typt="button" class="btn-look" @click="btnBuy" :data-id="item.id" :data-price="item.price">购买</button>
                        </div>
                    </li>
                </ul>

            </mt-loadmore>

        </div>

        <bomBar/>
    </div>
</template>
<script>

    export default {
        name: "classInfo",
        data() {
            return {
                title:"行业精品",
                routerName:'classIfy',
                nowUrl:this.global.nowUrl,

                // 二级分类导航
                classifyValue:'',  //type
                classifysecond:[],
                // currentIndex:0,

                // 二级分类列表
                classifySecondCode:[],
                tagId:'',
                pageNo: 1,
                pageSize: 12,

                // 分页
                allLoaded:false,  //是否可以下拉 true 不许
                wrapperHeight:0,
                autoFill:false, //loadmore 会自动检测并撑满其容器

                // 搜索
                searchVal:'',
            }
        },
        methods:{
            // 上拉加载事件
            loadBottom(){
                // 上拉加载数据
                this.loadGoodsByPage(this.tagId);
                this.$refs.loadmore.onBottomLoaded();
            },
            handleBottomChange(status){
            },

            //下拉刷新事件
            loadTop(){
                this.pageNo=1;
                this.loadGoodsByPage(this.tagId);
                setTimeout(()=>{
                    this.$refs.loadmore.onTopLoaded();
                },500);
            },
            handleTopChange(status){
                this.topStatus = status; //当前状态
                if(this.topStatus == 'drop'){ //下拉状态
                    this.topRefreshVal="松开立即刷新";
                }else if(this.topStatus == 'pull'){ //松开下拉
                    this.topRefreshVal="下拉可以刷新";
                }else{
                    this.topRefreshVal="正在刷新数据中……";
                }
            },

            //点击切换  二级分类  并且获取分类数据
            tabClassify(e,index){
                let tagId=e.currentTarget.dataset.tagid;
                this.tagId=tagId;
                console.log(tagId);

                this.allLoaded=false;
                this.pageNo=1;
                this.getSecondCode(tagId);
            },

            // 二级分类 导航 接口
            getClassifySecond(bizType){
                this.$axios.get('/index.php?c=upfile&a=systag',{
                    params:{
                        type:2,
                        bizType:bizType,
                    }
                })
                    .then(res =>{
                        console.log(res.data);
                        this.classifysecond=res.data.list;

                        // 获取 二级分类 列表数据
                        this.getSecondCode(this.tagId);
                    })
                    .catch(error=>{
                        console.log("二级导航分类:" + error)
                    })
            },

            // 二级分类 列表数据 接口
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
                this.searchVal='';
            },

            // 下拉 接口
            loadGoodsByPage(tagId){
                this.$axios.get('/index.php?c=eqs&a=promotion',{
                    params:{
                        pageNo:this.pageNo,
                        pageSize:this.pageSize,
                        tagId:tagId,
                    }
                })
                .then(res =>{
                    console.log(this.pageNo);
                    if(res.data.list.length < 12){
                        this.$toast("数据已经全部加载");
                        // 如果为 true 表示所有的数据都加载完成 禁止上拉
                        // this.allLoaded=true;
                    }
                    if(this.pageNo == 1){
                        this.classifySecondCode=res.data.list;
                        console.log(this.classifySecondCode);


                    }else {
                        this.classifySecondCode=this.classifySecondCode.concat(res.data.list);
                        console.log(this.classifySecondCode);
                    }
                    this.pageNo++;
                })
                .catch(err =>{
                    console.log("goodlist"+err);
                })
            },

            // 购买
            btnBuy(e){
                let _this=this;

                let id=e.currentTarget.dataset.id,
                    price=e.currentTarget.dataset.price,
                    type=localStorage.getItem('bizType');
                console.log(id,price,type);
                this.$axios.get('/index.php/shop/purchase',{
                    params:{
                        id:id,
                        type:type,
                        pageMode:1,
                        expdType:2,
                        price:price,
                    }
                })
                .then(res =>{
                    // let that=this;
                    console.log(res.data);
                    if(res.code==200){
                        this.$toast({
                            message: '购买成功',
                            iconClass: 'icon icon-success',
                            duration:1500,
                        });
                        setTimeout(function(){
                            _this.$router.push({name:'userPurchased'});
                        },2000);
                    }else {
                        console.log(res.data.msg)
                        this.$toast({
                            message: res.data.msg,
                            iconClass: 'icon icon-success',
                            duration:1500,
                        });
                    }
                })
                .catch(err =>{
                    console.log("购买"+err);
                })
            },
        },
        created() {
            //bizType：一级页面传过来的二级导航id 获取二级列表要用
            let bizType=this.$route.params.bizType || 101,
            id=this.$route.params.id || 20;

            this.tagId=id;
            if(bizType){
                localStorage.setItem('bizType',bizType);
            }else {
                bizType=localStorage.getItem('bizType');
            }

            // 加载第一页的导航数据
            this.getClassifySecond(bizType);
        },
        mounted() {
            this.wrapperHeight = document.documentElement.clientHeight -
                this.$refs.wrapper.getBoundingClientRect().top-
                this.$refs.wrapper.getBoundingClientRect().bottom;
        }

    }
</script>
<style lang="scss" scoped>

    .page-loadmore-wrapper{
        overflow: scroll;
        /*min-height:calc(100ch - 0.94rem)!important;*/
    }

</style>
