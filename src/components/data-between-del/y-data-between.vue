<template>
  <div class="y-data-between-layout">
    <div class="y-data-between-title">{{title}}</div>
    <a-date-picker
      :disabledDate="disabledStartDate"
      v-model="startValue"
      :placeholder="start"
      :showToday="false"
      class="y-data-between-dataPicker"
      :defaultValue="defaultStart ? moment(`${defaultStart}`, 'YYYY-MM-DD') : ''"
    />
    -
    <a-date-picker
      :disabledDate="disabledEndDate"
      format="YYYY-MM-DD"
      :placeholder="end"
      v-model="endValue"
      :showToday="false"
      :defaultValue="defaultEnd ? moment(`${defaultEnd}`, 'YYYY-MM-DD') : ''"
    />
  </div>
</template>
<script>
import moment from 'moment';
export default {
    name:'y-data-between',
    data() {
        return {
            startValue: null,
            endValue: null,
            moment:moment
        };
    },
    props:{
        start:{
            type:String,
            default:'开始时间'
        },
        end:{
            type:String,
            default:'结束时间'
        },
        title:{
            type:String,
            default:'创建时间'
        },
        defaultStart:{
            type:String,
            default:''
        },
        defaultEnd:{
            type:String,
            default:''
        }
    },
    watch: {
        startValue(val) {
            //console.log('startTimeValue',this.moment(val._d).format('YYYY-MM-DD')+' 00:00:00');
            this.$emit("startChange",this.moment(val._d).format('YYYY-MM-DD')+' 00:00:00');
        },
        endValue(val) {
            //console.log('endValue',this.moment(val._d).format('YYYY-MM-DD')+' 23:59:55');
            this.$emit("endChange",this.moment(val._d).format('YYYY-MM-DD')+' 23:59:55');
        },
    },
    methods: {
        disabledStartDate(startValue) {
            const endValue = this.endValue;
            if (!startValue || !endValue) {
                return false;
            }
            return startValue.valueOf() > endValue.valueOf();
        },
        disabledEndDate(endValue) {
            const startValue = this.startValue;
            if (!endValue || !startValue) {
                return false;
            }
            return startValue.valueOf() >= endValue.valueOf();
        }
    },
};
</script>
<style lang="less">
.y-data-between-layout{
    display: inline-block;
    margin-left: 10px;
    .y-data-between-title{
        margin-right: -4px;
        vertical-align: top;
        padding: 6px 8px;
        font-size: 12px;
        line-height: 18px;
        color: #3C5484;
        font-size: 400;
        background: #f2f5fa;
        border: 1px solid #dbe0e7;
        display: inline-block;
        border-bottom-left-radius: 4px;
        border-top-left-radius: 4px;
    }
    .y-data-between-dataPicker input{
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
    }
}
</style>