<template>
    <a-form-item 
        :label="fieldOptions.label" 
        :label-col="fieldOptions.labelCol" 
        :wrapper-col="fieldOptions.wrapperCol"
    >
        <inner-label-query
            v-decorator="[
                fieldOptions.fieldName,
                { 
                    initialValue: fieldOptions.defaultValue,
                    rules: rules
                }
            ]"
            :list="list"
            :label="fieldOptions.tagLabel"
            :disabled="fieldOptions.disabled"
            :fixedWidth="fieldOptions.fixedWidth || 0"
            :fieldOptions="fieldOptions"
            @change="onChange"
        >
        </inner-label-query>
    </a-form-item>
</template>
<script>
import innerLabelQuery from './inner-label-query';
import { api_fetchWithUrl } from 'api/table';
import transFormData from 'utils/transcolors';
export default {
    name: 'y-label-query',
    created() {
        this.getRules();
        // this.getData();
    },
    data() {
        return {
            rules: [],
            list: []
        }
    },
    props: {
        fieldOptions: Object,
    },
    components: {
        innerLabelQuery
    },
    methods: {
        query(queryParam) {
            this.getData(queryParam);
        },
        async getData(queryParam) {
            let data = '';
            data = await api_fetchWithUrl({
                url: '/tms/system/tag/getTenantTagList',
                data: queryParam
                // data: {
                //     tenant_id: '100002',
                //     resource_scope: 2
                // }
            });
            // data = [
            //     {
            //         "tagCode": "0",
            //         "tagName": "置换",
            //         "tagIconTone": "1"
            //     },
            //     {
            //         "tagCode": "1",
            //         "tagName": "潜客",
            //         "tagIconTone": "2"
            //     },
            //     {
            //         "tagCode": "2",
            //         "tagName": "潜转续",
            //         "tagIconTone": "3"
            //     },
            //     {
            //         "tagCode": "10",
            //         "tagName": "1置换",
            //         "tagIconTone": "1"
            //     },
            //     {
            //         "tagCode": "11",
            //         "tagName": "1潜客",
            //         "tagIconTone": "2"
            //     },
            //     {
            //         "tagCode": "12",
            //         "tagName": "1潜转续",
            //         "tagIconTone": "3"
            //     },
            //     {
            //         "tagCode": "20",
            //         "tagName": "2置换",
            //         "tagIconTone": "1"
            //     },
            //     {
            //         "tagCode": "21",
            //         "tagName": "2潜客",
            //         "tagIconTone": "2"
            //     },
            //     {
            //         "tagCode": "22",
            //         "tagName": "2潜转续",
            //         "tagIconTone": "3"
            //     },
            //     {
            //         "tagCode": "30",
            //         "tagName": "3置换",
            //         "tagIconTone": "1"
            //     },
            //     {
            //         "tagCode": "31",
            //         "tagName": "3潜客",
            //         "tagIconTone": "2"
            //     },
            //     {
            //         "tagCode": "32",
            //         "tagName": "3潜转续",
            //         "tagIconTone": "3"
            //     },
            //     {
            //         "tagCode": "40",
            //         "tagName": "4置换",
            //         "tagIconTone": "1"
            //     },
            //     {
            //         "tagCode": "41",
            //         "tagName": "4潜客",
            //         "tagIconTone": "2"
            //     },
            //     {
            //         "tagCode": "42",
            //         "tagName": "4潜转续",
            //         "tagIconTone": "3"
            //     },
            // ]
            this.addPreTotalWidth(data);
            // this.transFormData(data)
            transFormData(data)
            this.list = data;
        },
        addPreTotalWidth(data) {
            if(data.length) {
                for(let i = 0, j = data.length; i < j; i++) {
                    if(i == 0) {
                        data[i].preTotalWidth = data[i].tagName.length * 12 + 24 + 8;
                    }else {
                        data[i].preTotalWidth = data[i - 1].preTotalWidth + data[i].tagName.length * 12 + 24 + 8;
                    }
                }
            }
        },
        // transFormData(data){
        //     data.forEach(function(n,i){
        //         n.oldVal = n.tagIconTone // 80ffff ec808c facd91 ffff80 c280ff 80d3f8 7f7f7f 8080ff
        //         switch(n.tagIconTone){
        //             case '#80ffff':
        //                 n.tagIconTone = '1'
        //                 break;
        //             case '#ec808c':
        //                 n.tagIconTone = '2'
        //                 break;
        //             case '#facd91':
        //                 n.tagIconTone = '3'
        //                 break;
        //             case '#ffff80':
        //                 n.tagIconTone = '4'
        //                 break;
        //             case '#c280ff':
        //                 n.tagIconTone = '5'
        //                 break;
        //             case '#80d3f8':
        //                 n.tagIconTone = '6'
        //                 break;
        //             case '#7f7f7f':
        //                 n.tagIconTone = '7'
        //                 break;
        //             case '#8080ff':
        //                 n.tagIconTone = '8'
        //                 break;
        //             default:
        //                 n.tagIconTone = '1'
        //                 console.log("tagIconTone返回值有误!")
        //                 break;
        //         }
        //     })
        // },
        onChange(val) {
            //console.log('val', val)
            this.$emit('change', val)
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


