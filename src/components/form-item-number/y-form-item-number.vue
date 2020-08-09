<template>
    <div >
        <span v-if="fieldOptions.preIcon" style="float: left;width: 20px;height: 32px;text-align: center;line-height:60px;">
            <span class="file-icon" :class="getIconClass()"></span>
        </span>
    <a-form-item 
        :label="getLabel()" 
        :label-col="fieldOptions.labelCol" 
        :wrapper-col="fieldOptions.wrapperCol"
    >
        <div v-show="!isShowEditMode" @dblclick="toEdit" @contextmenu.prevent="toEdit" class="form-item-wrap">
            {{this.titleValue||'--'}}
        </div>
        <a-input-number
            v-show="isShowEditMode" 
            :style="getStyle()"
            :size="fieldOptions.size ? fieldOptions.size : 'default'"
            v-decorator="[
                fieldOptions.fieldName,
                { 
                    initialValue: fieldOptions.defaultValue ? fieldOptions.defaultValue : '',
                    rules: rules
                }
            ]"
            :max="fieldOptions.max || 10"
            :min="fieldOptions.min || 1"
            :disabled="fieldOptions.disabled"
            @change="onChange"
            :formatter="value => `${value}${fieldOptions.unit}`"
            :parser="value => value.replace(`${fieldOptions.unit}`, '')"
            @blur="onBlur"
        >
      </a-input-number>
    </a-form-item>
    </div>
</template>
<script>
import {fileTypes} from 'consts/file-types.js'
import {switchEdit} from 'components/switchEditJs/swithEdit'
export default {
    mixins: [switchEdit] ,
    name: 'y-form-item-number',
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
            this.$emit('change', val)
        },
        onBlur(val){
            this.$emit('blur', val)
        },
        getRules() {
            let result = [];
            if(Array.isArray(this.fieldOptions.rules) && this.fieldOptions.rules.length > 0) {
                result = this.fieldOptions.rules;
            }
            this.rules = result;
            //console.log('this.rules',this.rules);
        },
        getStyle() {
            let width = this.fieldOptions.width;
            if(width===undefined) {
                return {};
            }else {
                return {
                    width: width
                }
            }
            
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

    }
}
</script>


