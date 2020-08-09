<template>
    <ul class="y-table-column-list">
        <li v-for="item in showColumns" 
            class="y-table-column-list-li"
            :key="item.dataIndex">
            <a-checkbox 
                :defaultChecked="!item.hidden"
                :disabled="item.disable" 
                @change="onColChange(item, $event)">{{item.title}}</a-checkbox>
        </li>
    </ul>
</template>
<script>
export default {
    props: {
        columns: {
            type: Array
        }
    },
    computed: {
        showColumns() {
            //这里应该把操作这项去掉
            return this.columns.filter(item => {
                return item.inner != true;
            });
        }
    },
    methods: {
        onColChange(column,e) {
            column.hidden = !e.target.checked;
            this.$emit('change', JSON.parse(JSON.stringify(this.columns)));
        },
    }
}
</script>
<style lang="less">
.y-table-column-list{
    background: #ffffff;
    box-shadow:0px 0px 8px 0px rgba(120,144,180,0.2);
    position: absolute;
    top: 40px;
    right: 0;
    z-index: 100;
}
.y-table-column-list-li{
    padding: 9px 16px;
    color: #3C5484;
    font-size: 12px;
    font-weight: 400;
}
</style>


