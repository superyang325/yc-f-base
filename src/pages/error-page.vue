<template>
    <div class="error-page" v-if="isShow()">
        <div class="error-page-info-cntr">
            <img :src="errorState.errorInfo.imgUrl" v-if="errorState.errorInfo.imgUrl" class="error-page-img"/>
            <img src="../static/400.png" v-if="errorState.errorInfo.code == '400'" class="error-page-img">
            <img src="../static/401.png" v-if="errorState.errorInfo.code == '401'" class="error-page-img">
            <img src="../static/403.png" v-if="errorState.errorInfo.code == '403'" class="error-page-img">
            <img src="../static/404.png" v-if="errorState.errorInfo.code == '404'" class="error-page-img">
            <img src="../static/500.png" v-if="errorState.errorInfo.code == '500'" class="error-page-img">
            <img src="../static/504.png" v-if="errorState.errorInfo.code == '504'" class="error-page-img">
            <div class="error-page-code">{{errorState.errorInfo.code}}</div>
            <div class="error-page-desc">
                {{errorState.errorInfo.desc}}
            </div>
            <a-button v-if="isBtnShow()" class="error-page-btn" @click="btnClick">{{errorState.errorInfo.btnText || '返回'}}</a-button>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
export default {
    created() {
        //console.log('errorpage...')
        /**
         * 逻辑: [400,401,403,404,500,505]是通过code直接显示预存的图片,其他code值,图片显示imgUrl对应的图片
         */
    },
    computed: {
        ...mapState(['errorState'])
    },
    methods: {
        ...mapMutations(['resetErrorInfo']),
        isShow() {
            //console.log(this.globalState.errorInfo);
            return JSON.stringify(this.errorState.errorInfo) != '{}';
        },
        isBtnShow() {
            if(this.errorState.errorInfo.btnIsShow !== undefined) {
                return this.errorState.errorInfo.btnIsShow;
            }
            return true;
        },
        btnClick() {
            //console.log('this.globalState.errorInfo',this.errorState.errorInfo);
            this.resetErrorInfo();//先清空,也就是关闭errorpage页
            let clickFn = this.errorState.errorInfo.click;
            if( clickFn && typeof clickFn == 'function') {
                clickFn();
            }else {
                this.$router.go(-1);
            }
        }
    }
}
</script>

<style lang="less">
.error-page{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    background: #ffffff;
    .error-page-info-cntr{
        height: 360px;
        width: 360px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -180px;
        margin-top: -180px;
        position: relative;
        .error-page-img{
            width: 360px;
            height: 240px;
        }
        .error-page-code{
            width: 100%;
            height: 34px;
            font-size: 24px;
            font-weight: bold;
            color: #06123C;
            text-align: center;
            margin-top: 10px;
            margin-bottom: 4px;
        }
        .error-page-desc{
            width: 100%;
            font-size: 14px;
            color: #7890B4;
            text-align: center;
        }
        .error-page-btn{
            display: block;
            margin: 0 auto;
            margin-top: 20px;
        }
    }
    
    
}
</style>
