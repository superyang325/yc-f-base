<template>
    <div class="y-tree-select">
        <tree-select 
            :value="value" 
            :multiple="multiple" 
            :placeholder="placeholder"
            :appendToBody="appendToBody"
            :disabled="disabled"
            :valueFormat="valueFormat"
            :flat="flat"
            :value-consists-of="valueConsistsOf"
            @input="valChange"
            noOptionsText="暂无数据"
            :options="options" />
        <!-- {{options}} -->
        <!-- {{flat}} -->
    </div>
</template>
<script>

import TreeSelect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';

export default {
    name: 'y-tree-select',
    props: {
        value: [String, Array],
        title: String,
        placeholder: String,
        multiple: Boolean,
        disabled: Boolean,
        options: Array,
        appendToBody: Boolean,
        valueFormat: String,
        flat: Boolean,
        valueConsistsOf: String,
        replaceFields:{
            type: Object,
            default() {
                return {
                    id: 'id',
                    label: 'label'
                }
            }
        }
    },
    components: {
        TreeSelect
    },
    methods: {
        valChange(value) {
            //console.log(value);
            this.$emit('change', value);
        },
    }
}
</script>


