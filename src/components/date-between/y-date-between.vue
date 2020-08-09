<template>
    <a-form-item 
        :label="fieldOptions.label" 
        :label-col="fieldOptions.labelCol" 
        :wrapper-col="fieldOptions.wrapperCol"
        class="y-data-between"
    >
        <a-range-picker
            :defaultPickerValue="defaultValue"
            :size="fieldOptions.size ? fieldOptions.size : 'default'"
            v-decorator="[
                fieldOptions.fieldName,
                { 
                    initialValue: fieldOptions.defaultValue ? fieldOptions.defaultValue : '',
                    rules: rules
                }
            ]"
            @change="onChange"
        >
      </a-range-picker>
    </a-form-item>
</template>
<script>
import { api_getSelectListByUrl } from 'api/form';
import moment from 'moment';
export default {
    name: 'y-date-between',
    created() {
        this.getRules();
    },
    data() {
        let beforeDate = moment().add(-1, 'months')
        let afterDate = moment()
        return {
            rules: [],
            defaultValue : [moment(beforeDate, 'YYYY-MM-DD'),moment(afterDate, 'YYYY-MM-DD')]
        }
    },
    props: {
        fieldOptions: Object,
    },
    methods: {
        onChange(e) {
            console.log(e)
            //console.log(moment)
            this.$emit('change', e);
        },
        getRules() {
            let result = [];
            if(Array.isArray(this.fieldOptions.rules) && this.fieldOptions.rules.length > 0) {
                result = this.fieldOptions.rules;
            }
            this.rules = result;
            //console.log('this.rules',this.rules);
        },
    }
}
</script>
<style lang="less">
.y-data-between{
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


