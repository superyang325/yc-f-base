<template>
    <a-form-item 
        :label="fieldOptions.label" 
        :label-col="fieldOptions.labelCol" 
        :wrapper-col="fieldOptions.wrapperCol"
    >
        <inner-add-label
            v-decorator="[
                fieldOptions.fieldName,
                { 
                    initialValue: fieldOptions.defaultValue || [],
                    rules: rules
                }
            ]"
            :fieldOptions="fieldOptions"
            @change="onChange"
            @remove="onRemove"
        >
        </inner-add-label>
    </a-form-item>
</template>
<script>
import innerAddLabel from './inner-add-label';
import { api_fetchWithUrl } from 'api/table';
import transFormData from 'utils/transcolors';

export default {
    name: 'y-add-label',
    created() {
        this.getRules();
        
        if(this.fieldOptions.addFlag){
            this.fieldOptions.defaultValue = []
        }
    },
    watch:{
        'fieldOptions.defaultValue'(val){
            if(val[0]){
                if(!val[0].oldVal && !this.fieldOptions.addFlag){
                    val = transFormData(val)
                }
            }
        }
    },
    data() {
        return {
            rules: [],
        }
    },
    props: {
        fieldOptions: Object,
    },
    components: {
        innerAddLabel
    },
    methods: {
        onChange(val) {
            this.$emit('change', val)
        },
        onRemove(val) {
            
            this.$emit('remove', val)
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
</style>


