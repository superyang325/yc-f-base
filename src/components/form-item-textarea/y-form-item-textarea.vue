<template>
    <div class="y-form-item-textarea">
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
                placement="bottomLeft" 
                :title="getTitleValue" 
                v-model="visible"
                trigger="hover">
                <div v-show="!isShowEditMode" @dblclick="toEdit" @contextmenu.prevent="toEdit" style="display:inline-block;padding-left: 12px;padding-top: 6px;line-height: 22px;color: #3C5484;">
                    {{getTitleValue}}
                </div>
            </a-tooltip>

            <!-- autoFocus = true -->
            
            <a-textarea
                :ref = "fieldOptions.fieldName + '_edit_obj'"
                v-show="isShowEditMode"
                :size="fieldOptions.size ? fieldOptions.size : 'default'"
                v-decorator="[fieldOptions.fieldName, {
                    initialValue: fieldOptions.defaultValue ? fieldOptions.defaultValue : '',
                    validateTrigger: [ fieldOptions.validateTrigger || 'change'],
                    rules: [{ required: false, message: '请输入备注' }]
                  }]"
                :rows="fieldOptions.rows"
                @blur="toView"
                :placeholder="fieldOptions.placeholder"
                :disabled="getDisable()"
                @change="change"
                @focus="onFocus"
                @load="onLoad"
            >
                <!-- <a-icon slot="prefix" :component="fieldOptions.prefixIcon" v-if="fieldOptions.prefixIcon"/> -->
                <!-- <a-tooltip slot="suffix" title=""
                    v-if="isShow()">
                    <span :style="{color: currentLength > total ? 'red': '#3366FF'}">{{currentLength}}</span>/{{total}}
                </a-tooltip> -->
                
            </a-textarea>

            <div class="form-item-textarea-tips" v-if="isShow()">
                <span :style="{color: currentLength > total ? 'red': '#3366FF'}">{{currentLength}}</span><span>/{{total}}</span>
            </div>
            
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
    import {switchEdit} from 'components/switchEditJs/swithEdit'
    
    export default {
        mixins: [switchEdit] ,
        name: 'y-form-item-textarea',
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
                currentLength: 0,
                rules: [],
                mode: false,
                visible:false,
                canSwitchToView: this.fieldOptions.canSwitchToView || false
            }
        },
        computed: {
            total() {
                return this.fieldOptions.total || 1000;
            },
            // isShowEditMode() {
            //     return true;
            // }
        },
        watch:{
            "fieldOptions.defaultValue"(newVal){
                this.titleValue = this.fieldOptions.defaultValue;
                if(typeof newVal !== 'undefined' && newVal !==null){
                    this.currentLength = newVal.length;
                }
            }
        },
        props: {
            fieldOptions: Object,
        },
        methods: {
            UpdateTitleValue(){
                this.D(" UpdateTitleValue defaultValue = " + this.fieldOptions.defaultValue,this.fieldOptions);
                this.titleValue = this.fieldOptions.defaultValue;
                this.D(" UpdateTitleValue titleValue = " + this.titleValue);
            },
            getContainer(e) {
                //console.log(e)
                return e.parentNode;
            },
            toEdit() {
                this.visible = false
                console.log('123....')
                if(!this.canSwitchToView) {
                    return;
                }
                this.mode = 'edit';
            },
            toView(e) {
                if(this.fieldOptions.maxlength && e.target.value.trim().length > this.fieldOptions.maxlength){
                    this.$message.error(`请输入${this.fieldOptions.maxlength}字`)
                    return
                }
                this.$emit('blur',e);
                this.$emit("blur2",e.target.value.trim(),this.fieldOptions.fieldName);
                if(!this.canSwitchToView) {
                    return;
                }
                this.mode = 'view';
                
            },
            onFocus(e){
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
            change(e) {
                // let val = e.target.value;
                // this.currentLength = val.trim().length

                // let fieldName = this.fieldOptions.fieldName;
                // if(this.fieldOptions.maxlength){
                //     this.currentLength = e.target.value.trim().length;
                //     if(this.currentLength > this.fieldOptions.maxlength){
                //        return
                //     }else{

                //     }
                // }
                // this.$emit('change',val.trim())

                let fieldName = this.fieldOptions.fieldName;
                if(this.fieldOptions.total){
                    let total = this.fieldOptions.total;
                    this.currentLength = e.target.value.trim().length;
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
            maxLengthValidate(rule,value, callback) {
                //console.log(value, this.total)
                if(value.length > this.total) {
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
            }
        }
    }
    </script>
<style lang="less">
.form-item-textarea-cntr{
    position: relative;
    /* border: 1px solid #d9d9d9; */
    /* textarea{
        resize: none;
        border: 0px !important;
        &:focus{
            box-shadow:none;
        }
    } */
    /* .form-item-textarea-tips{
        overflow: hidden;
        padding: 0 4px 4px 0;
        line-height: 12px;
        border:none;
        span{
            float:right;
        }
    } */
    &:hover{
        box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
        border-color: #40a9ff;
    }
}
.form-item-textarea-cntr-disable{
    background-color: #f5f5f5;
    cursor: not-allowed;
}

.component-input.component-view{
    float: unset;
}
.component-input.component-edit{
    float: unset;
}

/*textarea 内部样式*/
.y-form-item-textarea{
    .ant-form-item-label{
        float: left;
    }
    textarea{
        overflow: hidden;
                padding-top: 8px;
                padding-bottom: 0;
                margin-bottom: 0;
            }
    .component-edit{
        textarea{
                border-bottom: 1px solid #3366FF;
                padding-right:65px !important;
            }
    }
    .component-view{
        textarea{
                /* padding-right:65px !important; */
            }
    }
    .form-item-wrap{
        position: relative;
    }
    .form-item-textarea-tips{
        display: inline;
        position: absolute;
        bottom: 0px;
        right: 7px;
    }
}


</style>