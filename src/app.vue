<template>
    <a-locale-provider :locale="zh_CN">
        <div class="app">
            <router-view></router-view>
        </div>
    </a-locale-provider>
</template>
<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

import { mapMutations } from 'vuex';
import { yc_throttle } from 'utils';
import { setVue } from 'utils/http'
export default {
    created() {
        setVue(this);
    },
    mounted() {
        this.onResize();
        window.addEventListener('resize', yc_throttle(()=>{
            this.onResize();
        }));
    },
    data() {
        return {
            zh_CN
        }
    },
    methods: {
        ...mapMutations([
            'updateScreenHeight',
            'updateScreenWidth',
        ]),
        setScreenWH() {
            this.updateScreenHeight(document.documentElement.clientHeight);
            this.updateScreenWidth(document.documentElement.clientWidth);
        },
        onResize() {
            this.setScreenWH();
        }
    }
}
</script>

<style lang="less">
.app{
    height: 100%;
}
</style>

