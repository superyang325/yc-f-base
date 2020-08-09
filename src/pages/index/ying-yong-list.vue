<template>
    <a-menu
        @click="clickMenu"
        :selectedKeys="getSelectedKeys()"
        :inlineCollapsed="true"
        mode="inline"
        id="ychb-ying-yong-list"
    >
        <template v-for="item in menuState.yingyongList">
            <a-menu-item v-if="!item.children" :key="item.gid" title="">
                <!-- <img :src="item.iconUrl" class="yingyong-icon" alt=""> -->
                <div class="yingyong-icon no-global-tooltip" :style="getIconStyle(item)"
                    @mouseenter="hideTooltipByJs"></div>
                <span class="collapsed-nav-menu-title ellipsis" @mouseenter="hideTooltipByJs">{{item.name}}</span>
            </a-menu-item>
            <a-sub-menu v-else :menu-info="item" :key="item.gid">
                <span slot="title">
                    <!-- <img :src="item.iconUrl" class="yingyong-icon" alt=""> -->
                    <div class="yingyong-icon" :style="getIconStyle(item)"></div>
                    <span class="collapsed-nav-menu-title ellipsis">{{item.name}}</span>
                </span>
                <a-menu-item v-for="oneLevelMenu in item.children"    :key="oneLevelMenu.gid">
                    <span>{{oneLevelMenu.name}}</span>
                </a-menu-item>
            </a-sub-menu>
        </template>
    </a-menu>
    
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { log } from 'util';
import { setTimeout } from 'timers';
export default {
    created() {
        //console.log('yingyongList',this.menuState.yingyongList);
        /**
         * 根据store中的yingyongList进行应用列表展示
         * 点击某应用,显示一级菜单
         * 点击一级菜单,将该一级菜单加入store中的taskTabs,同时将该一级菜单保存到store中的currentOneLevelMenu
         */
    },
    computed: {
        ...mapState(['menuState'])
    },
    methods: {
        ...mapMutations([
            'addToTaskTabs',
            'updateCurrentOneLevelMenu',
        ]),
        ...mapActions(['pageShowInTask']),
        clickMenu(opt) {
            let oneLevelMenu = this.findMenu(JSON.parse(JSON.stringify(opt.keyPath)), this.menuState.yingyongList);
            oneLevelMenu.keyPath = opt.keyPath;
            //console.log('oneLevelMenu', oneLevelMenu);
            if(oneLevelMenu.childrenIndex === undefined) {
                //oneLevelMenu.childrenIndex = 0;//如果没有,初始化是第一个菜单
                this.$set(oneLevelMenu, 'childrenIndex', 0);
            }
            if(oneLevelMenu.lock === undefined) {
                //oneLevelMenu.childrenIndex = 0;//如果没有,初始化是第一个菜单
                this.$set(oneLevelMenu, 'lock', false);
            }
            if(oneLevelMenu.href) {
                //如果有href说明是window.open跳转
                window.open(oneLevelMenu.href);
            }else {
                //console.log('oneLevelMenu', oneLevelMenu);
                this.pageShowInTask(oneLevelMenu);
            }
        },
        getSelectedKeys() {
            if(this.menuState.currentOneLevelMenu && 
                this.menuState.currentOneLevelMenu.keyPath !== undefined) {
                //因为这个currentOneLevelMenu本身是一个任务对象,如果是纯页面的,是没有keyPath属性的
                return this.menuState.currentOneLevelMenu.keyPath;
            }
        },
        findMenu(keyPath, arr) {
            let currentKey = keyPath.pop();
            let result = arr.find(item => {
                return item.gid == currentKey;
            });
            if(keyPath.length == 0) {
                return result;
            }else {
                return this.findMenu(keyPath, result.children);
            }
        },
        getIconStyle(item) {
            //console.log('item', item)
            return {
                backgroundImage: "url("+item.iconUrl+")"
            }
        },
        hideTooltipByJs() {
            //这种情况本不应该存在,错误处理只能到这种程度了
            setTimeout(() => {
                $(document.body).find('.no-global-tooltip').parents('.ant-tooltip-content').hide();
            }, 80);
            
        }
    }
}
</script>
<style lang="less" >
@import "../../consts/vars.less";
#ychb-ying-yong-list {
    background: @pageBackGround;
    width: auto;
    .collapsed-nav-menu-title{
        opacity: 1;
        position: absolute;
        top: 26px;
        left: 0;
        width: 100%;
        height: 15px;
        line-height: 15px;
        font-size: 12px; 
        color: #3C5484;
        text-align: center;
    }
    .ant-menu-submenu-selected{
        .collapsed-nav-menu-title{
            color: #1890ff;
        }
    }
    .ant-menu-submenu-title{
        padding: 0 0 !important;
        margin-top: 0;
    }
    .ant-menu-item, .ant-menu-submenu-vertical{
        height: 48px!important;
        position: relative;
        margin-bottom: 24px!important;
        padding: 0 0!important;
        .yingyong-icon{
            position: absolute;
            top: 0;
            left: 50%;
            width: 24px;
            height: 24px;
            margin-left: -12px;
            background-position: 0 0;
            background-size: 24px auto;
        }
        &:hover{
            .yingyong-icon{
                background-position: 0 -24px;
            }
        }
    }
    
}
.no-global-tooltip-hide{
    display: none;
}
</style>
