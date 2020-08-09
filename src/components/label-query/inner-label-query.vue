<template>
    <div class="inner-label-query clear label-no-close">
        <div class="inner-label-query-left fl"
            :style="getLeftStyle()">
            <!-- <div class="inner-label-query-titel">{{label}}</div> -->
            <ul class="inner-label-query-items">
                <li class="label-item fl pointer inner-label-query-titel">
                    <span>{{label}}</span>
                </li>
                <li v-for="item in list"
                    :class="getClass(item)"
                    v-show="isItemShow(item)"
                    @click="itemClick(item)"
                    :key="item.tagCode">
                    <span>{{item.tagName}}</span>
                    <i v-if="fieldOptions.showClose" class="label-close"></i>
                </li>
            </ul>
        </div>
        <div class="inner-label-query-right fl" v-show="isRightShow">
            <div class="arrow-down label-query-toggle-btn label-item"
                @click="downBtnClick"
                v-show="!isSpread">
                <span>展开</span>
                <i class="arrow"></i>
            </div>
            <div class="arrow-up label-query-toggle-btn label-item"
                @click="upBtnClick"
                v-show="isSpread">
                <span>收起</span>
                <i class="arrow"></i>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import TreeSelect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';

export default {
    data() {
        return {
            isSpread: false, //是否展开,默认未展开
            toggleTitle: '展开',
            selectedList: [], //用户选中的列表
        }
    },
    props: {
        disabled: Boolean,
        list: Array,
        label: String,
        fixedWidth: Number,
        fieldOptions:Object,
    },
    computed: {
        ...mapGetters(['viewWidth']),
        strTotalWidth() {
            //传入的list最宽度
            //每一项的长度为字符串长度*12+24+8
            let total = 0;
            this.list.forEach(item => {
                total += item.tagName.length * 12 + 24 + 8;
            });
            return total;
        },
        isRightShow() {
            //当列表长度大于一行长度时,显示,否则不显示
            return this.strTotalWidth >= this.contentWidth;
        },
        contentWidth() {
            //用于展示标签的整体宽度(包括左侧title和右侧可能的展示按钮)
            console.log('this.viewWidth::'+this.viewWidth)
            return this.viewWidth - this.fixedWidth;
        }
    },
    methods: {
        downBtnClick() {
            this.isSpread = true;
        },
        upBtnClick() {
            this.isSpread = false;
        },
        getLeftStyle() {
            let width = this.contentWidth - 74;
            return {
                width: width + 'px'
            }
        },
        isItemShow(item) {
            //console.log(item.preTotalWidth, this.contentWidth);
            //如果是展开状态,则都显示,否则的话,只要超过一行就不显示
            //console.log(this.isSpread, item.preTotalWidth < this.contentWidth)
            if(this.isSpread) {
                return true;
            }else {
                return item.preTotalWidth < this.contentWidth;
            }
        },
        itemClick(item) {
            //如果数组中存在则取消,如果不存在则加入
            let index = this.selectedList.findIndex(elem => {
                return elem.tagCode == item.tagCode;
            });
            if(index == -1) {
                this.selectedList.push(item);
            }else {
                this.selectedList.splice(index, 1);
            }
            this.$emit('change', this.selectedList);
        },
        getClass(item) {
            let result = ['label-item fl pointer'];
            let index = this.selectedList.findIndex(elem => {
                return elem.tagCode == item.tagCode;
            });
            if(index != -1) {
                result.push('label-active');
            }
            result.push('label-c-' + item.tagIconTone);
            return result;
        },
        valChange(value) {
            //console.log(value);
            this.$emit('change', value);
        },
    }
}
</script>
<style lang="less">
.inner-label-query{
    .inner-label-query-titel{
        padding:3px 0px 5px 0px ;
        margin-right:18px;
        cursor: default;
    }
    .label-query-toggle-btn{
        border: 1px solid #DBE0E7;
        background: #ffffff;
        color: #3C5484;
        cursor: pointer;
        user-select: none;
        &:hover{
            border: 1px solid #3366FF;
            color: #3366FF;
        }
    }
    .arrow{
        width: 10px;
        height: 6px;
        display: inline-block;
    }
    .arrow-down{
        .arrow{
            background: url('../../static/label-img/down-g.png');
            background-size: 10px 6px;
        }
        &:hover{
            .arrow{
                background: url('../../static/label-img/down-b.png');
                background-size: 10px 6px;
            }
        }
    }
    .arrow-up{
        .arrow{
            background: url('../../static/label-img/up-g.png');
            background-size: 10px 6px;
        }
        &:hover{
            .arrow{
                background: url('../../static/label-img/up-b.png');
                background-size: 10px 6px;
            }
        }
    }
}
</style>



