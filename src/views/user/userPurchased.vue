<template>
    <div class="userEdit-box">
        <topTabbar :title="title" :routerName="routerName"/>

        <!--分类数据-->
        <ul class="shop-box userEdit-box clearfix">
            <li v-if="classifySecondCode == ''"></li>
            <li class="shop-item" v-for="(item,index) in classifySecondCode" :key="index" v-else>
                <div class="content">
                    <!-- <div v-show="!item.publishTime" class="no-release">未发布</div>-->
                    <img lazy-load fit="imgFit" class="img-fluid"  :src="nowUrl+'/Uploads/'+item.cover" alt="">
                    <div class="ellipsis list-name">{{item.name}}</div>
                </div>
                <div class="btn-group">
                    <router-link :to='{name:"showTpl",params:{ codeId:item.code,source:"purchased" }}' class="btn-look">查看</router-link>
                    <router-link :to='{name:"editTpl",params:{ editId:item.id }}' class="btn-look">编辑</router-link>
                    <!--<a v-bind:href="['/#/scene/create/'+item.id+'?pageId=1']" class="btn-look btn-edit">编辑</a>-->
                </div>
            </li>
        </ul>
    </div>
</template>

<script>

    export default {
        name: "userPurchased",
        data(){
            return {
                title: "已购未编辑模板",
                routerName:'userCenter',
                price: 60,
                priceTotal: 0,
                nowUrl:this.global.nowUrl,

                // 已编辑模板数据
                classifySecondCode: [
                    // {
                    //     "id": 4707597,
                    //     "name": "4.19\uff0c\u7559\u592b\u9e2d\u6ee1\u8db3\u4f60\u5bf9\u9e2d\u7684\u6700\u7ec8\u5e7b\u60f3",
                    //     "createUser": "0",
                    //     "createTime": 1423645519000,
                    //     "type": 101,
                    //     "pageMode": 0,
                    //     "cover":"syspic/pageimg/yq0KA1UzUeyAZ-csAAHrraZjNDQ921.png",
                    //     "image": {
                    //         "bgAudio": {
                    //             "url": "syspic/mp3/yq0KA1UzfO-AUsjrABzPo4F-nqM757.mp3",
                    //             "type": "3"
                    //         },
                    //         "imgSrc": "syspic/pageimg/yq0KA1UzUeyAZ-csAAHrraZjNDQ921.png",
                    //         "hideEqAd": false,
                    //         "isAdvancedUser": false
                    //     },
                    //     "isTpl": 0,
                    //     "isPromotion": 0,
                    //     "status": 1,
                    //     "createTime": "2015-04-22 23:11:28",
                    //     "code": "aW2oj593",
                    //     "sort": 0,
                    //     "pageCount": 0,
                    //     "dataCount": 0,
                    //     "showCount": 40,
                    //     "userLoginName": null,
                    //     "userName": null,
                    //     "price":0
                    // },
                    // {
                    //     "id": 4661771,
                    //     "name": "\u591f\u89c6\u89c9",
                    //     "createUser": "0",
                    //     "createTime": 1423645519000,
                    //     "type": 101,
                    //     "pageMode": 0,
                    //     "cover":"syspic/pageimg/yq0KA1Uvd8WARxW9AAFbN0MIly8156.jpg",
                    //     "image": {
                    //         "bgAudio": {
                    //             "url": "syspic/mp3/yq0KA1UvhWqAC544ABEr8pVWWl8643.mp3",
                    //             "type": "3"
                    //         },
                    //         "imgSrc": "syspic/pageimg/yq0KA1Uvd8WARxW9AAFbN0MIly8156.jpg",
                    //         "hideEqAd": false,
                    //         "isAdvancedUser": false
                    //     },
                    //     "isTpl": 0,
                    //     "isPromotion": 0,
                    //     "status": 1,
                    //     "createTime": "2015-04-22 23:11:28",
                    //     "code": "8hM06IzY",
                    //     "sort": 0,
                    //     "pageCount": 0,
                    //     "dataCount": 0,
                    //     "showCount": 15,
                    //     "userLoginName": null,
                    //     "userName": null,
                    //     "price":0
                    // },
                ],
            }
        },
        methods:{

            // 获取 已编辑 数据
            getEditCode(eaditVal){
                this.$axios.get('/index.php?c=scene&a=my',{
                    params: {
                        showData: '',
                        pageNo: 1,
                        pageSize: 12,
                        user: '',
                        name: '',
                        groupId: '',
                        edit:'1',
                        app:2,
                    }
                })
                    .then(res =>{
                        console.log(res.data);
                        this.classifySecondCode = res.data.list;
                    })
                    .catch(error=>{
                        console.log("二级导航分类:" + error)
                    })
            },
        },

        created(){
            this.getEditCode();
        },
    }
</script>

<style scoped lang="scss">

</style>