<template>
    <div class="y-button" :class="{'block': block}">
        <a-config-provider :autoInsertSpaceInButton="autoInsertSpaceInButton">
            <a-button 
                :type="type" 
                @click="click"
                :loading="loading"
                :block="block">
                    <slot></slot>
            </a-button>
        </a-config-provider>
    </div>
</template>
<script>
export default {
    name: 'y-button',
    data() {
        return {
            oldTxt: this.$slots.default[0].text,
            loading: false,
            timer: null,
            autoInsertSpaceInButton:false,
            minTime: 100,//至少1秒种后才能继续点击
            forceCloseTime: 10000,//接口10秒钟
        }
    },
    props: {
        block: Boolean,
        type: String,
        logInfo: String,//可以考虑后期的日志
        isLoading:{
            type:Boolean,
            default(){
                return true
            }
        }
    },
    methods: {
        click() {
            //这里加一个判断,点击后计时,过了一定时间后,方法finish没执行的话,强制执行
            if(this.isLoading){
                this.loading = true;
                this.toRun();
                this.timer = setTimeout(() => {
                    //console.log('强制')
                    //这里的逻辑,是当finish或success没有被成功调用时,一定时间后自动触发
                    this.toInit();
                    this.hideLoading();
                }, this.forceCloseTime);
            }
            this.$emit('click');
        },
        hideLoading() {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.loading = false;
            }, this.minTime);
        },
        finish() {
            this.toInit();
            this.hideLoading();
        },
        success() {
            this.toSuccess();
            this.hideLoading();
        },
        toRun() {
            this.$slots.default[0].text = '正在' + this.oldTxt; 
        },
        toSuccess() {
            //console.log('toSuccess', this.oldTxt)
            this.$slots.default[0].text = this.oldTxt + '成功';
        },
        toInit() {
            this.$slots.default[0].text = this.oldTxt;
            // console.log('toInit', this.oldTxt)
            // setTimeout(() => {
            //     console.log('toInit', this.oldTxt)
            //     this.$slots.default[0].text = this.oldTxt;
            // }, 100);
        }
    }
}
</script>
<style lang="less">
.y-button{
    display: inline-block;
    &.block{
        display: block;
    }
    .ant-btn-primary{
        padding: 6px 24px;
        background:rgba(51,102,255,1);
        border-radius:4px;
        border: none;
        span{
            height:20px;
            font-size:14px;
            font-family:MicrosoftYaHei;
            color:rgba(255,255,255,1);
            line-height:19px;
        }
        &:hover{
            background: #5C85FF;
        }
    }
}
</style>


