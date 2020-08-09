<template>
    <div class="home">
        欢迎页面
        <!-- <button @click="show">aaa</button> -->
        <!-- <add-over ref="aa"
            @wechat-click="phoneClick"
            @email-click="emailClick"></add-over> -->
        <!-- <y-chose-car></y-chose-car> -->
    </div>
</template>
<script>
import addOver from './tmp/tmp';
export default {
    components: {
        addOver
    },
    methods: {
        show() {
            this.$refs['aa'].show();
        },
        phoneClick(val) {
            console.log(val)
        },
        emailClick(val) {
            console.log(val)
        }
    }
}
</script>
