<template>
    <div class="add-label">
        <div class="ico"></div>
        <label class="txt ">标签</label>
        <inner-label
            :list="value"
            :label="fieldOptions.label"
            :remove="true"
            :clickAddActive="false"
            :fixedWidth="fieldOptions.fixedWidth || 0"
            @change="onChange"
            @remove="onRemove"
        >
        </inner-label>
        <a-popover trigger="click" v-model="visible" :getPopupContainer="(e) => e.parentNode" overlayClassName="pop-add-label">
            <template slot="content" class="pop-label">
                <inner-label
                    :list="filterList"
                    :label="fieldOptions.label"
                    :remove="fieldOptions.remove"
                    :clickAddActive="false"
                    :fixedWidth="fieldOptions.fixedWidth || 0"
                    @click="onClick"
                >
                </inner-label>
            </template>
            <div 
                class="img-class"
                v-if="filterList.length"
                @click="show()">
            </div>
        </a-popover>
    </div>
    
</template>
<script>
import { mapGetters } from 'vuex';
import innerLabel from './inner-label';
// import { api_getBusinessesTags } from 'api/region';
import { api_fetchWithUrl } from 'api/table';
import transFormData from 'utils/transcolors';

export default {
    created() {
        //通过后端接口获得
        let userIdentity = Vue.cookie.get('userIdentity')
        let query = {
            randomer:Math.random(1),
            tagGroupCode:'shangji_shuxing',
            tenantId:JSON.parse(userIdentity).tenantId,
        }
        this.getData(query);
    },
    data() {
        return {
            // data: transFormData(this.value), // [] 初始显示态，卡片页客户原有的标签(从defaultValue传来的值)或添加客户页defaultValue传的[]
            // data: this.value, //transFormData(), // [] 初始显示态，卡片页客户原有的标签(从defaultValue传来的值)或添加客户页defaultValue传的[]
            // data:客户有的标签
            // filterLsit:客户没有的标签 ， popover弹框里的标签
            list: [],
            visible: false,
        }
    },
    props: {
        value: Array,
        remove: Boolean,
        fieldOptions: Object,
    },
    computed: {
        filterList() {
            let that = this
            //根据list及data算出filterList
            let result = [];
            this.list.forEach(item => {
                let isInData = that.value.find(item2 => {
                    return item2.tagCode == item.tagCode;
                });
                if(!isInData) {
                    result.push(item);
                }
            });
            return result;
        },
        
    },
    components: {
        innerLabel
    },
    
    methods: {
        async getData(queryParam) {

            let list = await api_fetchWithUrl({
                url: '/tms/system/tag/getTenantTagListByGroupCode',
                data: queryParam
            });
            
            this.list = transFormData(list) // 标签库里的标签

            console.log('list::', list)
        },
        onClick(item) {
            this.value.push(item);
            this.visible = false;
            //console.log('item', item)
            console.log('list11', this.list)
            console.log('onClick::'+JSON.stringify(this.value))
            
            // let arr = this.value.map((item) => {
            //     return {
            //         tagCode : item.tagCode
            //     }
            // })
            
            console.log('list22', this.list)

            this.$emit('change',this.value);
        },
        onRemove(data){
            
            console.log('onRemove::'+JSON.stringify(data))
            // let arr = this.value.map((item) => {
            //     return {
            //         tagCode : item.tagCode
            //     }
            // })
            this.$emit('remove', data);
        },
        // onChange(data){
        //     this.$emit('change', this.data);
        // },
        show() {
            console.log('here...')
            this.visible = true;
        }
    }
}
</script>
<style lang="less">

.pop-add-label{
    width:244px;
    height:auto;
    .ant-popover-inner-content{
        padding:8px;
    }
}    
.add-label{
    display: flex;
    flex-direction: row;
    align-items: center;
    .ico{
        width: 20px;
        height: 20px;
        margin-right: 10px;
        background-image: url('./ico.png');
        background-position: 0 0;
        background-size: 20px auto;
    }
    .txt{
        color: #3366FF !important;
        /* margin-right: 40px; */
        width: 56px;
        display: inline-block;
    }
    .img-class{
        width: 24px;
        height: 24px;
        background-image: url('./icon.png');
        background-position: 0 0;
        background-size: 24px auto;
        cursor: pointer;
    }
    .label-item{
        margin-bottom: 2px;
        margin-top: 2px;
    }
}
.inner-label-query-items{
    margin-left: 12px;
}


</style>



