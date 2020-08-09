<template>
    <div  >
    <span v-if="fieldOptions.preIcon" style="float: left;width: 20px;height: 32px;text-align: center;">
        <span class="file-icon" :class="getIconClass()"></span>
    </span>
    
    <a-form-item 
        :label="getLabel()" 
        :label-col="fieldOptions.labelCol" 
        :wrapper-col="fieldOptions.wrapperCol"
        :class="getClass()"
    >
    <a-tooltip :placement="getTipsPlacement()" :title="getTipsTitle()" >
        <div v-show="isShowEditMode"
            @dblclick="toEdit" 
            @contextmenu.prevent="toEdit" 
            class="form-item-wrap"
            :style="{cursor : (fieldOptions.allowEdit !== undefined && fieldOptions.allowEdit !== fieldOptions.index ? 'not-allowed' : 'default')}"
        >
            {{this.titleValue || '-'}}
        </div>
        <a-select v-show="!isShowEditMode"
            :size="fieldOptions.size ? fieldOptions.size : 'default'"
            v-decorator="[
                fieldOptions.fieldName,
                { 
                    initialValue: fieldOptions.defaultValue,
                    validateTrigger: [ fieldOptions.validateTrigger || 'blur'],
                    rules: rules
                }
            ]"
            :mode="fieldOptions.mode"
            :showArrow="true"
            :title="titleValue"
            :disabled="fieldOptions.disabled"
            :placeholder="fieldOptions.placeholder"
            :dropdownClassName="fieldOptions.dropdownClassName || 'dropdownClassName-default' "
            :maxTagTextLength="fieldOptions.maxTagTextLength || 10"
            @select="onSelect"
            @change="onChange"
            @blur="blur"
            @focus="focus"
            @mouseleave="mouseleave"
            @mouseenter="mouseenter"
        >
            <a-select-option v-for="item in options"
                :key="fieldOptions.itemIsSimple ? item : item[fieldOptions.idProperty || 'id']"
                :value="fieldOptions.itemIsSimple ? item : item[fieldOptions.valueProperty || 'id']"
                class="select-option-list"
                >
                <!-- <img class="select-option-img" v-if="fieldOptions.imgProperty" :src="item[fieldOptions.imgProperty]"/> -->
                <span class="select-option-img" v-if="fieldOptions.imgProperty" :style="getImgStyle(item)"></span>
                <span v-if="!fieldOptions.itemIsSimple" class="select-option-default custome-header-gender-option">
                    {{item[fieldOptions.textProperty || 'name']}}
                </span>
                <span v-else class="select-option-default custome-header-gender-option">
                    {{item}}
                </span>
            </a-select-option>
      </a-select>
    </a-tooltip>
      <a-tooltip :placement="getPlacement()" 
                :title="getTooltipTitle()"
                trigger="hover"
                v-show="isTooltipShow()"
                class="component-in-help">
            <a-icon type="question-circle" />
        </a-tooltip>
    </a-form-item>
</div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import { api_getSelectListByUrl } from 'api/form';
import {fileTypes} from 'consts/file-types.js'
import {switchEdit} from 'components/switchEditJs/swithEdit'
export default {
    mixins: [switchEdit] ,
    name: 'y-form-item-select',
    mounted() {
        this.setFieldsValue({status: 1});
        //
        this.D("mounted",this.fieldOptions.stopInitFetch);

        if(this.initData){
            this.getData();
        }
        if(!this.fieldOptions.stopInitFetch){
            this.getData();
        }
        this.getRules();


    },
    data() {
        return {
            options: [],
            rules: [],
            value:'',
            isToggle:false,
            isFocus:false,
            time:0
        }
    },
    computed: {
        ...mapState(['cacheState','editState']),
        total() {
            return this.fieldOptions.total || 5;
        },
        isShowEditMode() {
            if(this.fieldOptions.canSwitchToView && !this.isToggle) {
                return true;
            }
            return false;
        },
    },
    props: {
        fieldOptions: Object,
        initData:Boolean
    },
    watch:{
        fieldOptions:{
            handler(newVal,oldVal){
                this.time ++;
                if(this.time==1 && newVal.addStatus == true && this.fieldOptions.allowEdit == this.fieldOptions.index){
                    this.isToggle = true;
                    // this.isFocus = true;
                }
            },
            deep:true
        }
    },
    methods: {
        ...mapMutations(['updateSelectCache','updateEditStatus']),
        setFieldsValue(){
            //
        },
        toEdit(){
            if(this.fieldOptions.allowEdit !== undefined && this.fieldOptions.allowEdit !== this.fieldOptions.index){
                this.isToggle = false;
            }else if(this.fieldOptions.canSwitchToView){
                this.isToggle = true;
                // this.isFocus = true;
            }
        },
        blur(){
            this.isToggle = false;
            this.isFocus = false;
        },
        focus(){
            this.isFocus = true;
        },
        mouseleave(){
            if(this.fieldOptions.canSwitchToView){
                
                    let that = this;
                    const toggle = function (){
                        if(!this.isFocus && that.editState.editStatus == that.fieldOptions.fieldName){
                            that.isToggle = false;
                        }
                        document.removeEventListener("click",toggle,false)
                    }
                    document.addEventListener("click",toggle,false)
                   
            }
        },
        mouseenter(){
            if(this.fieldOptions.canSwitchToView){
                this.editState.editStatus = this.fieldOptions.fieldName;
            }
        },
        async getData(queryObj = {}){
            let options = await this.getData1(queryObj)
            if(this.fieldOptions.isFilterData){
                if(this.fieldOptions.filterId){

                    let id = this.fieldOptions.filterId
                    this.options = options.filter((item) => {
                        return item.id !== id
                    })
                }
            }
            this.UpdateTitleValue();
            // 展示态的targetItem 在这里find
        },
        async getData1(queryObj = {}) {
            let data = '';
            if(this.fieldOptions.url) {
                //如果有url
                if(this.fieldOptions.cache!==undefined && this.fieldOptions.cache==false) {
                    data = await this.getDataByUrl(this.fieldOptions.apiHttpPrefix , queryObj);
                    if(this.fieldOptions.innerkey){
                        if(data){
                            data = data[this.fieldOptions.innerkey]
                        }
                    }
                }else {
                    let cacheUrl = this.fieldOptions.url + (this.fieldOptions.typeValue || '');
                    data = this.cacheState.selectCache[cacheUrl];
                    data = await this.getDataByUrl(this.fieldOptions.apiHttpPrefix , queryObj);
                    if(this.fieldOptions.innerkey){
                        if(data){
                            data = data[this.fieldOptions.innerkey]
                        }
                    }
                    this.updateSelectCache({
                        url: cacheUrl,
                        data: data
                    });
                }
                if(this.fieldOptions.urlDataAppendTotal === undefined
                    || this.fieldOptions.urlDataAppendTotal == true) {
                    data.unshift({
                        [this.fieldOptions.textProperty]: '全部',
                        [this.fieldOptions.valueProperty]: ''
                    });
                }
                if(this.fieldOptions.extraField) {
                    data.unshift({
                        [this.fieldOptions.textProperty]: this.fieldOptions.extraField,
                        [this.fieldOptions.valueProperty]: ''
                    });
                }
                // if(this.fieldOptions.filterData && this.fieldOptions.filterItem){
                //     let selectFilter = this.fieldOptions.filterData
                //     let filterItem = this.fieldOptions.filterItem
                //     this.options = selectFilter(filterItem,this.options)
                // }
                this.options = data;
            }else {
                this.options = this.fieldOptions.options;
            }
            //console.log('this.options', JSON.stringify(this.options));
            //console.log('fieldOptions.defaultValue', this.fieldOptions.defaultValue)
            //if(this.fieldOptions.defaultValue=='') {
                //console.log('将来,这里的实现是需要修改的...')
                //this.titleValue = '全部';
            //}
            this.$emit('dataed');//得到了数据
            return this.options
        },
        async getDataByUrl(apiHttpPrefix , queryObj) {
            // queryObj 是一个对象 如 dynamicQuerypar:{carId:'xxx'}
            let that = this;
            let data = {
                randomer:Math.random(1),
                [this.fieldOptions.typeProperty || 'type']: this.fieldOptions.typeValue || '', //目前没用上
                [this.fieldOptions.pageFile || 'pageSize']: this.fieldOptions.pageSize
            }
            // this.fieldOptions.typeValue 有可能是动态的
            if(that.fieldOptions.hasDynamicQuerypar){
                data = Object.assign(data,queryObj)
            }
            let res = await api_getSelectListByUrl({
                url: that.fieldOptions.url,
                data: data
            },apiHttpPrefix);
            if(that.fieldOptions.withItems) {
                return res.items
            }
            return res;
            // return {outsideBodyColor:['c1','c2','c3','c4','c5',]};
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
        onSelect(e){
            if(e=='') {
                //this.titleValue = '全部';
                //console.log(e);
            }else {
                //this.titleValue = e;
                
                var o = this.getSelectItemByKey(e);
                if(o != null)
                    this.titleValue = o[this.fieldOptions.textProperty];
                else
                    console.log('onSelect---------查找到的o为空，无法给titleValue赋值');
                //this.titleValue = e.label;
                console.log('onSelect.e = ' + e + ' ' + this.titleValue);
            }
            this.$emit('select',e);
        },
        onChange(e) {
            if(e != null){
                var o = this.getSelectItemByKey(e);
            
                console.log(o);
            }
            this.$emit('change',e);
            this.$emit('change2',e,this.fieldOptions.fieldName);
        },
        getFieldName(){
            if(this.fieldOptions.fieldName == 'status')
                return 'customerStatus';
            return this.fieldOptions.fieldName;
        },
        getSelectItemByKey(selectkey){
            this.D(this.getFieldName() + '  getSelectItemByKey--------------' + selectkey);
            let o = this.options.filter((item) => {
                                    console.log(item);
                                    return item[this.fieldOptions.valueProperty] == selectkey
                                });
            this.D('[getSelectItemByKey] 0.length = ' + o.length,o);
            if(o.length > 0)
                return o[0];
            return null;
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
        getTipsTitle() {
            if(this.fieldOptions.tips) {
                return this.fieldOptions.tips.tipsTitle;
            }
            // if(this.fieldOptions.mode === 'tags'){
            //     if(this.value.length){
            //         return this.value.join(',');
            //     }else{
            //         return '--';
            //     }
            // }
            return '';
        },
        getTipsPlacement() {
            if(this.fieldOptions.tips) {
                return this.fieldOptions.tips.tipsPlacement;
            }
            return 'bottomLeft';
        },
        getClass() {
            let result = []
            if(this.fieldOptions.tooltip) {
                result.push('component-input-with-help');
            }
            if(this.canSwitchToView) {
                if(this.mode == 'view') {
                    result.push('component-view')
                    //result.push('display:none;');
                }else {
                    result.push('component-edit')
                }
            }
            return result;
        },
        getImgStyle(item){
            let url = item[this.fieldOptions.imgProperty]
            return {
                position: 'relative',
                top: '3px',
                display: 'inline-block',
                backgroundImage:'url('+url+')',
                backgroundRepeat:'no-repeat',
                backgroundPosition:'0 0',
                backgroundSize:'cover'
            }
        }
    }
}
</script>
<style lang="less">
    
    .component-edit{

    }
    .component-view{
        .ant-select-selection{
            border-bottom: 0;
        }
        .ant-select-arrow{
            display: none;
        }
        .ant-select-selection__rendered{
            
        }
    }

.select-option-img{
    width: 18px;
    height: 18px;
    margin-right: 10px;
}
.component-input-with-help{
    svg{
        color:#1890ff;
    }
    .ant-select{
        svg{
            color:#849CC0;
        }
    }
}

.dropdownClassName-default{
    font-size: 14px;
}
</style>


