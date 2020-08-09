<template>
    <div >
    <span v-if="fieldOptions.preIcon" style="float: left;width: 20px;height: 32px;text-align: center;">
        <span class="file-icon" :class="getIconClass()"></span>
    </span>
    <span v-if="fieldOptions.inputRequired" class="red-dot">*</span>
    
    <a-form-item 
        :label="getLabel()" 
        :label-col="fieldOptions.labelCol" 
        :wrapper-col="fieldOptions.wrapperCol"
        :class="getClass()"
        v-show="isFormItemShow()"
    >
    
        <!-- div @dblclick="toEdit" @contextmenu.prevent="toEdit" class="form-item-wrap" -->
        <div @dblclick="toEdit" class="form-item-wrap">
            
            <a-tooltip
                v-if="fieldOptions.showTooltip"
                placement="bottomLeft" 
                :title="getTitleValue" 
                trigger="hover"
                v-model="visible"
                >
                <div v-show="!isShowEditMode" @dblclick.stop.prevent="toEdit" @contextmenu.prevent="toEdit"
                 style="padding-left: 11px;"
                 :style="{cursor : (fieldOptions.allowEdit !== undefined && fieldOptions.allowEdit !== fieldOptions.index ? 'not-allowed' : 'default')}"
                 :class="getViewDivClassName()">
                    {{getTitleValue}}
                </div>
            </a-tooltip>
            <div v-else v-show="!isShowEditMode" @dblclick.stop.prevent="toEdit" @contextmenu.prevent="toEdit"
                style="padding-left: 11px;"
                :style="{cursor : (fieldOptions.allowEdit !== undefined && fieldOptions.allowEdit !== fieldOptions.index ? 'not-allowed' : 'default')}"
                :class="getViewDivClassName()">
                {{getTitleValue}}
            </div>

            <!-- autoFocus = true -->
            <a-input
                    :ref = "fieldOptions.fieldName + '_edit_obj'"
                    v-show="isShowEditMode"
                    :size="fieldOptions.size ? fieldOptions.size : 'default'"
                    v-decorator="[
                        fieldOptions.fieldName,
                        { 
                            initialValue: fieldOptions.defaultValue ? fieldOptions.defaultValue : '',
                            validateTrigger: [ fieldOptions.validateTrigger || 'change'],
                            rules: rules
                        }
                    ]"
                    @blur="toView1"
                    :placeholder="fieldOptions.placeholder"
                    :readonly="getDisable()"
                    :maxlength="fieldOptions.maxlength"
                    @change="onChange"
                    @focus="onFocus"
                    @load="onLoad"
                >
                    <a-icon slot="prefix" :component="fieldOptions.prefixIcon" v-if="fieldOptions.prefixIcon"/>
                    <a-tooltip slot="suffix" title=""
                        v-if="isShow()">
                        <span :style="{color: currentLength > total ? 'red': '#3366FF'}">{{currentLength}}</span>/{{total}}
                    </a-tooltip>
                </a-input>
                
                <a-tooltip :placement="getPlacement()" 
                        :title="getTooltipTitle()"
                        trigger="hover"
                        v-show="isTooltipShow()"
                        class="component-in-help">
                    <a-icon type="question-circle" />
                </a-tooltip>
        </div>
    </a-form-item>
</div>
</template>
<script>
import {fileTypes} from 'consts/file-types.js'
import { yc_isNumber,yc_isPhoneNo,yc_isEmail,yc_isName,yc_isIdentityCard } from 'utils';
import {switchEdit} from 'components/switchEditJs/swithEdit'

export default {
    mixins: [switchEdit] ,
    name: 'y-form-item-input',
    created() {
        this.getRules();
        //console.log('this.fieldOptions.fieldName', this.fieldOptions.fieldName)
        if(this.fieldOptions.defaultValue) {
            this.currentLength = this.fieldOptions.defaultValue.length;
        }
        if(this.fieldOptions.mode == 'view'){
            this.mode = 'view'
        }
    },
    data() {
        return {
            //status: 'success', //默认是正常的
            //help: '',
            visible:false,
            currentLength: 0,
            rules: [],
            mode: false,
            canSwitchToView: this.fieldOptions.canSwitchToView || false,
            currentValue:'',
            time:0
        }
    },
    computed: {
        total() {
            return this.fieldOptions.total || 1000;
        },
        isShowEditMode() {
           if(this.fieldOptions.useDivMode && this.fieldOptions.canSwitchToView && this.mode == 'view' ) {
                return false;
            }
            return true;
        }
    },
    watch:{
        "fieldOptions.defaultValue"(newVal){
            this.titleValue = this.fieldOptions.defaultValue;
            if(typeof newVal !== 'undefined' && newVal !==null){
                this.currentLength = newVal.length;
            }
        },
        fieldOptions:{
            handler(newVal){
                this.time++;
                if( this.time==1 && newVal.addStatus == true && this.fieldOptions.allowEdit == this.fieldOptions.index){
                    this.mode = 'edit' 
                }
            },
            deep:true
        },
        isError(newVal){
            if(newVal == false){
                this.mode = "view";
            }else{
                this.mode = "edit";
            }
        }
    },
    props: {
        fieldOptions: Object,
        isError:{
            type:Boolean,
            default(){
                return false
            }
        }
    },
    methods: {
        getViewDivClassName(){
            return "customer_header_viewmode_" + this.fieldOptions.fieldName + "_input customer_header_viewmode_input"
            //return "form-input-" + this.fieldOptions.fieldName + "-view"
        },
        UpdateTitleValue(){
            this.D(" UpdateTitleValue defaultValue = " + this.fieldOptions.defaultValue,this.fieldOptions);
            this.titleValue = this.fieldOptions.defaultValue;
            this.D(" UpdateTitleValue titleValue = " + this.titleValue);
        },
        getContainer(e) {
            console.log("tooltipe::"+e)
            return e.parentNode;
            // return $('.customer_header_editmode_linkmanname_input')[0];
        },
        toEdit(e) {
            this.visible = false
            if(!this.canSwitchToView) {
                return;
            }
            this.mode = 'edit';
            if(this.fieldOptions.allowEdit !== undefined && this.fieldOptions.allowEdit == this.fieldOptions.index){
                this.mode = 'edit';
            }else if(this.fieldOptions.allowEdit !== undefined && this.fieldOptions.canSwitchToView){
                this.mode = 'view';
            }
        },
        toView1(e) {
            //var needSwitchToView = true;

            if(this.fieldOptions.checkNull && !e.target.value){
                // needSwitchToView = false;
                this.$emit("checkNull")
                return ;
            }
            if(this.fieldOptions.checkLen && yc_isNumber(this.fieldOptions.checkLen) && e.target.value.trim().length>this.fieldOptions.checkLen){
                this.$emit("checkLen");
                // needSwitchToView = false;
                return;
            }
            if(this.fieldOptions.restore && !e.target.value){
                this.$emit("restore",this.currentValue);
                // needSwitchToView = false;
                return;
            }


            if(this.fieldOptions.checkReg && e.target.value){
                let value = e.target.value;
                switch(this.fieldOptions.checkReg){
                    case 'yc_isPhoneNo':
                        if(!yc_isPhoneNo(value)){
                            this.$emit("checkReg",'手机号格式错误');
                            // needSwitchToView = false;
                            return;
                        }
                    break;
                    case 'yc_isEmail':
                        if(!yc_isEmail(value)){
                            // needSwitchToView = false;
                            this.$emit("checkReg",'邮箱格式错误');
                            return;
                        }
                    break;
                    case 'yc_isName':
                        if(!yc_isName(value)){
                            // needSwitchToView = false;
                            console.log("toView1 yc_isName -------------" + needSwitchToView + " "+ this.mode);
                            this.$emit("checkReg",'姓名格式错误');
                            return;
                        }
                    case 'yc_isIdentityCard':
                        if(!yc_isIdentityCard(value)){
                            // needSwitchToView = false;
                            this.$emit("checkReg",'身份证格式错误');
                            return;
                        }
                    break;
                }
            }
            this.$emit('blur',e);
                
            this.$emit("blur2",e.target.value.trim(),this.fieldOptions.fieldName,function callback(isSuccess){ needSwitchToView = isSuccess;});

            this.titleValue = e.target.value.trim() || '-';


            if(!this.canSwitchToView) {
                return;
            }
            if(this.isError){
                this.switchToEdit();
                return
            }
            this.switchToView();
            //this.mode = 'view';
            
        },
        onChange(e) {
            //console.log(e)
            let fieldName = this.fieldOptions.fieldName;
            if(this.fieldOptions.total){
                let total = this.fieldOptions.total;
                this.currentLength = e.target.value.trim().length;
                //console.log(this.currentLength, this.total)
                if(this.currentLength > this.total) {
                    if(this.currentLength != this.total+1) {
                        //超过一个字符以上
                        let val = e.target.value.trim();
                        let val1 = val.substring(0, total + 1);
                        this.$emit('scoped', {
                            val: val1,
                            fieldName: fieldName
                        });
                        this.currentLength = this.total+1;
                    }
                    
                }
            }
            this.titleValue = e.target.value.trim() || '-';

            this.$emit('change', e.target.value.trim());
        },
        onFocus(e){
            console.log(e.target.value.trim());
            this.currentValue = e.target.value.trim();
            this.$emit("focus", e.target.value.trim());
        },
        getLabel(){
            let label;
            if(this.fieldOptions.label){
                label = this.fieldOptions.label
            }else if(this.fieldOptions.preIcon && this.fieldOptions.fileType){
                label = fileTypes[this.fieldOptions.fileType].label
            }
            return label
        },
        getIconClass(){
            let iconClass; 
            iconClass = fileTypes[this.fieldOptions.fileType].iconClass
            return iconClass
        },
        getRules() {
            let result = [];
            if(Array.isArray(this.fieldOptions.rules) && this.fieldOptions.rules.length > 0) {
                result = this.fieldOptions.rules;
            }
            result.push({
                validator: this.maxLengthValidate,
            });
            result.push({
                validator: this.trimValidate,
            });
            this.rules = result;
            //console.log('this.rules',this.rules);
        },
        maxLengthValidate(rule,value, callback) {
            //console.log(value, this.total)
            if(value.length > this.total && this.fieldOptions.useTotal){
                callback();
            }else if(value.length > this.total) {
                callback(`字数超过限制`);
            }else {
                callback();
            }
        },
        trimValidate(rule,value, callback) {
            let rules = this.fieldOptions.rules || [];
            let requiredRule = null, requiredStr = '';
            if(rules.length) {
                requiredRule = rules.find(item => {
                    return item.required == true;
                });
                requiredStr = requiredRule && requiredRule.message;
                if(value == '') {
                    callback();
                }else if(value.trim() == '' && requiredStr) {
                    callback(`${requiredStr}`);
                }else {
                    callback();
                }
            }else {
                callback();
            }
            
        },
        isShow() {
            // if(this.fieldOptions.fieldName == 'linkmanWechat') {
            //     console.log('jjjaher..')

            // }
            if(this.fieldOptions.input_total == false){
                return true
            }
            if(this.fieldOptions.hideTotal) {
                return false;
            }
            if(this.fieldOptions.type == 'label'
                || this.mode == 'view') {
                return false;
            }
            // if(this.fieldOptions.showSuffix !== undefined) {
            //     return this.fieldOptions.showSuffix;
            // }
            if(this.fieldOptions.total) {
                return true;
            }else {
                return false;
            }
            //return true;
        },
        isFormItemShow() {
            if(this.fieldOptions.isShow !== undefined) {
                return this.fieldOptions.isShow;
            }
            return true;
        },
        getClass() {
            //component-input
            let result = ['component-input']
            if(this.fieldOptions.type == 'label') {
                result.push('component-label-input')
            }
            if(this.fieldOptions.tooltip) {
                result.push('component-input-with-help');
            }
            if(this.canSwitchToView) {
                if(this.mode == 'view') {
                    result.push('component-view')
                }else {
                    result.push('component-edit')
                }
            }
            
            return result;
        },
        getDisable() {
            //fieldOptions.disabled
            if(this.fieldOptions.type == 'label' ||
                this.mode == 'view') {
                return true;
            }
            return this.fieldOptions.disabled;
        },
        isTooltipShow() {
            if(this.fieldOptions.tooltip) {
                return true;
            }
            return false;
        },
        getTooltipTitle() {
            if(this.fieldOptions.tooltip) {
                return this.fieldOptions.tooltip.text;
            }
            return '';
        },
        getPlacement() {
            if(this.fieldOptions.tooltip) {
                return this.fieldOptions.tooltip.placement;
            }
            return 'right';
        },
    }
}
</script>
<style lang="less">
.component-input{
    /* .ant-input-affix-wrapper .ant-input:not(:last-child){
        padding-right: 55px;
    } */
    svg{
        color:#1890ff;
    }
}
.component-view{
    .ant-input{
        padding-left:8px !important;
        border: none;
        background: none;
        padding-left: 0;
        cursor: initial;
        color: rgba(0, 0, 0, 0.65);
    }
}
.component-label-input{
    input{
        border: none;
        background: none;
        padding-left: 0;
        cursor: initial;
    }
}

.red-dot{
    font-size: 13px;
    margin-right: 1px;
    color: #f5222d;
    font-size: 14px;
    font-family: SimSun, sans-serif;
    line-height: 1;
    box-sizing: border-box;
    position: absolute;
    top: 12px;
}

/* .blue{
    
    font-family:MicrosoftYaHei;
    font-size: 12px;
} */
</style>


