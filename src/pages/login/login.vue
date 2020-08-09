<template>
    <div class="yc-login">
        <div class="bg"></div>
        <div class="content">
            <div class="logo-cntr">
                <y-logo size="big"></y-logo>
            </div>
            <div class="form">
                <div class="tabs">
                    <div class="tab active">密码登录</div>
                    <div class="split"></div>
                    <div class="tab">验证码登录</div>
                </div>
                <div class="input-cntr input-cntr1" :class="getAccountClass()">
                    <a-icon type="user" class="input-prefix" />
                    <input placeholder="请输入邮箱/账号/手机号" v-model="account" class="input" @focus="setFocus(1)" @blur="onAccountBlur()" @input="onAccountInput" ref="accountInputRef"/>
                    <div class="error-info" v-show="accountError">
                        <img src="./img/left-arrow.png" class="left-arrow" alt="">
                        {{accountErrorInfo}}
                    </div>
                </div>
                <div class="input-cntr input-cntr2" :class="getPasswordClass()">
                    <a-icon type="lock" class="input-prefix" />
                    <input placeholder="请输入密码" v-model="password" type="password" class="input" @focus="setFocus(2)" @blur="setFocus(0)" @input="onPasswordInput" ref="passwordInputRef"/>
                    <div class="error-info" v-show="passwordError">
                        <img src="./img/left-arrow.png" class="left-arrow" alt="">
                        {{passwordErrorInfo}}
                    </div>
                </div>
                <y-button type="primary" class="login-btn" block
                    @click="login" ref="loginBtnRef">登录</y-button>
                <a :href="zhongzhuanhref" id="zhongzhuan" style="display:none;">中转</a>
                <div class="hr"></div>
                <div class="bottom">
                    <a-checkbox @change="onChange" class="auto-login-btn">自动登录</a-checkbox>
                    <div class="register-btn fr">注册账号</div>
                    <div class="btn-split fr"></div>
                    <div class="forget-password-btn fr">忘记密码</div>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="footer-bg"></div>
            <div class="row">
                <div class="help">帮助</div>
                <div class="policy">隐私条款</div>
            </div>
            <div class="row copy-right">
                CopyRight © 2019 易车出品
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
import { login, getUserIdentity } from 'api/login';
import { setToken, getCookie, setCookie } from '@/utils/auth';
import { yc_resetCache } from 'utils/logout';

export default {
    created() {
        //console.log('this.$store.state', this.$store.state);
        // let initVuex = JSON.stringify(this.$store.state);/**用这种方法来实现深度拷贝，避免循环 */
        // console.log('initVuex.length', initVuex.length);
        // setCookie("initVuex",initVuex);
        yc_resetCache();//到登陆页面后,先清空一下之前的状态,因为用户有可能是关掉浏览器后直接找登陆页面的,防止非正常退出时未清空状态
    },
    mounted() {
        window.addEventListener("keyup",this.keyupEnter,false);
    },
    beforeDestroy() {
        window.removeEventListener("keyup",this.keyupEnter,false);
    }, //生命周期 - 销毁之前
    destroyed() {
        window.removeEventListener("keyup",this.keyupEnter,false);
    }, //生命周期 - 销毁完成
    data() {
        return {
            account: '',
            password: '',
            focusIndex: 0,
            accountError: 0,
            accountErrorInfo: '',
            passwordError: 0,
            passwordErrorInfo: '',
            zhongzhuanhref: ''
        }
    },
    methods: {
        ...mapActions(['gotoapp']),
        keyupEnter(){
            if( window.event.keyCode == 13 ){
                //执行登录方法
                //console.log('执行登录方法')
                //this.login();
                this.$refs['loginBtnRef'].click();
            }
        },
        setFocus(index) {
            this.focusIndex = index;
        },
        getAccountClass() {
            let result = [];
            if(this.focusIndex == 1) {
                result.push('active');
            }
            if(this.accountError == 1) {
                result.push('error');
            }
            return result;
        },
        getPasswordClass() {
            let result = [];
            if(this.focusIndex == 2) {
                result.push('active');
            }
            if(this.passwordError == 1) {
                result.push('error');
            }
            return result;
        },
        onAccountBlur() {
            this.setFocus(0);
        },
        onAccountInput() {
            //输入的时候,去掉对应的错误状态
            this.removeAccoutErr();
        },
        onPasswordInput() {
            this.removePasswordErr();
        },
        
        async login() {
            if(this.account.trim() == '') {
                this.setAccoutErr('账号不能为空!');
                return;
            }
            if(this.password.trim() == '') {
                this.setPasswordErr('密码不能为空!');
                return;
            }
            if(this.account.trim().length > 100) {
                this.setAccoutErr('账号最大100个字符!');
                return;
            }
            if(this.password.trim().length > 32) {
                this.setPasswordErr('密码最大32个字符!');
                return;
            }
            let that = this;
            let res = await login({
                query: {
                    username: that.account.trim(),
                    password: that.password
                }
            });
            if(res&&res.description&&res.description.indexOf("对不起") != '-1'){
                 this.setAccoutErr(res.description);
                 return;
            }
            if(res == 'apiTimeout') {
                this.$refs['loginBtnRef'].finish();
                return;
            }
            //console.log('resres',res);
            if(res.description == 10001) {
                this.setAccoutErr('用户不存在');
                this.removePasswordErr();
                return;
            }else {
                this.removeAccoutErr();
            }
            if(res.description == 10002) {
                this.setPasswordErr('密码错误');
                return;
            }else {
                this.removePasswordErr();
            }
            //将token放入cookie
            //console.log(res);
            setToken(res.retValue.token);

            let userIdentity = await getUserIdentity();
            //console.log('userIdentities',userIdentity);
            setCookie('userIdentities', JSON.stringify(userIdentity));
            //debugger;
            if(!userIdentity) {
                //console.log('userIdentity返回值不正常,不能跳转');
                this.$refs['loginBtnRef'].finish();
                return;
            }
            if(userIdentity.length > 1) {
                this.$refs['loginBtnRef'].finish();
                this.$router.push('/user-identity-select');
            }else {
                this.gotoapp({
                    userIdentity: userIdentity[0],
                    sucFn() {
                        that.$refs['loginBtnRef'].finish();
                    }
                });
            }
        },
        setAccoutErr(errInfo) {
            this.accountErrorInfo = errInfo;
            this.accountError = 1;
            this.$refs['loginBtnRef'].finish();
            this.$refs['accountInputRef'].focus();
        },
        setPasswordErr(errInfo) {
            this.passwordErrorInfo = errInfo;
            this.passwordError = 1;
            this.$refs['loginBtnRef'].finish();
            this.$refs['passwordInputRef'].focus();
        },
        removeAccoutErr() {
            this.accountErrorInfo = '';
            this.accountError = 0;
        },
        removePasswordErr() {
            this.passwordErrorInfo = '';
            this.passwordError = 0;
        },
    }
}
</script>

<style lang="less" scoped>
.yc-login{
    background: #000;
    height: 100%;
    .bg{
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 1;
        background: url('img/bg.png') no-repeat center center;
    }
    .content{
        position: absolute;
        left: 50%;
        margin-left: -200px;
        top: 16.7%;
        z-index: 5;
        .logo-cntr{
            margin-bottom: 40px;
            margin-left: 80px;
        }
        .form{
            position: relative;
            width: 400px;
            height: 342px;
            background:rgba(130,155,187,0.2);
            border:1px solid rgba(255,255,255,0.3);
            padding: 0 40px;
            .tabs{
                position: absolute;
                top: 40px;
                left: 120px;
                .tab{
                    color:rgba(200,200,200,1);
                    line-height:18px;
                    letter-spacing:2px;
                    font-size:16px;
                    float: left;
                    &.active{
                        color:rgba(255,255,255,1);
                        font-weight:bold;
                    }
                }
                .split{
                    float: left;
                    width:1px;
                    height:12px;
                    background:rgba(255,255,255,0.2);
                    margin: 7px 8px;
                }
            }
            .input-cntr{
                position: relative;
                .input-prefix{
                    position: absolute;
                    top: 10px;
                    left: 13px;
                    color: #616A7D;
                }
                .input{
                    width: 320px;
                    height: 36px;
                    background:rgba(30,42,58,1);
                    border:1px solid rgba(255,255,255,0.2);
                    padding: 8px 40px;
                    font-size:14px;
                    color:rgba(255,255,255,1);
                }
                .error-info{
                    position: absolute;
                    z-index: 12;
                    left: 334px;
                    bottom: 5px;
                    padding: 5px 8px;
                    color: #ffffff;
                    font-size: 12px;
                    line-height: 16px;
                    background: #D24E47;
                    white-space: nowrap;
                    border-radius: 4px;
                    .left-arrow{
                        position: absolute;
                        width: 6px;
                        height: 12px;
                        top: 7px;
                        left: -6px;
                    }
                }
                &.active {
                    .input{
                        border: 1px solid rgba(255,255,255,1);
                    }
                    .input-prefix{
                        color:rgba(255,255,255,1);
                    }
                }
                &.error{
                    .input-prefix{
                        color: #D24E46;
                    }
                }
            }
            .input-cntr1{
                margin-top: 86px;
            }
            .input-cntr2{
                margin-top: 12px;
            }
            .login-btn{
                margin-top: 24px;
            }
            .hr{
                width:320px;
                height:1px;
                background:rgba(255,255,255,0.2);
                margin: 24px 0;
            }
            .auto-login-btn{
                font-size:14px;
                color:rgba(255,255,255,1);
            }
            .forget-password-btn{
                font-size:14px;
                color:rgba(154,158,164,1);
                line-height:22px;
            }
            .btn-split{
                width:1px;
                height:12px;
                background:rgba(255,255,255,0.2);
                margin: 5px 10px;
            }
            .register-btn{
                font-size:14px;
                color:rgba(154,158,164,1);
                line-height:22px;
            }
        }
    }
    .footer{
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 10;
        width: 100%;
        height: 76px;
        .footer-bg{
            position: absolute;
            z-index: 1;
            width: 100%;
            height: 100%;
            background:linear-gradient(180deg,rgba(77,84,120,0) 0%,rgba(24,30,62,1) 100%);
        }
        .row{
            width: 360px;
            height: 16px;
            font-size:12px;
            color:rgba(255,255,255,1);
            position: absolute;
            left: 50%;
            margin-left: -180px;
        }
        .copy-right{
            text-align: center;
            top: 44px;
        }
        .help{
            position: absolute;
            left: 134px;
            top: 16px;
        }
        .policy{
            position: absolute;
            left: 178px;
            top: 16px;
        }
    }
}
</style>
<style lang="less">
.login-btn{
    .ant-btn{
        border-radius: 0;
    }
}
</style>

