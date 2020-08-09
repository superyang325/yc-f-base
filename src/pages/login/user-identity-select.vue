<template>
    <div class="user-identity-select">
        <div class="long-gu">
            <div class="top">
                <img :src="logo" class="logo" alt="">
                <div class="split"></div>
                <div class="title">智能车商平台</div>
                <div class="item item1"></div>
                <div class="item item2" style="margin-left: 12px;"></div>
                <div class="item item1" style="margin-left: 28px;"></div>
                <div class="item item3" style="margin-left: 12px;"></div>
                <div class="item item1" style="margin-left: 28px;"></div>
                <div class="item item3" style="margin-left: 12px;"></div>
                <div class="item item1" style="margin-left: 28px;"></div>
                <div class="item item3" style="margin-left: 12px;"></div>
                <div class="item item1" style="margin-left: 28px;"></div>
                <div class="item item3" style="margin-left: 12px;"></div>

                <div class="itema itema3"></div>
                <div class="itema itema2" style="margin-right: 8px;"></div>
                <div class="itema itema1" style="margin-right: 16px;"></div>
                <div class="itema itema1" style="margin-right: 16px;"></div>
                <div class="itema itema1" style="margin-right: 16px;"></div>
            </div>
            <div class="content">
                <div class="left">
                    <div class="item item1" style="margin-top:0;"></div>
                    <div class="item item2"></div>
                    <div class="item item1"></div>
                    <div class="item item2"></div>
                    <div class="item item1"></div>
                    <div class="item item2"></div>
                    <div class="item item3"></div>
                    <div class="item item3 item4"></div>
                </div>
                <div class="center">
                    <div class="tabs">
                        <div class="item item1"></div>
                        <div class="item item2">
                            <div class="item4"></div>
                        </div>
                        <div class="item item3"></div>
                        <div class="item"></div>
                        <div class="item"></div>
                    </div>
                    <div class="txt-zone">
                        <div class="cntr">
                            <div class="txt-zone-left">

                            </div>
                            <div class="txt-zone-right">
                                <div class="txt-zone-right-item"></div>
                                <div class="txt-zone-right-item"></div>
                                <div class="txt-zone-right-item item1"></div>
                                <div class="txt-zone-right-item item1"></div>
                                <div class="txt-zone-right-item item2"></div>
                                <div class="txt-zone-right-item item2"></div>
                            </div>
                        </div>
                        
                    </div>
                    <div class="copy-right">CopyRight © 2019 易车出品</div>
                </div>
            </div>
        </div>
        <user-identity-select-dialog></user-identity-select-dialog>
    </div>
</template>
<script>
import userIdentitySelectDialog from 'pages/login/user-identity-select-dialog';
import logo from 'static/logo.svg';
export default {
    data() {
        return {
            logo
        }
    },
    components: {
        userIdentitySelectDialog
    }
}
</script>

<style lang="less" scoped>
.user-identity-select{
    height: 100%;
    width: 100%;
    position: relative;
    .long-gu{
        height: 100%;
        width: 100%;
        position: relative;
        background: #EAEEF4;
        .top{
            height: 36px;
            width: 100%;
            background: #283B62;
            padding-left: 274px;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 10;
            .logo{
                width: 90px;
                height: 18px;
                position: absolute;
                top: 9px;
                left: 20px;
            }
            .split{
                position: absolute;
                top: 10px;
                left: 117px;
                width:1px;
                height:16px;
                background:rgba(255,255,255,1);
            }
            .title{
                position: absolute;
                top: 8px;
                left: 126px;
                font-size:14px;
                color:rgba(255,255,255,1);
                line-height:19px;
                letter-spacing:2px;
            }
            .item{
                float: left;
                height: 18px;
                margin-top: 9px;
                background: #C5CAD9;
                opacity: .2;
            }
            .item1{
                width: 18px;
            }
            .item2{
                width: 28px;
            }
            .item3{
                width: 42px;
            }
            .item4{
                width: 70px;
            }

            .itema{
                float: right;
                height: 20px;
                margin-top: 8px;
                background: #C5CAD9;
                opacity: .2;
            }
            .itema1{
                width: 20px;
            }
            .itema2{
                width: 106px;
            }
            .itema3{
                width: 10px;
                height: 10px;
                margin-top: 13px;
                margin-right: 20px;
            }
        }
        .content{
            padding-top: 36px;
            height: 100%;
            position: relative;
            padding-left: 48px;
            .left{
                position: absolute;
                height: 100%;
                width: 48px;
                left: 0;
                top: 0;
                padding-top: 72px;
                .item{
                    height: 24px;
                    width: 24px;
                    background: #C5CAD9;
                    opacity: .2;
                    margin-left: 10px;
                    margin-top: 40px;
                }
                .item2{
                    width: 44px;
                    height: 16px;
                    margin-left: 2px;
                    margin-top: 8px;
                }
                .item3{
                    position: absolute;
                    left: 12px;
                    bottom: 108px;
                    margin: 0;
                }
                .item4{
                    bottom: 60px;
                }
            }
            .center{
                height: 100%;
                padding-top: 72px;
                margin-right: 32px;
                padding-bottom: 48px;
                background: #FFFFFF;
                position: relative;
                .tabs{
                    height: 36px;
                    background: #EAEEF4;
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: 10;
                    width: 100%;
                    .item{
                        height: 16px;
                        width: 76px;
                        background: #C5CAD9;
                        opacity: .2;
                        margin-left: 16px;
                        margin-top: 12px;
                        float: left;
                    }
                    .item1{
                        width: 36px;
                    }
                    .item2{
                       margin-left: 8px;
                       margin-top: 4px;
                       width: 80px;
                       height: 32px;
                       background: #ffffff; 
                       border:1px solid rgba(219,224,231,1);
                       opacity: 1;
                       border-bottom: none;
                    }
                    .item3{
                        margin-left: 8px;
                    }
                    .item4{
                        height: 16px;
                        width: 64px;
                        background: #C5CAD9;
                        margin: 8px;
                    }
                }
                .copy-right{
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    left: 0;
                    height: 48px;
                    text-align: center;
                    line-height: 48px;
                    color: #818CA7;
                    font-size: 12px;
                    background: #EAEEF4;
                }
                .txt-zone{
                    padding: 40px;
                    height: 100%;
                    .cntr{
                         position: relative;
                         height: 100%;
                    }
                    .txt-zone-right{
                        padding-left: 200px;
                        height: 100%;
                        .txt-zone-right-item{
                            background: #F8F9FB;
                            height: 40px;
                            margin-bottom: 40px;
                            width: 100%;
                        }
                        .item1{
                            width: 66%;
                        }
                        .item2{
                            width: 33%;
                        }
                    }
                    .txt-zone-left{
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 160px;
                        height: 100%;
                        background: rgba(248,249,251,1);
                    }
                }
            }
        }
    }
}
</style>


