<template>
    <div class="y-table">
        <div class="y-table-btns" style="display:none;">
            <div style="position:relative;">
                <a-button-group>
                    <a-button icon="sync"></a-button>
                    <a-button icon="bars" :class="{'clicked-color': !tableType}" @click="()=>{tableType = !tableType;}"></a-button>
                    <a-button icon="schedule"
                        :class="{'clicked-color': columnListShow}"
                        @click="() => {columnListShow = !columnListShow}"></a-button>
                </a-button-group>
                <y-table-column-list
                    v-show="columnListShow"
                    :columns="JSON.parse(JSON.stringify(columns))"
                    @change="columnsChange"></y-table-column-list>
            </div>
        </div>
        <div class="y-table-content">
            <y-table-card
                ref="yTableCard"
                style="display:none;"
                class="table1"
                v-show="!tableType"
                :height="computedHeight"
                :options="options"
                :columns="columns2"
                :rowKey="rowKey"
                :sourceColumns="columns"
                :dataSource="dataSource"
                :optionSlotName="optionSlotName"
                :pagination="resultPagination"
                >
            </y-table-card>
            <y-table-list
                ref="yTableList"
                :height="computedHeight"
                :options="options"
                :collect="collect"
                :columns="columns1"
                :rowKey="rowKey"
                :isTree="isTree"
                :noRowStatus="noRowStatus"
                :customRow="customRow"
                :defaultExpandAllRows="defaultExpandAllRows"
                :statusProperty="statusProperty"
                :sourceColumns="columns"
                :dataSource="dataSource"
                :pagination="resultPagination"
                :loading = "loading"
                @change="handleTableChange"
                :rowSelection="rowSelection"
                :rowClassProperty="rowClassProperty"
                :scroll="scrollInner">
            </y-table-list>
        </div>

    </div>

</template>
<script>
import { mapState } from 'vuex';
import { api_fetchWithUrl } from 'api/table';
import { yc_uuid, yc_deepCopy } from 'utils/index';
import yTableColumnList from './column-list';
import yTableList from './y-table-list';
import yTableCard from './y-table-card';
export default {
    name: 'y-table',
    created() {
        if(this.autoLoad) {
            this.getData();
        }
    },
    mounted() {
        this.computedScroll();
    },
    data() {
        let that = this;
        return {
            loading:true,
            scrollInner: {},
            height: 300,//固定高度,超过出滚动条,不超过则填充空白
            queryObjInner: {
                param: {}
            }, //查询条件
            tableType: true,//true为table1,false为table2
            columnListShow: false,
 
            dataSource: [],
            //columns: [], //这是完整的columns信息
            columns1: [], //这是表格1使用的根据hidden而截取的不全的columns信息
            columns2: [], //这是表格2使用的仅仅保留columns第一条记录的信息

            paginationInner: {
                current: 1,
                pageSize: 15,
                defaultPageSize: 15,
                showSizeChanger: true,
                pageSizeOptions: ['15', '30', '45'],
                size: "big",
                showTotal(total) {
                    return `共 ${total} 条`;
                },
                total: 0,
                onChange(page, size) {
                    //console.log(page, size);
                    that.resultPagination.current = page;
                    that.resultPagination.pageSize = size;
                    that.getData();
                },
                onShowSizeChange(current, size) {
                    //console.log(current, size);
                    that.resultPagination.current = current;
                    that.resultPagination.pageSize = size;
                    that.getData();
                }
            }
        }
    },
    props: {
        rowClassProperty: {
            //指定接口返回的字段值作为行class
            type: String,
            default() {
                return ''
            }
        },
        autoLoad: {
            type: Boolean,
            default() {
                return true;
            }
        },
        isTree: {
            type: Boolean,
            default() {
                return false;
            }
        },
        noRowStatus: {
            type: Boolean,
            default() {
                return false;
            }
        },
        customRow: {
            type: Function
        },
        defaultExpandAllRows: {
            type: Boolean,
            default() {
                return true;
            }
        },
        rowKey: {
            type: String,
            default() {
                return 'id';
            }
        },
        pagination: {
            type: Object,
            default() {
                return null;
            }
        },
        options: {
            type: Object,
            default() {
                return {};
            }
        },
        collect: {
            type: Object,
            default() {
                return {};
            }
        },
        optionsTdWidth: {
            type: Number,
            default() {
                return 200;
            }
        },
        scroll: {
            type: Object,
            default() {
                return {}
            }
        },
        columns: Array, //
        url: String,//查询url
        statusProperty: {  //指定代表是否启用状态的属性名
            type: String,
            default() {
                return 'status';
            }
        },
        resultHasItems: {
            type: Boolean,
            default() {
                return true;
            }
        },
        queryObj: {
            type: Object,
            default() {
                return {param:{}}
            }
        },
        rowSelection:Object,
        apiHttpPrefix:{
            type:String,
        }
    },
    watch: {
        'globalState.screenWidth'(val) {
            this.computedScroll();
        }
    },
    computed: {
        ...mapState(['globalState']),
        resultPagination() {
            if(this.pagination == null) {
                return false;
            }else {
                return Object.assign(this.paginationInner, this.pagination);
            }
        },
        // computedScroll() {
        //     //传进来的高度是用户期望的总高度,但是传给table的不含头高度(44)和分页高度(64),所以这里要进行一下处理
        //     // let result = Object.assign({}, this.scroll);
        //     // let innerHeight = 64 + 44;//表头,分页的高度
        //     // if(this.scroll.yShow && this.scroll.yShow) {
        //     //     if(this.scroll.height) {
        //     //         result.y = this.scroll.height - innerHeight;
        //     //     }else {
        //     //         result.y = this.height - innerHeight;
        //     //     }
        //     // }
        //     // console.log('this.scroll',this.scroll)
        //     // if(this.scroll.height) {
        //     //     this.scroll.height = this.scroll.height - innerHeight;
        //     // }
            
        //     // if(this.scroll.width) {
        //     //     result.x = this.scroll.width;
        //     // }
        //     // return result;
        //     return this.scroll;
        // },
    },
    components: {
        yTableColumnList,
        yTableCard,
        yTableList
    },
    methods: {
        query(queryObj = {}) {
            //console.log('该接口提供给外部使用...',queryObj);
            this.getData(queryObj);
        },
        async getData(queryObj = {param:{}}) {
            this.loading = true;
            let that = this;
            //console.log(111222, this.columns)
            let columns = this.wrapperColumns(this.columns);
            // if(this.options.length) {
            //     columns.push(this.optionConfig);
            // }
            this.computedColumns(columns);

            let pageQueryInfo = {
                "pageIndex": that.resultPagination.current,
                "pageSize": that.resultPagination.pageSize,
                
            };
            let param = Object.assign(this.queryObjInner.param, this.queryObj.param, queryObj.param)
            this.queryObjInner = Object.assign(this.queryObjInner, this.queryObj, pageQueryInfo, queryObj);
            this.queryObjInner.param = param
            //console.log('this.queryObjInner', this.queryObjInner);
            let msg = await api_fetchWithUrl({
                url: that.url,
                data: that.queryObjInner
            },that.apiHttpPrefix);
            //console.log('ms123g', msg);
            if(this.resultHasItems) {
                this.dataSource = msg.items;
            }else {
                this.dataSource = msg;
            }
            
            if(this.resultPagination) {
                this.resultPagination.total = msg.total;
            }
            this.loading = false;
            this.$emit('success', this.dataSource.length);//查询成功事件
        },
        computedColumns(columns) {
            //计算columns, columns1,columns2
            //console.log('columns-----1', columns);
            this.columns = columns;
            this.columns1 = this.wrapperColumns1(yc_deepCopy(columns));
            //console.log('columns1', this.columns1);
            this.columns2 = this.wrapperColumns2(yc_deepCopy(columns));
        },
        wrapperColumns(columns) {
            columns.forEach(column => {
                column.scopedSlots = {
                    customRender: column.dataIndex
                }
            });
            return columns;
        },
        wrapperColumns1(columns) {
            //去掉所有的hidden值为真的列
            return columns.filter(item => {
                return item.hidden != true;
            });
        },
        wrapperColumns2(columns) {
            //对于第二种视图来说,只保留一条column
            let result = [];
            delete columns[0].width;//不管有没有width都去掉
            delete columns[0].fixed;//不管有没有fixed都去掉
            result.push(columns[0]);
            let optionConfig = columns.find(item => {
                if(item.scopedSlots && item.scopedSlots.customRender) {
                    return item.scopedSlots.customRender == 'operation';
                }
            });
            if(optionConfig) {
                delete optionConfig.fixed;//不管有没有fixed都去掉
                result.push(optionConfig);
            }
            return result;
        },
        columnsChange(changedColumns) {
            this.computedColumns(changedColumns);
        },
        handleTableChange(pagination, filters, sorter) {
            //console.log('sorter', sorter);
            let order = '';
            if(sorter.order == 'ascend') {
                order = 'asc';
            }else if(sorter.order == 'descend'){
                order = 'desc';
            }
            if(sorter.field == "tagVisualAngleLabel"){
                sorter.field = 'tagVisualAngle'
            }
            this.getData({
                "sortField": sorter.field,
                "sort": order
            });
        },

        computedScroll() {
            /**
             * 外界指定一临界宽度值,当所在父元素宽度小于该值时显示横向滚动条,否则不显示滚动条
             */
            //this.scroll.width意思是表面占用的宽度
            //this.scroll.contentWidth意思是表格内部实际的宽度(尤其指含有滚动条的情况)
            let parentWidth = $(this.$el).parent().width();
            //console.log('parentWidth', parentWidth)
            let scrollWidth = this.scroll.width || 1024;
            let x = this.scroll.contentWidth || scrollWidth;
            if(parentWidth >= scrollWidth) {
                //不显示滚动条
                this.scrollInner = {};
            }else {
                //显示滚动条
                this.scrollInner = {
                    x: x
                }
            }
            //this.scrollInner = {};
        }
    }
}
</script>
<style lang="less">
.y-table{
    background: #ffffff;
    padding:0 8px;
   .y-table-btns{
       margin-bottom: 10px;
       display: flex;
       justify-content: flex-end;
   }
   .y-table-content{
       position: relative;
   }
   .table1{
       position: absolute;
       top: 0;
       left: 0;
       width: 100%;
       height: 100%;
       z-index: 5;
   }
}
</style>
