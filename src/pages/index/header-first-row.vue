<template>
    <div class="header-first-row" :style="getStyle()">
        <div class="logo-cntr fl" :style="getLogoCntrStyle()">
            <y-logo></y-logo>
        </div>
        <div class="yun-cntr" @click="goHomeWithAppChange">
            <!-- <img class="yun-cntr-icon" src="./img/home.png"/> -->
            <div class="yun-cntr-icon yun-cntr-icon-home"></div>
            <div class="yun-cntr-txt">首页</div>
        </div>
        <div class="yun-cntr" v-for="yun in menuState.yunList"
            @click="yunClick(yun)"
            :class="yunClass(yun)"
            :key="yun.cloudId">
            <div class="yun-cntr-icon" :style="getIconStyle(yun)"></div>
            <div class="yun-cntr-txt">{{yun.cloudName}}</div>
        </div>
        <div class="user-info-cntr" :class="isShow ? 'user-info-cntr-sel':''">
            <div class="text" @click="toggle">
                {{JSON.parse(userIdentity).roleName}}-{{JSON.parse(userIdentity).organizationName}}
                <img class="square" :class="isShow ? 'rotateUp':'rotateDown'" src="./img/triangle.png" alt="">
            </div>
            <ul v-show="isShow" @mouseleave="mouseLeave">
                <li @click="userChange" v-show="isUserChangeShow()">
                    <div class="icon-switch"></div>
                    <!-- <img src="./img/swith.png" alt=""> -->
                    身份切换
                </li>
                <li @click="toLogout">
                    <!-- <img src="./img/out.png" alt=""> -->
                    <div class="icon-quit"></div>
                    退出登录
                </li>
            </ul>
        </div>
        <div class="yun-img">
            <div class="img-store"></div>
        </div>
        <div class="yun-img">
            <div class="img-help"></div>
        </div>
        <div class="yun-img">
            <div class="img-notice"></div>
        </div>
        <user-identity-select-dialog
            ref="userChangeRef"
            :appendToBody="true"
            :type="2"></user-identity-select-dialog>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { api_getAppMenuList } from 'api/main';
import { getUserIdentity } from 'api/login';
import { getCookie } from '@/utils/auth';
import { row1Height } from 'consts';
import userIdentitySelectDialog from 'pages/login/user-identity-select-dialog';
export default {
    created() {
        //云列表显示
        //点击云,查询出对应的应用列表并保存到store中,供左则应用列表模块展示
        //点击云,在对应的DOM上加上active类,并将当前点击的云对象保存进store
        this.getData();
    },
    data() {
        return {
            userIdentity: getCookie('userIdentity'),
            logo: require('static/logo.svg'),
            yunList: [],
            isShow:false
        }
    },
    computed: {
        ...mapState(['menuState'])
    },
    components: {
        userIdentitySelectDialog
    },
    methods: {
        ...mapMutations([
            'updateYingyongList',
            'updateCurrentYun',
            'resetVuex'
        ]),
        ...mapActions(['getAppCloudList']),
        goHomeWithAppChange() {
            console.log('这里可能是一个链接,有一个跳转动作');
        },
        async yunClick(yun) {
            //console.log('yun', yun)
            if(yun.href) {
                window.open(app.href);
                return;
            }
            this.updateCurrentYun(yun);
            let yingyongList = await api_getAppMenuList({
                data: {
                    cloudId: yun.cloudId
                }
            });
            //console.log('yingyongList', yingyongList);
            this.updateYingyongList(yingyongList);
        },
        yunClass(yun) {
            let result = [];
            if(this.menuState.currentYun && 
                yun.cloudId == this.menuState.currentYun.cloudId) {
                result.push('active');
            }
            return result;
        },
        getIconStyle(yun) {
            //console.log('yun', yun)
            return {
                backgroundImage: "url("+yun.iconUrl+")"
            }
        },
        getData() {
            this.getAppCloudList();
        },
        userDropDown(val) {
            //console.log(val)
            this.userdropdownflag = val;
        },
        getStyle() {
            return {
                height: row1Height + 'px'
            }
        },
        getLogoCntrStyle() {
            return {
                marginTop: (row1Height - 24)/2 + 'px'
            }
        },
        toggle(){
            this.isShow = !this.isShow;
        },
        mouseLeave(){
            document.addEventListener("click",this.leave,false)
        },
        leave(){
            this.isShow = false;
            document.removeEventListener("click",this.leave,false);
        },
        toLogout() {
            console.log('tologout', this)
            //this.resetVuex();
            this.logout();
        },
        userChange() {
            this.$refs['userChangeRef'].show();
        },
        isUserChangeShow() {
            //判断cookie中的userIdentities,如果长度为1,不显示
            let userIdentities = JSON.parse(getCookie('userIdentities'));
            return userIdentities.length != 1;
        }
    }
}
</script>

<style lang="less">
//@import "../../consts/vars.less";
.header-first-row{
    background: #283B62;
    position: relative;
    .logo-cntr{
        margin-left: 20px;
        margin-right: 52px;
    }
    .yun-cntr{
        margin-right: 28px;
        padding: 8px 0 8px 30px;
        float: left;
        position: relative;
        height: 36px;
        cursor: pointer;
        .yun-cntr-icon{
            position: absolute;
            top: 9px;
            left: 0;
            width: 18px;
            height: 18px;
            background-position: 0 0;
            background-size: 18px auto;
        }
        .yun-cntr-icon-home{
            background: url('../../static/home.png');
            background-size: 18px auto;
        }
        .yun-cntr-txt{
            color: #C5CAD9;
            font-size: 14px;
            line-height: 20px;
        }
        &:hover{
            .yun-cntr-icon{
                background-position: 0 -18px;
            }
            .yun-cntr-txt{
                color: #009FFF;
            }
        }
        &.active{
            opacity: 1;
        }
    }
    .yun-img{
        float: right;
        padding: 8px;
        .img-store{
            width: 20px;
            height: 20px;
            cursor: pointer;
            background-image: url('../../static/store.png');
            background-position: 0 0;
            background-size: 20px auto;
            &:hover{
                background-position: 0 -20px;
            }
        }
        .img-help{
            width: 20px;
            height: 20px;
            cursor: pointer;
            background-image: url('../../static/help.png');
            background-position: 0 0;
            background-size: 20px auto;
            &:hover{
                background-position: 0 -20px;
            }
        }
        .img-notice{
            width: 20px;
            height: 20px;
            cursor: pointer;
            background-image: url('../../static/notice.png');
            background-position: 0 0;
            background-size: 20px auto;
            &:hover{
                background-position: 0 -20px;
            }
        }
    }
    .user-info-cntr{
        margin-right: 12px;
        float:right;
        position: relative;
        height:36px;
        cursor: pointer;
        z-index: 1007;
        .text{
            padding:8px 26px 8px 8px;
            font-size:14px;
            font-family:MicrosoftYaHei;
            color:rgba(197,202,217,1);
            line-height:19px;
            .rotateDown{
                transform: rotate(0deg);
                transition: all .5s ease;
            }
            .rotateUp{
                transform: rotate(180deg);
                transition: all .5s ease;
            }
            .square{
                width:10px;
                height:6px;
            }
        }
        ul{
            position: absolute;
            background:rgba(61,78,114,1);
            z-index: 1;
            width:100%;
            li{
                padding-left: 8px;
                font-size:12px;
                font-family:MicrosoftYaHei;
                color:rgba(197,202,217,1);
                line-height:36px;
                height:36px;
                border-bottom:1px solid rgba(0,0,0,0.1); 
                .icon-switch, .icon-quit{
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    background-image: url('../../static/switch.png');
                    background-position: 0 0;
                    background-size: 16px auto;
                    position: relative;
                    top: 4px;
                }
                .icon-quit{
                    background-image: url('../../static/quit.png');
                }
                &:hover{
                    color: #009FFF;
                    background: #495A80;
                    .icon-switch, .icon-quit{
                        background-position: 0 -16px;
                    }
                }
            }
        }
    }
    .user-info-cntr-sel{
        background:rgba(61,78,114,1);
    }
}
</style>

