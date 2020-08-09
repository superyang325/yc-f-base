<template>
    <div class="user-identity-dialog" v-if="isShow()">
        <div class="mask" @click="maskClick"></div>
        <div class="content">
            <div class="title">身份选择</div>
            <!-- <ul>
                <li v-for="item in userIdentities"
                    :key="item.tenantId"
                    :class="getClass(item)"
                    @click="liClick(item)">
                    <div class="gangwei">{{item.roleName}}</div>
                    <div class="changjia">{{item.organizationName}}</div>
                    <img src="./img/ok.png" class="ok-btn"/>
                </li>
            </ul> -->
            <table class="user-identity-table">
                <tbody>
                    <tr v-for="item in userIdentities"
                        :key="item.tenantId"
                        :class="getClass(item)"
                        @click="liClick(item)">
                        <td>
                            <div class="gangwei">{{item.roleName}}</div>
                        </td>
                        <td>
                            <div class="changjia">{{item.organizationName}}</div>
                        </td>
                        <td>
                            <div class="ok-btn">
                                <span class="ok-btn-text">易车</span>
                                <img src="./img/ok.png"/>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import { getCookie } from '@/utils/auth';
export default {
    created() {
        /**
         * 逻辑: 1.有两种进入方式,type为1时,代表从登陆页面直接进入;type为2时,代表点击身份切换按钮时进入.多身份列表可直接从cookie中获取
         * 2.用户点击某身份时,进行身份切换操作,在type为2时,允许用户直接点击mask进行关闭操作
         */
        if(this.type == 1) {
            this.isDialogShow = true;
        }
        if(this.type == 2) {
            this.isDialogShow = false;
        }
        this.init();
    },
    mounted() {
        if(this.appendToBody) {
            $(this.$el).appendTo(document.body);
        }
    },
    data() {
        return {
            userIdentities: [],
            userTenantId: '',
            userRoleId: '',
            isDialogShow: true,
        }
    },
    computed: {
        ...mapState(['userState'])
    },
    props: {
        type: {
            type: String,
            default() {
                return 1;
            }
        },
        appendToBody: Boolean
    },
    methods: {
        ...mapActions(['gotoapp']),
        init() {
            this.userIdentities =  JSON.parse(getCookie('userIdentities'));
            //console.log('this.userIdentities', this.userIdentities)
            this.userTenantId = getCookie('userTenantId');
            if(this.userTenantId) {
                this.userRoleId = this.userIdentities.find(item => {
                    return item.tenantId == this.userTenantId;
                }).roleId;
            }
            if(!this.userTenantId) {
                this.userTenantId = this.userIdentities[0].tenantId;
                this.userRoleId = this.userIdentities[0].roleId;
            }
        },
        liClick(item) {
            this.userTenantId = item.tenantId;
            this.userRoleId = item.roleId;
            this.gotoapp({userIdentity: item});
        },
        getClass(item) {
            let result = [];
            if(item.tenantId == this.userTenantId
                && item.roleId == this.userRoleId) {
                result.push('active');
            }
            return result;
        },
        maskClick() {
            if(this.type == 1) {
                return;
            }
            this.hide();
        },
        isShow() {
            return this.isDialogShow;
        },
        show() {
            this.isDialogShow = true;
        },
        hide() {
            this.isDialogShow = false;
        },
    }
}
</script>
<style lang="less" scoped>
.user-identity-dialog{
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    position: fixed;
    z-index: 1000;
    .mask{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
        background: #283B62;
        opacity: .3;
    }
    .content{
        position: absolute;
        top: 50%;
        left: 50%;
        width: 360px;
        margin-left: -180px;
        margin-top: -75px;
        z-index: 12;
        background: #283B62;
        padding: 8px;
        .title{
            font-size:16px;
            color:rgba(255,255,255,1);
            line-height:16px;
            margin-left: 8px;
            margin-bottom: 8px;
            letter-spacing:2px;
            opacity: .6;
        }
        .user-identity-table{
            width: 344px;
            tr{
                cursor: pointer;
                td{
                    height: 32px;
                    padding-bottom: 4px;
                    .gangwei,.changjia,.ok-btn{
                        padding: 6px 8px;
                        background: #42609D;
                    }
                    .gangwei{
                        color: #FFFFFF;
                        font-size: 14px;
                    }
                    .changjia{
                        color: rgba(255,255,255,.6);
                        font-size: 14px;
                    }
                    .ok-btn{
                        font-size: 14px;
                        position: relative;
                        .ok-btn-text{
                            color: #42609D;
                        }
                        img{
                            width: 16px;
                            height: 16px;
                            position: absolute;
                            top: 8px;
                            right: 8px;
                            display: none;
                        }
                    }
                    
                }
                &.active{
                    .gangwei,.changjia,.ok-btn{
                        background: #3366FF;
                    }
                    .changjia{
                        opacity: 1;
                    }
                    .ok-btn{
                        .ok-btn-text{
                            color: #3366FF;
                        }
                        img{
                            display: block;
                        }
                    }
                }
                
            }
            
            
            
        }
    }
}
</style>


