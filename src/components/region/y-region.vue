<template>
    <div >
        <span v-if="fieldOptions.preIcon" style="float: left;width: 20px;height: 32px;text-align: center;line-height:60px;">
            <span class="file-icon" :class="getIconClass()"></span>
        </span>
    <a-form-item 
        :label="getLabel()" 
        :label-col="fieldOptions.labelCol" 
        :wrapper-col="fieldOptions.wrapperCol"
        :class="getClass()"
    >
        <a-cascader
            :size="fieldOptions.size ? fieldOptions.size : 'default'"
            v-decorator="[
                fieldOptions.fieldName,
                { 
                    initialValue: fieldOptions.defaultValue ? fieldOptions.defaultValue : [],
                    rules: rules
                }
            ]"
            :options="options"
            changeOnSelect
            :placeholder="fieldOptions.placeholder || ''"
            :allowClear="fieldOptions.allowClear"
            :popupClassName="fieldOptions.popupClassName || ''"
            @change="onChange"
            @popupVisibleChange="popupVisibleChange"
        >
        </a-cascader>
    </a-form-item>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import { api_getRegion } from 'api/region';
import { yc_regionDataProcess } from 'utils/region';
import {fileTypes} from 'consts/file-types.js'
export default {
    name: 'y-region',
    created() {
        this.getData();
        this.getRules();
    },
    data() {
        return {
            rules: [],
            options: [],
            canSwitchToView: this.fieldOptions.canSwitchToView || false
        }
    },
    props: {
        fieldOptions: Object,
    },
    computed: {
        ...mapState(['cacheState'])
    },
    methods: {
        popupVisibleChange(value){
            if(value == false){
                this.$emit("popup")
            }
        },
        ...mapMutations(['updateRegionCache']),
        onChange(e) {
            //console.log(e)
            this.$emit('change', e);
            this.$emit('change2', e,this.fieldOptions.fieldName);
        },
        getRules() {
            let result = [];
            if(Array.isArray(this.fieldOptions.rules) && this.fieldOptions.rules.length > 0) {
                result = this.fieldOptions.rules;
            }
            this.rules = result;
            //console.log('this.rules',this.rules);
        },
        async getData() {
            let res = this.cacheState.regionCache;
            if(!res || res.length == 0) {
                let start = new Date();
                res = await api_getRegion({data: {}});
                res = yc_regionDataProcess(res);
                let end = new Date();
                //console.log('所用时间:', end - start)
                this.updateRegionCache(res);
            }
            this.options = res;
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
        getClass() {
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
    }
}
</script>


