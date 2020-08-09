<template>
    <a-form-item 
        :label="fieldOptions.label" 
        :label-col="fieldOptions.labelCol" 
        :wrapper-col="fieldOptions.wrapperCol"
        :class="getClass()"
    >
        <a-select
            :size="fieldOptions.size ? fieldOptions.size : 'default'"
            v-decorator="[
                fieldOptions.fieldName,
                { 
                    initialValue: fieldOptions.defaultValue,
                    rules: rules
                }
            ]"
            :title="titleValue"
            :allowClear="true"
            dropdownClassName="y-form-item-color-select"
            @change="onChange"
        >
            <a-select-option v-for="item in options"
                :key="item[fieldOptions.idProperty || 'id']"
                :value="item[fieldOptions.valueProperty || 'id']">
                <div class="select-option-text ellipsis"
                    :style="getTextStyle(item)">
                  {{item[fieldOptions.textProperty || 'name']}}
                    <a-icon type="check" class="y-form-item-color-checked" />
                </div>
            </a-select-option>
      </a-select>
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
import { mapState, mapMutations } from 'vuex';
import { api_getSelectListByUrl } from 'api/form';
export default {
    name: 'y-form-item-color',
    created() {
        //
        this.getData();
        this.getRules();
    },
    data() {
        return {
            options: [],
            rules: [],
            titleValue: ''
        }
    },
    computed: {
        ...mapState(['cacheState']),
    },
    props: {
        fieldOptions: Object,
    },
    methods: {
        ...mapMutations(['updateSelectCache']),
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
            //console.log('this.options', JSON.stringify(this.options));
            if(this.fieldOptions.defaultValue=='') {
                this.titleValue = '全部';
            }
            //console.log(this.fieldOptions.defaultValue, this.options);
            let index = this.options.findIndex(item => {
                return item.id == this.fieldOptions.defaultValue;
            });
            this.$emit('dataed', {
                index: index
            });//得到了数据
        },
        async getDataByUrl() {
            let that = this;
            let res = await api_getSelectListByUrl({
                url: that.fieldOptions.url,
                data: {
                    [this.fieldOptions.typeProperty || 'type']: this.fieldOptions.typeValue || '', //目前没用上
                }
            });
            if(that.fieldOptions.withItems) {
                return res.items
            }
            return res;
        },
        onChange(e) {
            if(e=='') {
                this.titleValue = '全部';
            }else {
                this.titleValue = e;
            }
            let index = this.options.findIndex(item => {
                return item.id == e;
            });
            this.$emit('change', {
                index: index
            });
        },
        getRules() {
            let result = [];
            if(Array.isArray(this.fieldOptions.rules) && this.fieldOptions.rules.length > 0) {
                result = this.fieldOptions.rules;
            }
            this.rules = result;
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
            let result = ['y-form-item-color'];
            if(this.fieldOptions.tooltip) {
                result.push('component-input-with-help');
            }
            return result;
        },
        getTextStyle(item) {
            return {
                background: item.dictValue
            }
        }
    }
}
</script>
<style lang="less" scoped>
.select-option-img{
    width: 18px;
    height: 18px;
    margin-right: 10px;
}
</style>
<style lang="less">
.y-form-item-color-select{
    .ant-select-dropdown-menu{
        padding: 12px;
        width: 320px;
    }
    .ant-select-dropdown-menu-item{
        width: 65px;
        height: 60px;
        float: left;
        padding: 0;
        margin-right: 12px;
        margin-bottom: 12px;
        .select-option-text{
            line-height: 60px;
            text-align: center;
            font-size: 12px;
            color: #3C5484;
        }
        &:nth-child(4n){
            margin-right: 0;
        }
        &.ant-select-dropdown-menu-item-selected{
            background: #E6ECFF;
            .select-option-text{
                color: #3366FF;
            }
            .y-form-item-color-checked{
                display: inline-block;
            }
        }
    }
    .ant-select-dropdown-menu-item:first-child{
        border-radius: 0;
    }
    &.ant-select-dropdown--empty{
        .ant-select-dropdown-menu-item{
            float: unset;
            width: unset;
            height: unset;
        }
    }
}

.y-form-item-color{
    .ant-select-selection-selected-value{
        height: 30px;
        .select-option-text{
            display: inline-block;
            background: none!important;
        }
    }
}
.y-form-item-color-checked{
    display: none;
}
</style>



