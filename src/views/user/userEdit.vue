<template>
    <div class="userEdit-box">
        <topTabbar :title="title" :routerName="routerName"/>

        <div class="">
            <!--分类数据-->
            <ul class="shop-box userEdit-box clearfix">
                <li v-if="classifySecondCode == ''"></li>
                <li class="shop-item" v-for="(item,index) in classifySecondCode" :key="index" v-else>
                    <div class="content">
                        <!--<div v-show="!item.publishTime" class="no-release">未发布</div>-->
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
    </div>
</template>

<script>

    export default {
        name: "userEdit",
        data(){
            return {
                title: "已购已保存模板",
                routerName:'userCenter',
                title2: "已编辑状态=statename",
                price: 60,
                priceTotal: 0,
                nowUrl:this.global.nowUrl,
                // 已编辑模板数据
                classifySecondCode: [ ],
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
                        edit:2,
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