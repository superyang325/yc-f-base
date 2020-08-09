<template>
    <div class="contacts">
        <!-- 弹框区 -->
        <a-popover trigger="hover" placement="right" v-model="visible" >
            <span class="add-more-info">
                <span @click="show()">
                    添加更多联系方式
                </span>
            </span>
            <template slot="content">
                <ul class="y-contacts-ul">
                    <li v-for="item in list"
                        :key="item.className"
                        :class="getClass(item)"
                        @click="itemClick(item)">
                        <div :class="'img '+item.className"></div>
                        <span class="txt">{{item.name}}</span>
                    </li>
                </ul>
            </template>
        </a-popover>
        <span class="switch-span" v-show="toggleShow()">
            <a-button v-show="spreadFlag" @click="switchItems"> 收起 <a-icon type="up" /> </a-button>
            <a-button v-show="!spreadFlag" @click="switchItems"> 展开 <a-icon type="down" /> </a-button>
        </span>
        <!-- 展示区 -->
        <div class="tmp-outer" v-show="spreadFlag">
            <ul>
                <li class="tmp-item tmp-item-width50" v-if="itemsShowOrHide.phone2.showFlag" style="height:32px">
                    <!-- 手机号2 -->
                    <y-form-item-input
                        :fieldOptions="addMoreInfoFieldOptions.customerPhone2FieldOptions"
                        class="query-input input-phone2"
                        @focus="operations.isNull"
                        @blur="operations.contacts($event,1,addMoreInfoFieldOptions.customerPhone2FieldOptions.id,0)"
                        >
                    </y-form-item-input>
                    <a-icon type="delete" @click.stop="itemDelete($event,1,addMoreInfoFieldOptions.customerPhone2FieldOptions.id,0)"/>
                </li>
                <li class="tmp-item tmp-item-width50" v-if="itemsShowOrHide.phone3.showFlag" style="height:32px">
                    <!-- 手机号3 -->
                    <y-form-item-input
                        :fieldOptions="addMoreInfoFieldOptions.customerPhone3FieldOptions"
                        class="query-input input-phone3"
                        @focus="operations.isNull"
                        @blur="operations.contacts($event,1,addMoreInfoFieldOptions.customerPhone3FieldOptions.id,1)"
                        >
                    </y-form-item-input>
                    <a-icon type="delete" @click.stop="itemDelete($event,1,addMoreInfoFieldOptions.customerPhone3FieldOptions.id,1)"/>
                </li>
                <li class="tmp-item tmp-item-width50" v-if="itemsShowOrHide.wechat2.showFlag">
                    <!-- wx2 -->
                    <y-form-item-input
                        :fieldOptions="addMoreInfoFieldOptions.customerWechat2FieldOptions"
                        class="query-input input-wechat2"
                        @focus="operations.isNull"
                        :isError="operations.isError_wx2"
                        @blur="operations.contacts($event,2,addMoreInfoFieldOptions.customerWechat2FieldOptions.id,0)"
                        >
                    </y-form-item-input>
                    <a-icon type="delete" @click.stop="itemDelete($event,2,addMoreInfoFieldOptions.customerWechat2FieldOptions.id,0)"/>
                </li>
                <li class="tmp-item tmp-item-width50" v-if="itemsShowOrHide.wechat3.showFlag">
                    <!-- wx3 -->
                    <y-form-item-input
                        :fieldOptions="addMoreInfoFieldOptions.customerWechat3FieldOptions"
                        class="query-input input-wechat3"
                        @focus="operations.isNull"
                        :isError="operations.isError_wx3"
                        @blur="operations.contacts($event,2,addMoreInfoFieldOptions.customerWechat3FieldOptions.id,1)"
                        >
                    </y-form-item-input>
                    <a-icon type="delete" @click.stop="itemDelete($event,2,addMoreInfoFieldOptions.customerWechat3FieldOptions.id,1)"/>
                </li>
                <li class="tmp-item tmp-item-width100" v-if="itemsShowOrHide.email1.showFlag">
                    <!-- 邮箱1 -->
                    <y-form-item-input
                        :fieldOptions="addMoreInfoFieldOptions.customEmailFieldOptions"
                        class="query-input input-email"
                        @focus="operations.isNull"
                        @checkLen="operations.err_len('email',1)"
                        :isError="operations.isError_email"
                        @blur="operations.contacts($event,3,addMoreInfoFieldOptions.customEmailFieldOptions.id,0)"
                        @scoped="operations.fieldScoped"
                        >
                    </y-form-item-input>
                    <a-icon type="delete" @click.stop="itemDelete($event,3,addMoreInfoFieldOptions.customEmailFieldOptions.id,0)"/>
                </li>
                <li class="tmp-item tmp-item-width100" v-if="itemsShowOrHide.email2.showFlag">
                    <!-- 邮箱2 -->
                    <y-form-item-input
                        :fieldOptions="addMoreInfoFieldOptions.customEmailFieldOptions2"
                        class="query-input input-email"
                        @focus="operations.isNull"
                        @checkLen="operations.err_len('email',2)"
                        :isError="operations.isError_email2"
                        @blur="operations.contacts($event,3,addMoreInfoFieldOptions.customEmailFieldOptions2.id,1)"
                        @scoped="operations.fieldScoped"
                        >
                    </y-form-item-input>
                    <a-icon type="delete" @click.stop="itemDelete($event,3,addMoreInfoFieldOptions.customEmailFieldOptions2.id,1)"/>
                </li>
                <li class="tmp-item tmp-item-width100" v-if="itemsShowOrHide.email3.showFlag">
                    <!-- 邮箱3 -->
                    <y-form-item-input
                        :fieldOptions="addMoreInfoFieldOptions.customEmailFieldOptions3"
                        class="query-input input-email"
                        @focus="operations.isNull"
                        @checkLen="operations.err_len('email',3)"
                        :isError="operations.isError_email3"
                        @blur="operations.contacts($event,3,addMoreInfoFieldOptions.customEmailFieldOptions3.id,2)"
                        @scoped="operations.fieldScoped"
                        >
                    </y-form-item-input>
                    <a-icon type="delete" @click.stop="itemDelete($event,3,addMoreInfoFieldOptions.customEmailFieldOptions3.id,2)"/>
                </li>
                <li class="tmp-item tmp-item-width100" v-if="itemsShowOrHide.address1.showFlag">
                    <!-- 地址1 -->
                    <y-form-item-input
                        :fieldOptions="addMoreInfoFieldOptions.customAreaFieldOptions"
                        class="query-input input-address"
                        @focus="operations.isNull"
                        @checkLen="operations.err_len('area',1)"
                        :isError="operations.isError_area"
                        @blur="operations.contacts($event,4,addMoreInfoFieldOptions.customAreaFieldOptions.id,0)"
                        @scoped="operations.fieldScoped"
                        >
                    </y-form-item-input>
                    <a-icon type="delete" @click.stop="itemDelete($event,4,addMoreInfoFieldOptions.customAreaFieldOptions.id,0)"/>
                </li>
                <li class="tmp-item tmp-item-width100" v-if="itemsShowOrHide.address2.showFlag">
                    <!-- 地址2 -->
                    <y-form-item-input
                        :fieldOptions="addMoreInfoFieldOptions.customAreaFieldOptions2"
                        class="query-input input-address"
                        @focus="operations.isNull"
                        @checkLen="operations.err_len('area',2)"
                        :isError="operations.isError_area2"
                        @blur="operations.contacts($event,4,addMoreInfoFieldOptions.customAreaFieldOptions2.id,1)"
                        @scoped="operations.fieldScoped"
                        >
                    </y-form-item-input>
                    <a-icon type="delete" @click.stop="itemDelete($event,4,addMoreInfoFieldOptions.customAreaFieldOptions2.id,1)"/>
                </li>
                <li class="tmp-item tmp-item-width100" v-if="itemsShowOrHide.address3.showFlag">
                    <!-- 地址3 -->
                    <y-form-item-input
                        :fieldOptions="addMoreInfoFieldOptions.customAreaFieldOptions3"
                        class="query-input input-address"
                        @focus="operations.isNull"
                        @checkLen="operations.err_len('area',3)"
                        :isError="operations.isError_area3"
                        @blur="operations.contacts($event,4,addMoreInfoFieldOptions.customAreaFieldOptions3.id,2)"
                        @scoped="operations.fieldScoped"
                        >
                    </y-form-item-input>
                    <a-icon type="delete" @click.stop="itemDelete($event,4,addMoreInfoFieldOptions.customAreaFieldOptions3.id,2)"/>
                    
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name:'add-more-info',
    data() {
        return {
            visible: false,
            spreadFlag:false,
            list: [
                {
                    name: '手机',
                    className: 'img-phone',
                    disabled: false,
                    type: 'phone'
                },
                {
                    name: '微信',
                    className: 'img-wechat',
                    disabled: false,
                    type: 'wechat'
                },
                {
                    name: '邮箱',
                    className: 'img-email',
                    disabled: false,
                    type: 'email'
                },
                {
                    name: '地址',
                    className: 'img-address',
                    disabled: false,
                    type: 'address'
                },
            ],
        }
    },
    computed:{
        operations(){
            return this.addMoreInfoFieldOptions.operations
        },
        itemsShowOrHide(){
            return this.addMoreInfoFieldOptions.itemsShowOrHide
        },
    },
    mounted(){
        // 项目显示或隐藏判断
        // this.addMoreInfoFieldOptions.itemsShowOrHide
        // console.log("this.addMoreInfoFieldOptions.itemsShowOrHide:::"+JSON.stringify(this.addMoreInfoFieldOptions))
        this.popDisabeldShow(this.itemsShowOrHide)
    },
    props:{
        addMoreInfoFieldOptions:{
            type:Object,
        },
        operations:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    watch:{
        addMoreInfoFieldOptions:{
            handler:function(newVal){
                // console.log('www',JSON.stringify(newVal));
                this.popDisabeldShow(newVal.itemsShowOrHide)
            },
            deep:true
        },
    },
    methods: {
        toggleShow(){
            
            let ref = this.itemsShowOrHide
            if(!ref.phone2.showFlag && !ref.phone3.showFlag && !ref.wechat2.showFlag && !ref.wechat3.showFlag && 
            !ref.email1.showFlag && !ref.email2.showFlag && !ref.email3.showFlag && !ref.address1.showFlag && !ref.address2.showFlag && !ref.address3.showFlag){
                return false
            }else{
                return true
            }
        },
        itemDelete($event,type,id,index){
            if(id){
                // 原来有数据(编辑页)
                let removeFun = this.addMoreInfoFieldOptions.operations.multiRemove
                removeFun(id,type,index)
            }else{
                // 原来没数据(添加页或编辑页新添加的联系方式)
                let moreInfoStateChange = this.addMoreInfoFieldOptions.operations.moreInfoStateChange
                moreInfoStateChange(type,index)

            }
        },
        popDisabeldShow(val){

                if(val.phone2.showFlag && val.phone3.showFlag){
                    
                    this.list[0].disabled = true
                    
                }else{
                    this.list[0].disabled = false
                }
                if(val.wechat2.showFlag && val.wechat3.showFlag){
                    this.list[1].disabled = true
                }else{
                    this.list[1].disabled = false 
                }
                if(val.email1.showFlag && val.email2.showFlag && val.email3.showFlag){
                    this.list[2].disabled = true
                }else{
                    this.list[2].disabled = false
                }
                if(val.address1.showFlag && val.address2.showFlag && val.address3.showFlag){
                    this.list[3].disabled = true
                }else{
                    this.list[3].disabled = false
                }
                // console.log("this.list::"+JSON.stringify(this.list))
            this.$forceUpdate();
        },
        show() {
            this.visible = true;
        },
        switchItems(){
            this.spreadFlag = !this.spreadFlag
        },
        itemClick(item) {
            // console.log('itemClick::'+JSON.stringify(item))
            this.spreadFlag = true
            // this.$emit('phone-click', item);
            // this.$emit('email-click', item);
            this.$emit(item.type+'-click', item);
            this.hide();
            this.itemShow(item)
        },
        hide() {
            this.visible = false;
        },
        disabled(type) {
            let obj = this.list.find(item => {
                item.type == type;
            })
            obj.disabled = true;
        },
        enabled(type) {
            let obj = this.list.find(item => {
                item.type == type;
            })
            obj.disabled = false;
        },
        getClass(item) {
            // debugger
            let result = [];
            if(item.disabled) {
                result.push('item-disabled')
            }else {
                result.push('item-enabled');
            }
            return result;
        },
        itemShow(item){
            let type = item.type
            let opRef = this.addMoreInfoFieldOptions.itemsShowOrHide
            if(type == 'phone'){
                // 显2
                // 显3
                if(!opRef['phone2'].showFlag && !opRef['phone3'].showFlag){
                    opRef['phone2'].showFlag = true
                }else if(opRef['phone2'].showFlag && !opRef['phone3'].showFlag){
                    opRef['phone3'].showFlag = true
                }else if(!opRef['phone2'].showFlag && opRef['phone3'].showFlag){
                    opRef['phone2'].showFlag = true
                }
                
            }else if(type == 'wechat'){
                // 显2
                // 显3
                if(!opRef['wechat2'].showFlag && !opRef['wechat3'].showFlag){
                    opRef['wechat2'].showFlag = true
                }else if(opRef['wechat2'].showFlag && !opRef['wechat3'].showFlag){
                    opRef['wechat3'].showFlag = true
                }else if(!opRef['wechat2'].showFlag && opRef['wechat3'].showFlag){
                    opRef['wechat2'].showFlag = true
                }
            }else if(type == 'email'){
                // 显1
                // 显2
                // 显3
                if(!opRef['email1'].showFlag && !opRef['email2'].showFlag && !opRef['email3'].showFlag){
                    opRef['email1'].showFlag = true
                }else if(!opRef['email1'].showFlag && !opRef['email2'].showFlag && opRef['email3'].showFlag){
                    opRef['email1'].showFlag = true
                }else if(!opRef['email1'].showFlag && opRef['email2'].showFlag && !opRef['email3'].showFlag){
                    opRef['email1'].showFlag = true
                }else if(!opRef['email1'].showFlag && opRef['email2'].showFlag && opRef['email3'].showFlag){
                    opRef['email1'].showFlag = true
                }else if(opRef['email1'].showFlag && !opRef['email2'].showFlag && !opRef['email3'].showFlag){
                    opRef['email2'].showFlag = true
                    this.$emit("itemShow",'email');
                }else if(opRef['email1'].showFlag && !opRef['email2'].showFlag && opRef['email3'].showFlag){
                    opRef['email2'].showFlag = true
                }else if(opRef['email1'].showFlag && opRef['email2'].showFlag && !opRef['email3'].showFlag){
                    opRef['email3'].showFlag = true
                }
                
                


                // if(!opRef['email1'].showFlag && !opRef['email2'].showFlag && !opRef['email3'].showFlag){
                //     opRef['email1'].showFlag = true
                // }
                // else if(opRef['email1'].showFlag && !opRef['email2'].showFlag && !opRef['email3'].showFlag){
                //     opRef['email2'].showFlag = true
                // }else if(opRef['email1'].showFlag && opRef['email2'].showFlag && !opRef['email3'].showFlag){
                //     opRef['email3'].showFlag = true
                // }
            }else if(type == 'address'){
                // 显1
                // 显2
                // 显3



                if(!opRef['address1'].showFlag && !opRef['address2'].showFlag && !opRef['address3'].showFlag){
                    opRef['address1'].showFlag = true
                }else if(!opRef['address1'].showFlag && !opRef['address2'].showFlag && opRef['address3'].showFlag){
                    opRef['address1'].showFlag = true
                }else if(!opRef['address1'].showFlag && opRef['address2'].showFlag && !opRef['address3'].showFlag){
                    opRef['address1'].showFlag = true
                }else if(!opRef['address1'].showFlag && opRef['address2'].showFlag && opRef['address3'].showFlag){
                    opRef['address1'].showFlag = true
                }else if(opRef['address1'].showFlag && !opRef['address2'].showFlag && !opRef['address3'].showFlag){
                    opRef['address2'].showFlag = true
                    this.$emit("itemShow",'address');
                }else if(opRef['address1'].showFlag && !opRef['address2'].showFlag && opRef['address3'].showFlag){
                    opRef['address2'].showFlag = true
                }else if(opRef['address1'].showFlag && opRef['address2'].showFlag && !opRef['address3'].showFlag){
                    opRef['address3'].showFlag = true
                }
                // if(!opRef['address1'].showFlag && !opRef['address2'].showFlag && !opRef['address3'].showFlag){
                //     opRef['address1'].showFlag = true
                // }else if(opRef['address1'].showFlag && !opRef['address2'].showFlag && !opRef['address3'].showFlag){
                //     opRef['address2'].showFlag = true
                // }else if(opRef['address1'].showFlag && opRef['address2'].showFlag && !opRef['address3'].showFlag){
                //     opRef['address3'].showFlag = true
                // }
            }
            this.$forceUpdate()
        },
    }
}
</script>
<style lang="less">

.switch-span{
    margin-left:24px;
    .ant-btn{
        color:#3c5484;
        width: 66px;
        height: 24px;
        border-radius: 2px;
        font-size: 12px;
    }
}    
/* 弹框区     */
.add-more-info{
    /* width: 100%; */
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: #3366ff;
    padding-left: 28px;
    background:url(./img/icon-busitabel.png) no-repeat 0 center;
}

/*字数统计位置*/
.contacts{
    .ant-input-suffix{
        right: 5px !important;
    }

    .form-item-wrap .ant-input-affix-wrapper input{
        padding-right:24px;

    }

}

.y-contacts-ul{
    overflow: hidden;
    li{
        float: left;
        width: 60px;
        height: 60px;
        margin-right: 4px;
        background: #FFFFFF;
        display: flex;
        flex-direction: column;
        justify-content: center;
        cursor: pointer;
        align-items: center;
        .txt{
            margin-top: 8px;
            font-size: 12px;
            color: #3C5484;
            margin-right:0;
            /* &.txt-disabeld{
                color: #DBE0E7;
            } */
        }
        .img-phone,.img-wechat,.img-address,.img-email{
            width: 20px;
            height: 20px;
            background-repeat: no-repeat;
            background-position: 0 0;
            background-size: 20px auto;
        }
        .img-phone{
            background-image: url('./img/phone.png');
        }
        .img-wechat{
            background-image: url('./img/wechat.png');
        }
        .img-address{
            background-image: url('./img/adress.png');
        }
        .img-email{
            background-image: url('./img/email.png');
        }
        &.item-disabled{
            .img-phone,.img-wechat,.img-address,.img-email{
                background-position: 0 -40px;
            }
            .txt{
                color:#DBE0E7;
            }
            &:hover{
                background-color: #FFF;
                cursor: no-drop;
                .img-phone,.img-wechat,.img-address,.img-email{
                    background-position: 0 -40px;
                }
                .txt{
                    color: #DBE0E7;
                }
            }
        }
        &:hover {
            background: #E6ECFF;
            .txt{
                color: #3366FF;
            }
            .img-phone,.img-wechat,.img-address,.img-email{
                background-position: 0 -20px;
            }

        }
    }
} 

/*展示区*/
.tmp-item{
    float: left;
    position: relative;
    .anticon{
        width: 15px;
        height: 15px;
        display: inline-block;
        position: absolute;
        right: 20px;
        top: 9px;
        font-size:12px;
        svg{
            color: #3366FF;
            font-family: "Microsoft YaHei","Microsoft YaHei";
            width: 15px;
            height: 15px;
        }
    }
}
.tmp-item-width50{
    width:50%;
}
.tmp-item-width100{
    width:100%;
}
</style>


