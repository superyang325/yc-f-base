<template>
    <div class="two-level-menu-cntr" v-if="isShow()">
        <div class="two-level-menu-inner-cntr" :style="getStyle()">
            <div class="item"
                v-for="(twoLevelMenu, index) in currentOneLevelMenuNoF" 
                :key="twoLevelMenu.gid" 
                @click="clickTwoLevelMenu(twoLevelMenu, index)"
                :class="getClass(index)">
                {{twoLevelMenu.name}}
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
import { secondMenuHeight } from 'consts';
export default {
    created() {
        /**
         * 读取store中的currentOneLevelMenu对象,如果有children并且不为空,则展示
         * 二级菜单列表,否则隐藏不显示
         * 
         */
    },
    
    computed: {
        ...mapState(['menuState']),
        ...mapGetters(['currentOneLevelMenuNoF'])
    },
    methods: {
        ...mapMutations([
            'updateCurrentOneLevelMenuProperty'
        ]),
        ...mapActions(['switchTwoLevelMenu']),
        isShow() {
            if(this.currentOneLevelMenuNoF.length) {
                return true;
            }
            return false;
        },
        getClass(index) {
            let result = [];
            if(index == this.menuState.currentOneLevelMenu.childrenIndex) {
                result.push('active');
            }
            return result;
        },
        clickTwoLevelMenu(twoLevelMenu, index) {
            this.switchTwoLevelMenu(index);
            //console.log('twoLevelMenu', twoLevelMenu)
            // this.updateCurrentOneLevelMenuProperty({
            //     property: 'childrenIndex',
            //     value: index
            // });//这行代码因起currentOneLevelMenu变化,从而触发[direct-to-page]的taskObjChange方法
        },
        getStyle() {
            return {
                height: secondMenuHeight + 'px'
            }
        },
    }
}
</script>
<style lang="less" scoped>
.two-level-menu-cntr{
    width: 100%;
    padding: 0 16px;
    .two-level-menu-inner-cntr{
        position: relative;
        border-bottom: 1px solid #DBE0E7;
    }
    .item{
        height: 100%;
        padding-top: 16px;
        padding-bottom: 8px;
        margin-right: 16px;
        color: #3C5484;
        line-height:16px;
        font-size: 12px;
        float: left;
        cursor: pointer;
        &.active{
            border-bottom: 2px solid #3366FF;
            color:#3366FF;
            margin-top: 1px;
        }
    }
}
</style>
