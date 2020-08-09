<template>
</template>
<script>
import { mapState } from 'vuex';
export default {
    watch: {
        'menuState.currentOneLevelMenu': {
            handler(taskObj) {
                //console.log('taskObj',taskObj);
                this.taskObjChange(taskObj);
            },
            deep: true
        }
    },
    computed: {
        ...mapState(['menuState'])
    },
    methods: {
        taskObjChange(taskObj) {
            //console.log('taskObj', taskObj)
            //这里取值,也是先要排除按钮类假menu
            
            if(taskObj.children && taskObj.children.length) {
                //console.log(1);
                let filterMenu = taskObj.children.filter(item => {
                    return item.menuType != 'F';
                });
                let targetRouterObj = null;
                if(filterMenu.length) {
                    targetRouterObj = taskObj.children[taskObj.childrenIndex];
                }else {
                    targetRouterObj = taskObj;
                }
 
                this.directToPage(targetRouterObj);
            }else {
                //console.log(2);
                this.directToPage(taskObj);
            }
        },
        directToPage(targetRouterObj) {
            //跳转逻辑:
            //openType: 0, //0代表在任务栏中显示,1代表新开页面显示,2代表在当前页面全屏显示
            let url = targetRouterObj.url.replace(/^\s+|\s+$/g,'');
            //console.log('url111', url)
            this.$router.push(url);
        }
    }
}
</script>
<style lang="less">

</style>


