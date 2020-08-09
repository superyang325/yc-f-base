<template>
    <a-table 
        class="y-table-list"
        :class="getClass()"
        :bordered="false"
        style="word-break: break-all;"
        :columns="columns" 
        :dataSource="dataSource" 
        :scroll="scroll"
        :pagination="pagination"
        :rowKey="rowKey"
        :rowClassName="getRowClass"
        :customRow="customRow"
        :defaultExpandAllRows="defaultExpandAllRows"
        :loading=loading
        @change="handleTableChange"
        :rowSelection="rowSelection"
        size="middle">

        <!-- 收藏 表头自定义 -->
        <template v-if="collect.length" slot="customTitle"  >
            <a-tooltip :title="collect[0].tooltipTitle" placement="bottomLeft" destroyTooltipOnHide=true v-model="collect[0].visible">
                <span alt="" class="" style="vertical-align: middle;"
                    @click="collect[0].starOrder()"
                    v-html="collect[0].titleText()"
                 ></span>
            </a-tooltip>
        </template>

        <template v-for="column in columns" :slot="column.dataIndex" slot-scope="text, record">
                <a-tooltip 
                    :key="column.dataIndex" 
                    :trigger="column.trigger || 'hover'"
                    :getPopupContainer="getContainer"
                    :mouseEnterDelay="column.mouseEnterDelay || 0.5"
                    :placement="column.placement || 'bottomLeft'">
                    <div :key="column.dataIndex"
                        :class="getTdDivClass(column)"
                        :style="getStyle(column,text,record)"
                        v-if="!column.notUseVHtml"
                        v-html="getHtml(text, column, record)"></div>
                     <div :key="column.dataIndex"
                        :class="getTdDivClass(column)"
                        v-else
                        :style="getStyle(column)">{{text}}</div>
                    <span v-if="!column.notUseVHtml" slot="title" v-html="getTitle(text, column, record)"></span>
                    <span v-else slot="title" v-text="getTitle(text, column, record)"></span>
                </a-tooltip>
        </template>

        <!-- 收藏 列自定义 -->
        <template v-if="collect.length" slot="isFavorite" slot-scope="text,record">
            <template v-for="item in collect">
                <span
                    :key="item.key"
                    class="operation-td"
                    @click="item.onClick(text, record)"
                    v-html="item.text(text,record)"
                    >
                </span>
            </template>
        </template>

        <template v-if="options.length" slot="operation" slot-scope="text,record">
            <template v-for="item in options">
                <span v-if="!item.needPop"
                    :key="item.key"
                    v-show="isOptionShow(item,record)"
                    class="operation-td"
                    @click="item.onClick(text, record)"
                    v-html="item.text">
                    <!-- {{item.text}} -->
                </span>
                <a-popconfirm v-else
                    :title="item.needPop.title"
                    class="operation-td"
                    v-show="isOptionShow(item,record)"
                    :placement="item.needPop.placement || 'topRight'"
                    :ref="'popRef'+record.id"
                    @confirm="popConfirm(item, text, record)"
                    :key="item.key">
                    <a-icon slot="icon" :type="item.needPop.icon || 'exclamation-circle'" :style="{color: item.needPop.color || 'red'}" :theme="item.needPop.theme || 'outlined'" />
                    {{item.text}}
                </a-popconfirm>
            </template>
        </template>
    </a-table>
</template>
<script>
export default {
    mounted() {
        //$('.y-table-list').find('.ant-table-body').height(this.scroll.y);

    },
    props: {
        pagination: Object,
        options: Object,
        collect: Object,
        height: Number,
        dataSource: Array,
        columns: Array,
        sourceColumns: Array,
        scroll: Object,
        rowKey: String,
        statusProperty: String,
        isTree: Boolean,
        noRowStatus: Boolean,
        customRow: Function,
        defaultExpandAllRows: Boolean,
        loading: Boolean,
        rowClassProperty: String, //指定接口返回的字段值作为行class
        rowSelection:Object,
    },
    methods: {
        getHtml(text, column, record) {
            if(column.userRender !== undefined
                && typeof column.userRender == 'function') {
                return column.userRender(text, record)
            }else {
                // console.log('text', text)
                return text;
            }
        },
        // getCollectHtml(text, column, record) {
        //     return ''
        // },
        getTitle(text, column, record) {
            // console.log('column', column)
            if(column.userTitle !== undefined
                && typeof column.userTitle == 'function') {
                return column.userTitle(text, record)
            }else if(column.noTitle) {
                return '';
            }else {
                return text;
            }
        },
        getTdDivClass(column) {
            let result = ['y-table-td-div ellipsis'];
            if(column.lname) {
                result.push(column.lname)
            }
            return result;
        },
        getStyle(column,text,record) {
            let result = {};
            if(column.width) {
                result.width=column.textWidth+'px'
            }
            return result;
        },
        getRowClass(record, index) {
            //console.log('this.statusProperty', this.statusProperty)
            //console.log('record',record)
            let result = [];
            if(this.noRowStatus) {
                result = [];
            }
            if(record[this.statusProperty] == 1) {
                result.push('y-table-list-row');
            }else if(record[this.statusProperty] == 0){
                result.push('y-table-list-row y-table-list-row-disable');
            }
            if(this.rowClassProperty) {
                result.push('y-table-tr-' + record[this.rowClassProperty]);
            }

            //表格行背景色
            let lastFollowStatusTag = record.lastFollowStatusTag 
            if(lastFollowStatusTag){
                let tagCode = lastFollowStatusTag.tagCode
                let bgColorClass = 'y-table-list-row-color'+tagCode.slice(tagCode.length-1) 
                result.push(bgColorClass)
            }else{
                result.push('y-table-list-row-color5')
            }
            return result;
        },
        handleTableChange(pagination, filters, sorter) {
            this.$emit('change', pagination, filters, sorter)
        },
        getClass() {
            //console.log('this.isTree', this.isTree);
            let result = [];
            if(this.isTree) {
                result.push('is-tree');
            }
            return result;
        },
        popConfirm(item, text, record) {
            item.onConfirm(text, record, this.$refs['popRef'+record.id][0])
        },
        isOptionShow(item,record) {
            if(item.isShow && typeof item.isShow == 'function') {
                return item.isShow(record);
            }
            return true;
        },
        getContainer(e) {
            //console.log(e)
            return e.parentNode;
        }
    }
}
</script>
<style lang="less">
.y-table-list{
    .ant-table-body{
        table colgroup col{
            &:first-child{
                width: 16px !important;
                min-width: 16px !important;
            }
        }
    }
    .y-table-td-div{
        position: relative;
    }
    .operation-td{
        margin-right: 10px;
        color: #3366FF;
        cursor: pointer;
        display: inline-block;
        line-height: 16px;
        &:last-child{
            margin-right: 0;
        }
    }
    .ant-table-row{
       td{
           vertical-align: middle;
           padding: 12px 40px!important;
           font-size: 12px!important;
       }
       td:first-child{
           padding-left: 8px!important;
       }
   }
   .ant-table-thead{
       th{
           padding: 12px 40px!important;
           font-size: 12px!important;
           border-radius: 0 !important;
           > div {
               font-weight: bold;
           }
           
       }
       th:first-child{
           padding-left: 8px!important;
       }
   }
    // .y-table-list-row{
    //     > td{
    //         padding: 16px 40px!important;
    //         line-height: 16px;
    //         font-size: 12px;
    //     }
    // }
    // th {
    //     font-size: 12px;
    //     padding-left: 40px!important;
    //     padding-right: 40px!important;
    // }
    .y-table-list-row{
        color: #3C5484;
    }
    .y-table-list-row-disable{
        color: #849CC0;
    }
    .ant-tooltip-arrow{
        border-bottom-color:rgba(36,48,96,0.9);
    }
    .ant-tooltip-inner{
        padding:12px;
        background:rgba(36,48,96,0.9);
        box-shadow:0px 0px 8px 0px rgba(120,144,180,0.2);
        line-height: 16px;
        span{
            font-size: 12px;
            font-family: MicrosoftYaHei;
            color: rgba(255,255,255,1);
        }
    }
    .ant-spin-dot-spin{
        background: url('http://hbimg.b0.upaiyun.com/a39bac47afb919b7b92f21f80218bae9e128650fb396-o1BXWL_fw658');
        background-size: contain;
        background-repeat: no-repeat;
        width: 40px;
        height: 50px;
        animation:none;
        transform:none;
        i{
            display: none;
        }
    }
}
.is-tree{
    .y-table-td-div{
        display: inline-block;
    }
}
.ant-table-body{
    .ant-table-thead{
        tr{
            th{
                background-color:rgba(242,245,250,1);
                div{
                    font-size:12px;
                    font-family:MicrosoftYaHei-Bold,MicrosoftYaHei;
                    font-weight:bold;
                    color:rgba(60,84,132,1);
                }
            }
        }
    }
}
</style>

