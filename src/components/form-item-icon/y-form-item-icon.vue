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
            dropdownClassName="y-form-item-icon-select"
            @change="onChange"
        >
            <a-select-option v-for="item in options"
                :key="item[fieldOptions.idProperty || 'id']"
                :value="item[fieldOptions.valueProperty || 'id']">
                <div class="select-option-img" v-if="fieldOptions.imgProperty"
                :style="getIconStyle(item)"></div>
                <div class="select-option-text ellipsis">
                  {{item[fieldOptions.textProperty || 'name']}}
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
    name: 'y-form-item-icon',
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
        imgPosition: Number,
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
            this.$emit('dataed');//得到了数据
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
            this.$emit('change', e);
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
            let result = ['y-form-item-icon'];
            if(this.fieldOptions.tooltip) {
                result.push('component-input-with-help');
            }
            return result;
        },
        getIconStyle(item) {
            return {
                backgroundImage: "url("+item[this.fieldOptions.imgProperty]+")",
                backgroundPosition: "0 -"+this.imgPosition * 20+"px"
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
.y-form-item-icon-select{
    .ant-select-dropdown-menu{
        padding: 12px;
        width: 320px;
        /*滚动条样式 对chrome有效*/
        &::-webkit-scrollbar{
            width:0px;
            height:4px;
        }
        
    }
    .ant-select-dropdown-menu-item{
        width: 65px;
        height: 60px;
        float: left;
        padding: 0;
        margin-right: 12px;
        margin-bottom: 12px;
        .select-option-img{
            display: block;
            width: 20px;
            height: 20px;
            margin: 8px auto;
            background-position: 0 0;
            background-size: 20px auto;
        }
        .select-option-text{
            line-height: 24px;
            text-align: center;
            width: 48px;
            margin-left: 8px;
            font-size: 12px;
            color: #3C5484;
        }
        &:nth-child(4n){
            margin-right: 0;
        }
        &.ant-select-dropdown-menu-item-selected{
            background: #E6ECFF;
            .select-option-img{
                background-position: 0 -20px;
            }
            .select-option-text{
                color: #3366FF;
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

.y-form-item-icon{
    .ant-select-selection-selected-value{
        height: 30px;
        .select-option-img{
            float: left;
            width: 20px;
            height: 20px;
            margin-top: 5px;
            background-position: 0 0;
            background-size: 20px auto;
        }
        .select-option-text{
            display: inline-block;
        }
    }
}
</style>



