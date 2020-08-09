<template>
    <a-form-item 
        :label="fieldOptions.label" 
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
            :loadData="loadData"
            changeOnSelect
            :placeholder="fieldOptions.placeholder || ''"
            @change="onChange"
        >
        </a-cascader>
    </a-form-item>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import { api_listDealerSerial, api_listSerialCar } from 'api/region';
export default {
    name: 'y-chose-car',
    created() {
        console.log('here....')
        if(this.initData){
            this.getAllData();
        }else{
            this.getData();
        }
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
        fieldOptions: {
            type: Object,
            default() {
                return {}
            }
        },
        initData:Boolean
    },
    watch:{
        'fieldOptions.defaultValue'(newVal){
            this.getAllData();
        }
    },
    computed: {
        ...mapState(['cacheState'])
    },
    methods: {
        ...mapMutations(['updateRegionCache']),
        hidePop(){
            this.fieldOptions.popupVisible = false
        },
        onChange(e) {
            console.log('ychosecar::'+e)
            this.$emit('change', e)
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
            let res = [];
            res = await api_listDealerSerial({data: {
                //currentUser:{tenantId:1,userId:1,dealerId:50002218}
                otherPar:Math.random()
            }});
            //console.log('res',res)
            if(res.length) {
                res.forEach(item => {
                    item.label = item.serialName;
                    item.value = item.serialId;
                    item.isLeaf = false;
                })
            }
            this.options = res;
        },
        async getAllData() {
            let res = [];
            res = await api_listDealerSerial({data: {
                //currentUser:{tenantId:1,userId:1,dealerId:50002218}
                otherPar:Math.random()
            }});
            if(res.length) {
                res.forEach(item => {
                    item.label = item.serialName;
                    item.value = item.serialId;
                    item.isLeaf = false;
                })
            }
            this.getAllChild(res).then(() =>{
                this.options = res;
            })
        },
        async getAllChild(arr){
            for(let key in arr){
                if(arr[key].value == this.fieldOptions.defaultValue[0]){
                    let children = await api_listSerialCar({data: {
                        otherPar:Math.random(),
                        "serialId": arr[key].value,
                        "serialName": arr[key].label
                    }})
                    if(children.length) {
                        children.forEach(item => {
                            item.label = item.carName;
                            item.value = item.carId;
                        })
                    }
                    arr[key].children = children;
                }
            }
        },
        async loadData(selectedOptions) {
            const targetOption = selectedOptions[selectedOptions.length - 1];
            targetOption.loading = true;
            console.log('targetOption', targetOption)
            let res = await api_listSerialCar({data: {
                "serialId": targetOption.serialId,
                "serialName": targetOption.serialName
            }});
            targetOption.loading = false;
            if(res.length) {
                res.forEach(item => {
                    item.label = item.carName;
                    item.value = item.carId;
                    item.isLeaf = true;
                })
                targetOption.children = res;
            }
            this.options = [...this.options];
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


