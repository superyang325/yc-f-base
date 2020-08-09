<template>
    <div >
        <span v-if="fieldOptions.preIcon" style="float: left;width: 20px;height: 32px;text-align: center;line-height:60px;">
            <span class="file-icon" :class="getIconClass()"></span>
        </span>
    <a-form-item 
        :label="getLabel()" 
        :label-col="fieldOptions.labelCol" 
        :wrapper-col="fieldOptions.wrapperCol"
        class="y-date"
        :class="getClass()"
    >
<!--  style="position:absolute;z-index:1000;width:200px;background:#ff0000;" -->
        <div v-show="!isShowEditMode" @dblclick="toEdit" @contextmenu.prevent="toEdit" class="form-item-wrap">
            {{(this.titleValue?this.titleValue:this.fieldOptions.defaultValue)||'--'}}
        </div>

        <a-date-picker
            :showTime="{ format: 'HH:mm' }"
            format="YYYY-MM-DD HH:mm"
            :disabledDate="disabledDate"
            :size="fieldOptions.size ? fieldOptions.size : 'default'"
            v-decorator="[
                fieldOptions.fieldName,
                { 
                    initialValue: fieldOptions.defaultValue ? fieldOptions.defaultValue : '',
                    //initialValue: fieldOptions.defaultValue,
                    rules: rules
                }
            ]"
            @change="onChange"
            @blur="onBlur"
        >
      </a-date-picker>
    </a-form-item>
    </div>
</template>
<!--
            :showTime="fieldOptions.showTime"
            :format="fieldOptions.showTime"
                :showTime="{ format: 'HH:mm' }"
                format="YYYY-MM-DD HH:mm"
            :showTime="fieldOptions.showTime"
            :format="fieldOptions.format"
 -->
<script>
import moment from 'moment';
import {fileTypes} from 'consts/file-types.js'
import {switchEdit} from 'components/switchEditJs/swithEdit'

export default {
    mixins: [switchEdit] ,
    name: 'y-date',
    created() {
        this.getRules();
        this.UpdateTitleValue();
    },
    data() {
        // let beforeDate = moment().add(-1, 'months')
        // let afterDate = moment()
        return {
            rules: [],
            timeFormat:this.fieldOptions.timeFormat||"YYYY-MM-DD",
        }
    },
    computed: {
        isShowEditMode() {
            return true;
        }
    },
    props: {
        fieldOptions: Object,
    },
    methods: {
        disabledDate(current){
            if(this.fieldOptions.nextDateDisable){
                return current && current > moment().endOf('day');
            }
        },
        UpdateTitleValue(){//override switchEdit.UpdateTitleValue
            console.log('a-date-picker.UpdateTitleValue-------------');
            console.log(this.fieldOptions.defaultValue);
            //this.titleValue = moment(this.fieldOptions.defaultValue, this.fieldOptions.timeFormat);
            this.titleValue = this.fieldOptions.defaultValue;
        },
        onChange(e) {
            console.log('a-date-picker.onChange-------------')
            console.log(e)
            //console.log(moment)
            // let result = [e[0].format('YYYY-MM-DD hh:mm:ss'), e[1].format('YYYY-MM-DD hh:mm:ss')];
            this.titlevalue = moment(e,this.fieldOptions.timeFormat);
            this.$emit('change', e);
            this.$emit('change2', e,this.fieldOptions.fieldName);
        },
        getRules() {
            let result = [];
            if(Array.isArray(this.fieldOptions.rules) && this.fieldOptions.rules.length > 0) {
                result = this.fieldOptions.rules;
            }
            this.rules = result;
        },
        getClass() {
            //component-input
            let result = []
            if(this.canSwitchToView) {
                if(this.mode == 'view') {
                    result.push('component-view')
                }else {
                    result.push('component-edit')
                }
            }
            
            return result;
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
    }
}
</script>
<style lang="less">
.y-date{
    .ant-calendar-picker-input{
        padding: 6px 33px 6px 9px;
        cursor: pointer;
        .ant-calendar-range-picker-input{
            width:70px;
            height:18px;
            font-size:12px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(132,156,192,1);
            line-height:17px;
        }
        .ant-calendar-range-picker-separator{
            margin: 0 16px;
            width: 8px;
        }
        input::-webkit-input-placeholder {
            color:rgba(132,156,192,1);
            font-size:12px;
        }
        input:-moz-placeholder { 
            color:rgba(132,156,192,1);
            font-size:12px;
        }
        input::-moz-placeholder { 
            color:rgba(132,156,192,1);
            font-size:12px;
        }
        input:-ms-input-placeholder { 
            color:rgba(132,156,192,1);
            font-size:12px;
        }
    }
    .ant-input{
        line-height: 16px !important;
    }
}
</style>


