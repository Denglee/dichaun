<template>
    <div>
        <!-- <topTabbar :title="title" :routerName="routerName"/>-->
        <div class="goBack1" @click='goBack'>
            <img src="../../assets/icon/ic_return.png"  alt=""  >
        </div>

        <iframe frameborder="0"  v-bind:src="editUrl"  class="show-iframe"></iframe>
    </div>
</template>

<script>
    export default {
        name: "showTpl",
        data(){
            return{
                title:'编辑页',
                routerName:'userCenter',
                editUrl:'',

            }
        },
        methods:{
            goBack(e){
                // console.log()
                // let routerName=e.target.dataset.routername;
                // console.log(routerName)
                this.$router.push({name:'userCenter'});
            }
        },
        created() {
            let editId=this.$route.params.editId || 4707597;
            console.log(editId);
            let editUrl='/#/scene/create/'+editId+'?pageId=1';
            console.log(editUrl);
            this.editUrl=editUrl;
        }
    }
</script>

<style scoped>
    .goBack1{
        /*border: solid 1px red;*/
        width: 80px;
        height: 30px;
        line-height: 30px;
        position: fixed;
        top: 10px;
    }
    .goBack1 img{
        height: 100%;
        padding-left: 10px;
    }
    .show-iframe{
        display: block;
        width: 100%;
        margin: 0 auto;
        /*height: calc(100vh - 0.42rem);*/
        height: 100vh;
    }

</style>