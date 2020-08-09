<template>
    <a-form-item 
        :label="fieldOptions.label" 
        :label-col="fieldOptions.labelCol" 
        :wrapper-col="fieldOptions.wrapperCol"
        :class="getClass()"
    >
        <a-checkbox-group :name="fieldOptions.fieldName"
            :size="fieldOptions.size ? fieldOptions.size : 'default'"
            v-decorator="[
                fieldOptions.fieldName,
                { 
                    initialValue: fieldOptions.defaultValue ? fieldOptions.defaultValue : 0,
                    rules: rules
                }
            ]"
            @change="onChange"
            :disabled="fieldOptions.disabled">
            <a-checkbox v-for="item in options"
                :key="item[fieldOptions.idProperty || 'id']"
                :value="item[fieldOptions.valueProperty || 'id']">{{item[fieldOptions.textProperty || 'name']}}</a-checkbox>
        </a-checkbox-group>
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
import { api_getSelectListByUrl } from 'api/form';
export default {
    name: 'y-form-item-checkbox',
    created() {
        this.getData();
        this.getRules();
    },
    data() {
        return {
            options: [],
            rules: [],
        }
    },
    props: {
        fieldOptions: Object,
    },
    methods: {
        async getData() {
            let data = '';
            if(this.fieldOptions.url) {
                //如果有url
                if(this.fieldOptions.cache!==undefined && this.fieldOptions.cache==false) {
                    data = await this.getDataByUrl();
                }else {
                    let cacheUrl = this.fieldOptions.url + (this.fieldOptions.typeValue || '');
                    data = this.cacheState.selectCache[cacheUrl];
                    if(!data) {
                        data = await this.getDataByUrl();
                        
                        this.updateSelectCache({
                            url: cacheUrl,
                            data: data
                        });
                        
                    }
                }
                if(this.fieldOptions.urlDataAppendTotal === undefined
                    || this.fieldOptions.urlDataAppendTotal == true) {
                    data.unshift({
                        [this.fieldOptions.textProperty]: '全部',
                        [this.fieldOptions.valueProperty]: ''
                    });
                }
                this.options = data;
            }else {
                this.options = this.fieldOptions.options;
            }
            this.$emit('dataed');//得到了数据
        },
        async getDataByUrl() {
            let that = this;
            let res = await api_getSelectListByUrl({
                url: that.fieldOptions.url,
                data: {
                    [this.fieldOptions.typeProperty || 'type']: this.fieldOptions.typeValue || '', 
                }
            });
            if(that.fieldOptions.withItems) {
                return res.items
            }
            return res;
        },
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


