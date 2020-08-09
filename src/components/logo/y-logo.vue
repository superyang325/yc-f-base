<template>
    <div class="y-logo" :class="getClass()">
        <img :src="logo" class="logo" alt="">
        <div class="logo-split"></div>
        <div class="logo-title">智能车商平台</div>
    </div>
</template>
<script>
export default {
    name: 'y-logo',
    data() {
        return {
            logo: require('static/logo.svg'),
        }
    },
    props: {
        size: {
            type: String,
            default() {
                return 'small'
            }
        }
    },
    methods: {
        getClass() {
            let result = [];
            result.push(this.size);
            return result;
        }
    }
}
</script>
<style lang="less">
.y-logo{
    position: relative;
    height: 24px;
    .logo{
        position: absolute;
        left: 0;
    }
    .logo-split{
        position: absolute;
        width:1px;
        background:#ffffff;
    }
    .logo-title{
        position: absolute;
        color:#ffffff;
    }
    &.small{
        width: 204px;
        .logo{
            width: 90px;
            height: 18px;
            top: 3px;
        }
        .logo-split{
            top: 4px;
            left: 99px;
            height:18px;
        }
        .logo-title{
            top: 4px;
            left: 108px;
            font-size:14px;
            line-height:19px;
            letter-spacing:2px;
        }
    }
    
    &.big{
        width: 240px;
        .logo{
            width: 100px;
            height: 20px;
            top: 2px;
        }
        .logo-split{
            top: 4px;
            left: 110px;
            height:18px;
        }
        .logo-title{
            top: 1px;
            left: 120px;
            font-size:18px;
            line-height:24px;
            letter-spacing:2px;
        }
    }
    
}
</style>


