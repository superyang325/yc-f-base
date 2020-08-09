<template>
    <div >
        <span v-if="fieldOptions.preIcon" style="float: left;width: 20px;height: 32px;text-align: center;line-height:60px;">
            <span class="file-icon" :class="getIconClass()"></span>
        </span>
    <a-form-item
        :label="getLabel()" 
        :label-col="fieldOptions.labelCol" 
        :wrapper-col="fieldOptions.wrapperCol"
        class="y-data-between"
        :class="getClass()"
    >
        <div v-show="isShowEditMode"
            @dblclick="toEdit" 
            @contextmenu.prevent="toEdit" 
            class="form-item-wrap user360-date"
            :style="{cursor : (fieldOptions.allowEdit !== undefined && fieldOptions.allowEdit !== fieldOptions.index ? 'not-allowed' : 'default')}"
        >
            {{targetValue}}
        </div>
        <a-date-picker
            :showTime="fieldOptions.showTime ? fieldOptions.showTime : false"
            v-show="!isShowEditMode"
            v-decorator="[
                fieldOptions.fieldName,
                { 
                    initialValue: fieldOptions.defaultValue ? fieldOptions.defaultValue : '',
                    rules: rules
                }
            ]"
            format="YYYY-MM-DD HH:mm"
            @change="onChange"
            @ok="ok"
            @openChange="openChange"
            @blur="blur"
            :disabledDate="disabledDate"
            :disabledTime="disabledTime"
            :allowClear="fieldOptions.allowClear"
        >
      </a-date-picker>
      <!-- 年龄 -->
      <span v-if="showAge()" class="class-age">
        {{yearDiff}}岁
      </span>
    </a-form-item>
</div>
</template>
<script>
import moment from 'moment';
import {fileTypes} from 'consts/file-types.js'
import { getAge } from 'utils/date'

export default {
    name: 'y-date-single',
    created() {
        this.getRules();
    },
    data() {
        return {
            rules: [],
            canSwitchToView: this.fieldOptions.canSwitchToView || false,
            yearDiff:'--', // 选定的日期与当前系统日期的年份差值
            mode:'view',
            isToggle:false,
            changeValue:'',
            watchToggle:false,
            time:0
        }
    },
    computed:{
        isShowEditMode() {
            console.log(this.isToggle);
            if(this.fieldOptions.switchToView && !this.isToggle) {
                return true;
            }
            return false;
        },
        targetValue(){
            if(this.fieldOptions.allowClear == false && this.changeValue === null){
                 return this.formatDate(new Date(this.fieldOptions.defaultValue),'minute')
            }
            if(this.changeValue === null){
                return '-'
            }else if(this.changeValue){
                return this.formatDate(new Date(this.changeValue),'minute')
            }else if(this.fieldOptions.defaultValue){
                return this.formatDate(new Date(this.fieldOptions.defaultValue),'minute')
            }else{
                return '-'
            }
        }
    },
    watch:{
        'fieldOptions.defaultValue'(val){
            if(val){
                this.yearDiff = getAge(val)
            }
        },
        fieldOptions:{
            handler(newVal){
                this.time ++;
                if(this.time == 1 && newVal.addStatus == true && this.fieldOptions.allowEdit == this.fieldOptions.index){
                    this.isToggle = true;
                }
            },
            deep:true
        },
        isError(newVal){
            if(newVal){
                this.watchToggle = true;
                this.isToggle = true;
                return 
            }
            this.watchToggle = false;
        }
    },
    props: {
        fieldOptions: Object,
        isError:Boolean
    },
    methods: {
        blur(){
            console.log("aaa");
        },
        toEdit(){
            if(this.fieldOptions.allowEdit !== undefined && this.fieldOptions.allowEdit !== this.fieldOptions.index){
                this.isToggle = false;
            }else if(this.fieldOptions.switchToView){
                this.isToggle = true;
            }
        },
        disabledDate(current){
            if(this.fieldOptions.beforeDateDisable){
                return current < moment().startOf('day');
            }else if(this.fieldOptions.nextDateDisable && this.fieldOptions.timeStamp){
                return new Date(current.format("YYYY-MM-DD")).getTime() - 8*60*60*1000 < this.fieldOptions.timeStamp - 24*60*60*1000|| current > moment().endOf('day');
            }else if(this.fieldOptions.nextDateDisable){
                return current > moment().endOf('day');
            }
        },
        disabledTime(current){
            if(this.fieldOptions.nextTimeDisable && current.format("YYYY-MM-DD") == this.formatDate(new Date(this.fieldOptions.timeStamp),'day')){
                let hour = new Date(this.fieldOptions.timeStamp).getHours();
                if(!this.changeValue){
                    return {
                        disabledHours: () => this.range(0, 24).splice(0, hour),
                        disabledMinutes: () => this.range(0, new Date(this.fieldOptions.timeStamp).getMinutes())
                    }
                }else if(this.changeValue && new Date(this.changeValue.format("YYYY-MM-DD HH:mm")).getHours() == hour){
                    return {
                        disabledHours: () => this.range(0, 24).splice(0, hour),
                        disabledMinutes: () => this.range(0, new Date(this.fieldOptions.timeStamp).getMinutes())
                    }
                }else if(this.changeValue && new Date(this.changeValue.format("YYYY-MM-DD HH:mm")).getHours() != hour){
                    return {
                        disabledHours: () => this.range(0, 24).splice(0, hour)
                    }
                }
            }
            if(this.fieldOptions.nextTimeDisable && current.format("YYYY-MM-DD") == this.formatDate(new Date(),'day')){
                let hour = new Date().getHours();
                console.log(hour);
                if(!this.changeValue){
                    return {
                        disabledHours: () => this.range(0, 24).splice(hour + 1),
                        disabledMinutes: () => this.range(new Date().getMinutes() + 1,60)
                    }
                }else if(this.changeValue && new Date(this.changeValue.format("YYYY-MM-DD HH:mm")).getHours() == hour){
                    return {
                        disabledHours: () => this.range(0, 24).splice(hour + 1),
                        disabledMinutes: () => this.range(new Date().getMinutes() + 1,60)
                    }
                }else if(this.changeValue && new Date(this.changeValue.format("YYYY-MM-DD HH:mm")).getHours() != hour){
                    return {
                        disabledHours: () => this.range(0, 24).splice(hour + 1)
                    }
                }
            }
            if(this.fieldOptions.prevTimeDisable && current.format("YYYY-MM-DD") == this.formatDate(new Date(),'day')){
                let hour = new Date().getHours();
                console.log(hour);
                if(!this.changeValue){
                    return {
                        disabledHours: () => this.range(0, 24).splice(0,hour),
                        disabledMinutes: () => this.range(0,new Date().getMinutes())
                    }
                }else if(this.changeValue && new Date(this.changeValue.format("YYYY-MM-DD HH:mm")).getHours() == hour){
                    return {
                        disabledHours: () => this.range(0, 24).splice(0,hour),
                        disabledMinutes: () => this.range(0,new Date().getMinutes())
                    }
                }else if(this.changeValue && new Date(this.changeValue.format("YYYY-MM-DD HH:mm")).getHours() != hour){
                    return {
                        disabledHours: () => this.range(0, 24).splice(0,hour),
                    }
                }
            }
        },
        onChange(e) {
            console.log(e);
            this.changeValue = e;
            this.yearDiff = getAge(e)
            this.$emit('change',e);
            this.$emit('change2',e,this.fieldOptions.fieldName);
        },
        showAge(){
            if(this.fieldOptions.showAge && this.mode == 'view'){
                return true
            }
        },
        openChange(e){
            if(e){
                //显示
                this.mode = 'edit'
            }else{
                //关闭
                this.$emit("close",this.changeValue);
                setTimeout(() => {
                    if(!this.watchToggle){
                        this.isToggle = false;
                        this.mode = 'view'
                    }
                }, 0);
            }
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
        formatDate(date,type) { 
            var year=date.getFullYear(); 
            var month=date.getMonth()+1; 
            var day=date.getDate(); 
            var hour=date.getHours(); 
            var minute=date.getMinutes(); 
            var second=date.getSeconds(); 
            switch(type){
                case 'day':
                    return year + '-' + (String(month).length > 1 ? month : '0' + month) + '-' + 
                    (String(day).length > 1 ? day : '0' + day) 
                case 'minute':
                    return year + '-' + (String(month).length > 1 ? month : '0' + month) + '-' + 
                    (String(day).length > 1 ? day : '0' + day) + ' ' + (String(hour).length > 1 ? hour : '0' + hour) + ':' + (String(minute).length > 1 ? minute : '0' + minute)
                break;
                default:
                    return year + '-' + (String(month).length > 1 ? month : '0' + month) + '-' + 
                    (String(day).length > 1 ? day : '0' + day) + ' ' + (String(hour).length > 1 ? hour : '0' + hour) + ':' + (String(minute).length > 1 ? minute : '0' + minute)
                    + ':' + (String(second).length > 1 ? second : '0' + second)
                break;
            }
        },
        range(start, end) {
            const result = [];
            for (let i = start; i < end; i++) {
            result.push(i);
            }
            return result;
        }
    }
}
</script>
<style lang="less">
.y-data-between{
    &.component-view{
        .ant-calendar-picker-input.ant-input{
            border-bottom:0;

        }
    }
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

    /*年龄class*/
    .class-age{
        display: inline-block;
        font-size: 14px;
        color: #FA8C15;
        font-family:MicrosoftYaHei;
        height: 32px;
        top: -6px;
        right: -10px;
        position: absolute;
    }

    .user360-date{
        font-size: 12px;
        text-align: left;
        word-break: break-all;
        line-height: 32px;
        white-space: nowrap;
        overflow: hidden;
    }
}
</style>


