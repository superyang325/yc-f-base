<template>
    <ul class="inner-label-query-items clear">
        <!-- {{list}} -->
        <li v-for="item in list"
            :class="getClass(item)"
            @click="itemClick(item)"
            :key="item.tagCode">
            <span>{{item.tagName}}</span>
            <i v-show="remove"
                class="label-close"
                @click="removeItem(item)"></i>
        </li>
    </ul>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            // selectedList: this.selectedListOuter, //用户选中的列表
            selectedList: [], //用户选中的列表
            removeList: [], //被删除的列表
        }
    },
    props: {
        remove: Boolean,
        list: Array,
        // selectedListOuter: {
        //     type: Array,
        //     default() {
        //         return [];
        //     }
        // },
        clickAddActive: {
            type: Boolean,
            default() {
                return true;
            }
        }
    },
    methods: {
        removeItem(item) {
            let index = this.list.findIndex(elem => {
                return elem.tagCode == item.tagCode;
            });
            if(index != -1) {
                this.list.splice(index, 1);
                this.removeList.push(item);
            }
            
            this.$emit('remove', item);
        },
        itemClick(item) {
            //如果数组中存在则取消,如果不存在则加入
            // let index = this.list.findIndex(elem => {
            //     return elem.tagCode == item.tagCode;
            // });
            // if(index == -1) {
            //     this.list.push(item);
            // }else {
            //     this.list.splice(index, 1); // ?
            // }
            this.$emit('click', item);
        },
        getClass(item) {
            
            let result = ['label-item fl pointer'];
            if(this.clickAddActive) {
                let index = this.selectedList.findIndex(elem => {
                    return elem.tagCode == item.tagCode;
                });
                if(index != -1) {
                    result.push('label-active');
                }
            }
            result.push('label-c-' + item.tagIconTone); // item.tagIconTone
            return result;
        },
    }
}
</script>



