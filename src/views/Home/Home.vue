<template>
    <div>
        <!--头部-->
        <header class="header-box">
            <nav class="header-nav">
                <div class="header-top">
                    <span class="index-title">首页</span>
                    <span class="top-right">剩余金币：{{residualPrice}}</span>
                </div>
            </nav>
        </header>

        <div>
            <img alt="" class="" :src="nowUrl+'/shop/img/index_banner.png'">
        </div>

        <!--列表数据-->
        <ul class="shop-ul">
            <li v-if="classifySecondCode == ''"></li>
            <li class="shop-item" v-for="(item,index) in classifySecondCode" :key="index" v-else>
                <router-link :to='{name:"showTpl",params:{ codeId:item.code,source:"classInfo" }}' class="content">
                    <van-image lazy-load fit="imgFit"  class="img-fluid"  :src="nowUrl+'/Uploads/'+item.cover" />
                    <div class="ellipsis list-name">{{item.name}}</div>
                </router-link>
                <div class="shop-price">{{item.price}} 金币</div>
<!--                <div class="btn-group">-->
<!--                    <router-link :to='{name:"showTpl",params:{ codeId:item.code,source:"classInfo" }}' class="btn-look">查看</router-link>-->
<!--                    <button typt="button" class="btn-look" @click="btnBuy" :data-id="item.id" :data-price="item.price">购买</button>-->
<!--                </div>-->
            </li>
        </ul>


        <!--底部-->
        <bomBar/>
    </div>
</template>
<script>

    export default {
        name: "Home",
        data() {
            return {
                classifySecondCode:[],
                nowUrl:this.global.nowUrl,
            }
        },
        methods: {
            getSecondCode(){
                this.$axios.get('/index.php?c=eqs&a=promotion&pageNo=1&pageSize=12&tagId=20')
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
            var userinfo 	= '{"userid_int":"1","gid":"0","uname":"test","email_varchar":"test@qq.com","openid_qq":"","password_varchar":"e10adc3949ba59abbe56e057f20f883e","create_time":"2015-04-01 13:41:50","last_time":"2019-08-23 09:15:05","limit_time":"2016-04-01 01:00:00","status_int":"1","createip_varchar":"0.0.0.0","lastip_varchar":"0.0.0.0","level_int":"0","scene_times":"2","remark":"1111123","shenhe_status":"1","allow_nums":"255","end_time":"1734105600","xd":"8360","sex":"0","phone":"","tel":"","qq":"","headimg":"","type":"4","token":null,"token_exptime":null,"role":"0","user_activation_key":"8326e7b7835f389baf6e1feabf42b61f","checkemail":null,"is_device":"1"}';

            var userInfo=JSON.parse(userinfo);
            console.log(userInfo);
            this.residualPrice=userInfo.xd;
            this.getSecondCode()
        }

    }
</script>
<style lang="scss" scoped>
    .index-title{
        padding-left: .1rem;
    }
    .header-top{
        text-align: left;
    }
    .top-right{
        position: absolute;
        right: .2rem;
    }
</style>
