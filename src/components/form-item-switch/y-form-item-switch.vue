<template>
    <a-form-item 
        :label="fieldOptions.label" 
        :label-col="fieldOptions.labelCol" 
        :wrapper-col="fieldOptions.wrapperCol"
        :class="getClass()"
    >
        <a-switch
            :size="fieldOptions.size ? fieldOptions.size : 'default'"
            v-decorator="[
                fieldOptions.fieldName,
                { 
                    initialValue: fieldOptions.defaultValue ? fieldOptions.defaultValue : 0,
                    valuePropName: 'checked',
                    rules: rules
                }
            ]"
            @change="onChange"
            :disabled="fieldOptions.disabled"
        >
        </a-switch>
        <a-tooltip :placement="getPlacement()" 
                :title="getTooltipTitle()"
                trigger="click"
                v-show="isTooltipShow()"
                class="component-in-help">
            <a-icon type="question-circle" />
        </a-tooltip>
    </a-form-item>
</template>
<script>

export default {
    name: 'y-form-item-switch',
    created() {
        this.getRules();
    },
    data() {
        return {
            rules: [],
        }
    },
    props: {
        fieldOptions: Object,
    },
    methods: {
        onChange(val) {
            //console.log('val', val)
            this.$emit('change', val);
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
        },
        getClass() {
            let result = []
            if(this.fieldOptions.tooltip) {
                result.push('component-input-with-help');
            }
            return result;
        },
    }
}
</script>


