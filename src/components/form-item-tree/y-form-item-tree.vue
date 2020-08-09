<template>
    <a-form-item 
        :label="fieldOptions.label" 
        :label-col="fieldOptions.labelCol" 
        :wrapper-col="fieldOptions.wrapperCol"
    >
        <inner-tree
            :size="fieldOptions.size ? fieldOptions.size : 'default'"
            v-decorator="[
                fieldOptions.fieldName,
                { 
                    initialValue: fieldOptions.defaultValue ? fieldOptions.defaultValue : [],
                    validateTrigger: [ fieldOptions.validateTrigger || 'change'],
                    rules: rules
                }
            ]"
            :treeData="treeData"
            :checkedArr="fieldOptions.checkedKeys"
            @change="change"
            :disabled="fieldOptions.disabled"
        >
        </inner-tree>
        
        <a-tooltip :placement="getPlacement()" 
                :title="getTooltipTitle()"
                trigger="hover"
                v-show="isTooltipShow()"
                class="component-in-help">
            <a-icon type="question-circle" />
        </a-tooltip>
    </a-form-item>
</template>
<script>
import innerTree from './inner-tree';
import { api_getTree } from 'api/tree';
export default {
    name: 'y-form-item-tree',
    created() {
        this.getRules();
        if(this.fieldOptions.autoQuery) {
            this.getData();
        }
    },
    data() {
        return {
            rules: [],
            treeData: []
        }
    },
    props: {
        fieldOptions: Object,
    },
    components: {
        innerTree
    },
    methods: {
        change(res){
            console.log(res);
            this.$emit("change"); 
        },
        query() {
            this.getData();
        },
        async getData() {
            let data = await this.getDataByUrl();
            console.log('data', data)
            //这里需要加一个适配过程
            this.adapteData(data);
            this.treeData = data;
            this.$emit('dataed');//得到了数据
        },
        async getDataByUrl() {
            return await api_getTree({
                url: this.fieldOptions.url,
                data: this.queryObj
            });
        },
        adapteData(arr) {
            arr.forEach(obj => {
                obj.oldId = obj.id;
                obj.key = obj[this.fieldOptions.replaceFields.id];
                if(this.fieldOptions.rowRender) {
                    obj.title = this.fieldOptions.rowRender(obj);
                }else {
                    obj.title = obj[this.fieldOptions.replaceFields.label];
                }
                if(obj.children && obj.children.length) {
                    this.adapteData(obj.children)
                }
            });
        },
        getRules() {
            let result = [];
            if(Array.isArray(this.fieldOptions.rules) && this.fieldOptions.rules.length > 0) {
                result = this.fieldOptions.rules;
            }
            this.rules = result;
            //console.log('this.rules',this.rules);
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
</style>


