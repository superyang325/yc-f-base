<template>
<div>
     <a-tree
        checkable
        :treeData="treeData"
        @check="onCheck"
        v-model="checkedKeys"
        :disabled="disabled"
    >
    </a-tree>
    <div style="display:none">{{test}}</div>
</div>
</template>
<script>
import { api_getTree } from 'api/tree';
export default {
    props: {
        treeData: {
            type:Array,
            default:[]
        },
        checkedArr:Array,
        disabled:Boolean
    },
    data(){
        return {
            arr:[]
        }
    },
    watch:{
        checkedArr(val){
            this.checkedKeys = val;
        },
        treeData:{
            handler(val){
                if(this.treeData[0].id != 'yiduanid'){
                     this.treeData.unshift({id:'yiduanid',title:'123'});
                }
                this.$nextTick(() =>{
                    console.log(document.querySelector(".ant-tree-treenode-switcher-close"))
                    if(document.querySelector(".ant-tree-treenode-switcher-close")){
                        document.querySelector(".ant-tree-treenode-switcher-close").style.display="none"
                    }
                })
                val.forEach(item =>{
                    let res = this.deepTravel(item,[]);
                    this.arr.push(...res);
                })
            },
            deep:true
        }
    },
    computed:{
        test(){
            if(this.treeData[0] && this.checkedArr[0]){
                this.$nextTick(() =>{
                    document.querySelector(".ant-tree-checkbox-inner").click();
                    setTimeout(() =>{
                        document.querySelector(".ant-tree-checkbox-inner").click();
                    })
                })
                return 123
            }
        }
    },
    methods: {
        onCheck(checkedKeys, e) {
            let array = [...this.checkedKeys,...e.halfCheckedKeys];
            let res = [];
            array.forEach(item =>{
                for(let key=0;key<this.arr.length;key++){
                    if(item == this.arr[key].gid){
                        res.push(this.arr[key]);
                        return;
                    }
                }
            })
            this.$emit('change', res);
        },
        deepTravel(obj,arr){
            arr.push({id:obj.id,label:obj.label,field:obj.field,num:obj.num,allow:obj.allow,gid:obj.gid,oldId:obj.oldId,key:obj.key,title:obj.title});
            let child = obj.children || 0;
            for(let a=0;a<child.length;a++){
                this.deepTravel(child[a],arr);
            }
            return arr;
        }
    }
}
</script>
<style lang="less">
</style>


