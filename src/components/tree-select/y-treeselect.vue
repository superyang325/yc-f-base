<template>
    <a-form-item 
        :label="fieldOptions.label" 
        :label-col="fieldOptions.labelCol" 
        :wrapper-col="fieldOptions.wrapperCol"
        class="y-treeselect"
    >
        <y-tree-select
            v-decorator="[
                fieldOptions.fieldName,
                { 
                    initialValue: fieldOptions.defaultValue ? fieldOptions.defaultValue : null,
                    rules: rules
                }
            ]"
            :multiple="fieldOptions.multiple"
            :options="options"
            :placeholder="fieldOptions.placeholder || ''"
            :flat="fieldOptions.flat"
            :valueFormat="fieldOptions.valueFormat || 'id'"
            :disabled="fieldOptions.disabled"
            :appendToBody="fieldOptions.appendToBody"
            :replaceFields="fieldOptions.replaceFields"
            :valueConsistsOf="fieldOptions.valueConsistsOf || 'BRANCH_PRIORITY'"
            @change="onChange"
        >
        </y-tree-select>
    </a-form-item>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import yTreeSelect from './y-tree-select';
import { api_getTree } from 'api/tree';
export default {
    name: 'y-treeselect',
    created() {
        this.getRules();
        this.getData();
    },
    data() {
        return {
            rules: [],
            options: []
        }
    },
    props: {
        fieldOptions: Object,
        queryObj: {
            type: Object,
            default() {
                return {}
            }
        },//查询条件
    },
    components: {
        yTreeSelect
    },
    computed: {
        ...mapState(['cacheState'])
    },
    watch: {
        queryObj: {
            handler(val) {
                //console.log('查询条件发生变化的时候,重新查询', val)
                this.getData();
            },
            deep: true
        }
    },
    methods: {
        ...mapMutations(['updateTreeselectCache']),
        async getData() {
            let data = '';
            if(this.fieldOptions.cache!==undefined && this.fieldOptions.cache==false) {
                //不使用缓存
                //console.log('不使用缓存')
                data = await this.getDataByUrl();
            }else {
                //先去判断一下缓存里是否有值,没有再去发起查询
                data = this.cacheState.treeselectCache[this.fieldOptions.url];
                if(!data) {
                    data = await this.getDataByUrl();
                    this.updateTreeselectCache({
                        url: this.fieldOptions.url,
                        data: data
                    });
                }
            }
            
            //这里需要加一个适配过程
            this.adapteData(data);
            this.options = data;
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
                obj.id = obj[this.fieldOptions.replaceFields.id];
                if(this.fieldOptions.rowRender) {
                    obj.label = this.fieldOptions.rowRender(obj);
                }else {
                    obj.label = obj[this.fieldOptions.replaceFields.label];
                }
                if(obj.children && obj.children.length) {
                    this.adapteData(obj.children)
                }
            });
        },
        onChange(val) {
            //console.log('val', val)
            this.$emit('change', val)
        },
        getRules() {
            let result = [];
            if(Array.isArray(this.fieldOptions.rules) && this.fieldOptions.rules.length > 0) {
                result = this.fieldOptions.rules;
            }
            this.rules = result;
        },
    }
}
</script>
<style lang="less">
.y-treeselect{
    
}
</style>


