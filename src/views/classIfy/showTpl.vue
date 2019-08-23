<template>
    <div>
        <topTabbar :title="title" :routerName="routerName"/>
        <iframe frameborder="0"  v-bind:src="reportUrl"  class="show-iframe"></iframe>
    </div>
</template>

<script>
    export default {
        name: "showTpl",
        data(){
            return{
                title:'展示页',
                routerName:'',

                nowUrl:this.global.nowUrl,

                reportUrl:'',
            }
        },
        methods:{

        },
        created() {
            let codeId=this.$route.params.codeId || 'aW2oj593',
                source=this.$route.params.source;
            console.log(codeId,source);
            if(source == 'classInfo'){
                this.routerName='classIfyInfo'
            }else{
                this.routerName='userCenter'
            }
            let reportUrl=this.nowUrl+'/v/'+codeId;
            console.log(reportUrl);
            this.reportUrl=reportUrl;
        }
    }
</script>

<style scoped>
    .show-iframe{
        display: block;
        width: 100%;
        margin: 0 auto;
        height: calc(100vh - 0.42rem);
    }
    .phoneBox  #nr{
        transform: scale(1)!important;
    }
</style>