<template>
    <div class="yiche-layout">
        <div class="page-wrapper" :style="getWrapperStyle()">
            <div class="app-header" :style="getAppHeaderStyle()">
                <header-first-row></header-first-row>
                <task-tabs></task-tabs>
                <direct-to-page></direct-to-page>
                <pre-load-data></pre-load-data>
            </div>
            <div class="app-nav" :style="getAppNavStyle()">
                <div class="ying-yong-list-cntr" :style="getNavMenuCntrStyle()">
                    <ying-yong-list></ying-yong-list>
                </div>
                <div class="nav-buttons" :style="getNavButtonsStyle()">
                    <div class="menu-collection"></div>
                    <div class="sys-config"></div>
                </div>
            </div>
            <div class="app-content" :style="getAppContentStyle()">
                <two-level-menu-list></two-level-menu-list>
                <div class="view-content" :style="getViewContentStyle()">
                    <div class="view-content-inner-cntr">
                        <div style="min-width: 700px;">
                            <keep-alive>
                                <router-view v-if="isShow(true)">
                                    <!-- 这里是会被缓存的视图组件，比如 Home！ -->
                                </router-view>
                            </keep-alive>
                            <router-view v-if="isShow(false)">
                                <!-- 这里是不被缓存的视图组件，比如 Edit！ -->
                            </router-view>
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        </div>
        <div class="app-footer" :style="getFooterStyle()">CopyRight © 2019 易车出品</div>
        <error-page></error-page>
    </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex';
import yingYongList from './index/ying-yong-list';
import headerFirstRow from './index/header-first-row';
import taskTabs from './index/task-tabs';
import twoLevelMenuList from './index/two-level-menu-list';
import directToPage from './index/direct-to-page';
import preLoadData from './index/pre-load-data';
import errorPage from './error-page';
import { getToken, getCookie, setCookie } from '@/utils/auth';
import { yc_goLogin, yc_goUserIdentitySelect } from 'utils/index';
import { 
    row1Height,
    row2Height,
    footerHeight,
    navButtonsHeight,
    pageRightPadding,
    pageLeftPadding,
    } from 'consts';
export default {
    mounted() {
        let token = getToken();
        //console.log('token123',token);
        if(!token) {
            yc_goLogin();
        }
        //根据token进一步判断当前用户身份是否选中
        this.isUserInentitySelected(token);
    },
    data() {
        return {
            show: true
        }
    },
    provide() {
        return {
            reload: this.reload
        }
    },
    components: {
        yingYongList,
        headerFirstRow,
        taskTabs,
        twoLevelMenuList,
        directToPage,
        errorPage,
        preLoadData,
    },
    computed: {
        ...mapState(['globalState']),
        ...mapGetters(['contentHeight'])
    },
    methods: {
        reload() {
            this.show = false;
            this.$nextTick(() => {
                this.show = true;
            });
        },
        isShow(keepAlive) {
            //经过测试,重新加载,只能对keepAlive值为false的起作用
            if(this.show == false) {
                return false;
            }else {
                if(keepAlive) {
                    return this.$route.meta.keepAlive;
                }else {
                    return !this.$route.meta.keepAlive;
                }
            }
        },
        getFooterStyle() {
            return {
                height: footerHeight + 'px',
                lineHeight: footerHeight + 'px'
            }
        },
        getWrapperStyle() {
            return {
                minHeight: (this.globalState.screenHeight - footerHeight) + 'px',
                paddingTop: (row1Height + row2Height) + 'px',
                paddingLeft: pageLeftPadding + 'px',
            }
        },
        getAppHeaderStyle() {
            return {
                height: row1Height + 'px'
            }
        },
        getNavButtonsStyle() {
            return {
                height: navButtonsHeight + 'px'
            }
        },
        getViewContentStyle() {
            //这个需要判断一下二级菜单行是否显示
            return {
                height: this.contentHeight + 'px'
            }
        },
        getAppNavStyle() {
            return {
                height: this.contentHeight + 'px',
                top: (row1Height + row2Height) + 'px',
                width: pageLeftPadding + 'px'
            }
        },
        getNavMenuCntrStyle() {
            return {
                height: this.contentHeight - navButtonsHeight + 'px'
            }
        },
        getAppContentStyle() {
            return {
                marginRight: pageRightPadding + 'px',
            }
        },
        isUserInentitySelected(token) {
             /**
              * 根据token进一步判断当前用户身份是否选中
              * 1.选判断有没有身份信息,如果有,则直接使用
              * 2.如果没有则直接跳转到身份信息选择页面进行选择(如果只有一个身份信息,则用户在登陆成功后,肯定会将信息带过来,而身份信息选择页面,有可能用户还未选择就通过url直接过来,只有这种情况下身份信息是没有的)
              */
             let userTenantId = getCookie('userTenantId');
             if(!userTenantId) {
                 //如果没有或是假id,则跳转到身份选择页面
                yc_goUserIdentitySelect();
             }
        },
    }
}
</script>
<style lang="less">
@import "../consts/vars.less";
.yiche-layout{
    .page-wrapper{
        position: relative;
        min-height: 300px; /* js计算给个最小高度，防止因内容太少导致底部版权信息跑到页面中央，这个值不必太精确*/
        background: @pageBackGround;
    }
    .app-header{
        position: absolute;
        top: 0;
        left: 0;
        z-index: 100;
        width: 100%;
    }
    .app-nav{
        position: absolute;
        left: 0;
        z-index: 100;
        .ying-yong-list-cntr{
            overflow-y: auto;
        }
        .nav-buttons{
            position: absolute;
            bottom: 0;
            left:0;
            width: 100%;
            padding-bottom: 10px;
            .menu-collection{
                width: 24px;
                height: 24px;
                position: absolute;
                top: 0;
                left: 50%;
                margin-left: -12px;
                cursor: pointer;
                background-image: url('../static/star.png');
                background-position: 0 0;
                background-size: 24px auto;
                &:hover{
                    background-position: 0 -24px;
                }
            }
            .sys-config{
                width: 24px;
                height: 24px;
                position: absolute;
                top: 48px;
                left: 50%;
                margin-left: -12px;
                cursor: pointer;
                background-image: url('../static/config.png');
                background-position: 0 0;
                background-size: 24px auto;
                &:hover{
                    background-position: 0 -24px;
                }
            }
        }
    }
    .app-content{
        background: #ffffff;
        position: relative;
    }
    .view-content{
        padding: 16px;
        .view-content-inner-cntr{
            overflow-x: hidden;
            position: relative;
            height: 100%;
        }
    }
    .app-footer{
        background: @pageBackGround;
        text-align: center;
        color: #818CA7;
        font-size: 12px;
    }
    
}
</style>