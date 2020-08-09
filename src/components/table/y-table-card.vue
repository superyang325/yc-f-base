<template>
    <a-table 
        class="y-table-card"
        :bordered="false"
        :showHeader="false"
        style="word-break: break-all;"
        :columns="columns" 
        :dataSource="dataSource" 
        :scroll="{y: height2, x: 500}"
        :pagination="pagination"
        :rowKey="rowKey"
        size="middle">
        <template v-for="column in columns" :slot="column.dataIndex" slot-scope="text, record">
            <div :key="column.dataIndex" class="y-table-td-div" v-html="getHtml2(text, record)"></div>
        </template>

        <template v-if="options.length" :slot="optionSlotName" slot-scope="text,record">
            <div class="y-table-option-td-div">
                <a-button-group >
                    <a-button v-for="item in options" class="operation-td"
                        :key="item.key"
                        :type="item.type"
                        @click="item.onClick(text, record)">{{item.text}}</a-button>
                </a-button-group>
            </div>
        </template>
    </a-table>
</template>
<script>
export default {
    created() {
        //console.log(this.columns);
        this.height2 = this.height - 0 + 47;
    },
    mounted() {
        $('.y-table-card').find('.ant-table-body').height(this.height2);
    },
    props: {
        pagination: Object,
        options: Object,
        height: {
            type: Number, //固定高度,超过出滚动条,不超过则填充空白
            default() {
                return 300;//默认高度回头调
            }
        },
        dataSource: Array,
        columns: Array,
        sourceColumns: Array,
        optionSlotName: String,
        rowKey: String,
    },
    methods: {
        getHtml2(text, record) {
            /**
             * this.columns1是视图1采用的列配置象,比较全,视图2在渲染具体每一行时可以此配置为准
             * this.columns2则是仅仅截取,只取this.columns1中的第一条记录,并删除width及fixed属性
             */
            //console.log(this.columns1);
            //console.log('record11',record)
            let trs = this.getTrs(this.sourceColumns, record);
            let table = `<table>
                ${trs}
            </table>`;
            return table;
        },
        getTrs(columns, record) {
            let html = '';
            columns.forEach(item => {
                if(item.hidden || item.inner) {
                    return;
                }
                html += `<tr class="class="y-table-card-row">
                    <td class="y-table-card-td1">${item.title}</td>
                    <td class="y-table-card-td2">${record[item.dataIndex]}</td>
                </tr>`;
            });
            return html;
        },
    }
}
</script>
<style lang="less">
.y-table-card-td1{
    padding-left: 40px;
    color: #3C5484;
    font-size: 12px;
    font-weight: 600;
    width: 220px;
}
.y-table-card-td2{
    color: #3C5484;
    font-size: 12px;
    font-weight: 400;
    padding: 4px 0;
}
.y-table-card{
    .ant-table-fixed{
        .ant-table-row-level-0 > td{
            vertical-align: bottom;
            text-align: right;
        }
    }
}
</style>
