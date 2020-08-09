<template>
    <div class="y-select">
        <div class="title fl">{{title}}</div>
        <a-select
            class="y-select-inner fl"
            :style="getStyle()"
            v-model="val"
            :placeholder="placeholder"
            @change="onChange"
            >
            <a-select-option v-for="item in optionList"
                :key="item[valueProperty]"
                :value="item[valueProperty]">
                {{item[labelProperty]}}
            </a-select-option>
        </a-select>
    </div>
</template>
<script>
import { api_getOptions } from 'api/select';
export default {
    name: 'y-select',
    created() {
        if(this.url) {
            this.getData();
        }else {
            this.optionList = this.options;
        }
        //this.val = this.defaultValue;
    },
    data() {
        return {
            val: '',
            optionList: []
        }
    },
    props: {
        title: String,
        placeholder: String,
        //defaultValue: String,
        options: Array,
        url: String, //先判断url,如果没有url再使用options
        typeValue: String, //根据url取值时的字典类型,如果没传而只有url,代表从特定的url中取list
        typeProperty: {
            type: String,
            default() {
                return 'type';
            }
        },
        valueProperty: {
            type: String,
            default() {
                return 'value';
            }
        },
        labelProperty: {
            type: String,
            default() {
                return 'label';
            }
        },
        width: {
            type: [String, Number],
            default() {
                return '100';
            }
        },
    },
    methods: {
        async getData() {
            //TODO
            let res = await api_getOptions({
                url: this.url,
                [this.typeProperty]: this.typeValue, //目前没用上
            });
            res.unshift({
                [this.labelProperty]: '全部',
                [this.valueProperty]: ''
            });
            this.optionList = res;
        },
        onChange(e) {
            this.$emit('change', e);
        },
        hideLoading() {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.loading = false;
            }, this.minTime);
        },
        getStyle() {
            let width = this.width;
            return {
                width: width + 'px'
            }
        },
    }
}
</script>
<style lang="less">
.y-select{
    .title{
        padding: 6px 8px;
        font-size:12px;
        line-height: 18px;
        color: #3C5484;
        font-size: 400;
        background:rgba(242,245,250,1);
        border:1px solid rgba(219,224,231,1);
        display: inline-block;
        border-radius: 4px;
        border-bottom-right-radius: 0;
        border-top-right-radius: 0;
    }
    .y-select-inner{
        width: 200px;
        .ant-select-selection{
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            margin-left: -1px;
        }
        
    }
}
</style>


