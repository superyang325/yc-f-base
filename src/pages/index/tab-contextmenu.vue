<template>
    <div class="task-tabs-tab-contextmenu-cntr"
             @contextmenu.prevent>
        <div class="mask" @click="close">
            <!-- {{taskObj}} -->
        </div>
        <ul class="task-tabs-tab-contextmenu-ul"
            :style="getStyle()">
            <li @click="closeOther" :class="getClass('closeOtherDisable')">
                <div class="closeOther common">
                </div>
                <p>关闭其它标签页</p>
            </li>
            <li @click="closeLeft" :class="getClass('closeRightDisable')">
                <div class="closeLeft common">
                </div>
                <p>关闭左侧标签页</p>
            </li>
            <li @click="closeRight" :class="getClass('closeLeftDisable')">
                <div class="closeRight common">
                </div>
                <p>关闭右侧标签页</p>
            </li>
            <li @click="closeAll" :class="getClass('closeAllDisable')">
                <div class="closeAll common">
                </div>
                <p>关闭全部标签页</p>
            </li>
            <li @click="lockTab" :class="getClass('lockTabDisable')">
                <div class="lockTab common">
                </div>
                <p>固定</p>
            </li>
            <li @click="toReload" :class="getClass('toReloadDisable')">
                <div class="toReload common">
                </div>
                <p>重新加载</p>
            </li>
        </ul>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import { api_lockTab } from 'api/main';
import { row1Height, row2Height } from 'consts';
export default {
    created() {
        console.log('here....aaaaa')
    },
    mounted() {
        //不能移动DOM,否则与外面的v-if命令冲突,下次就不能正常显示了
        // setTimeout(() => {
        //     console.log($('.task-tabs-tab-contextmenu-cntr').length)
        //     if(!$(document.body).find('> .task-tabs-tab-contextmenu-cntr').length) {
        //         $('.task-tabs-tab-contextmenu-cntr').appendTo(document.body);
        //     }
        // }, 0);
    },
    data() {
        return {
            closeOtherDisable: true,
            closeRightDisable: false,
            closeLeftDisable: false,
            closeAllDisable: false,
            lockTabDisable: false,
            toReloadDisable: false,//默认都是可用的
        }
    },
    inject: ['reload'],
    props: {
        taskObj: {
            type: Number,
            default() {
                return {}
            }
        },
        pageX: Number,
        pageY: Number
    },
    computed: {
        ...mapState(['menuState'])
    },
    methods: {
        ...mapMutations(['removeHeaderTabsItem']),
        getStyle() {
            let top = 0, left = 0;
            top = this.pageY;
            left = this.pageX;
            return {
                top: top + 20 + 'px',
                left: left + 'px'
            }
        },
        close() {
            this.$emit('close');
        },
        async lockTab() {
            this.$emit('locked');
            console.log('this.taskObj', this.taskObj)
            let res = await api_lockTab({
                data: {
                    menuId: this.taskObj.id
                }
            });
            // this.$emit('locked');
            this.$emit('close');
        },
        lockTabBtnShow() {
            if(this.taskObj.isHome){
                return false;
            }
            return !this.taskObj.lock;
        },
        reLoadBtnShow() {
            //如果当前的路由是keepAlive的,则不显示
            return !this.$route.meta.keepAlive;
        },
        closeLeft() {
            let taskTabs = this.menuState.taskTabs;
            let targetIndex = taskTabs.findIndex(item => {
                return item.gid == this.taskObj.gid;
            });
            let closeTaskTabs = taskTabs.slice(0, targetIndex).filter(item => {
                return item.lock == false;
            });
            this.closeTabsItems(closeTaskTabs);
            this.$emit('close');
        },
        closeRight() {
            let taskTabs = this.menuState.taskTabs;
            let targetIndex = taskTabs.findIndex(item => {
                return item.gid == this.taskObj.gid;
            });
            let closeTaskTabs = taskTabs.slice(targetIndex + 1).filter(item => {
                return item.lock == false;
            });
            this.closeTabsItems(closeTaskTabs);
            this.$emit('close');
        },
        closeOther() {
            //关掉其他非锁定的标签页
            let taskTabs = this.menuState.taskTabs;
            let otherTaskTabs = taskTabs.filter(item => {
                return item.gid != this.taskObj.gid && item.lock == false;
            });
            this.closeTabsItems(otherTaskTabs);
            this.$emit('close');
        },
        closeAll() {
            //关掉所有非锁定的标签页
            let noLockTaskTabs = this.getNoLockTabs();
            this.closeTabsItems(noLockTaskTabs);
            this.$emit('close');
        },
        toReload() {
            this.reload();
            this.$emit('close');
        },
        getNoLockTabs() {
            let taskTabs = this.menuState.taskTabs;
            return taskTabs.filter(item => {
                return item.lock == false;
            });
        },
        closeTabsItems(arr) {
            if(arr.length && arr.length != 0) {
                arr.forEach(element => {
                    this.removeHeaderTabsItem(element.gid);
                });
            }
        },
        // getMaskStyle() {
        //     let top = row1Height + row2Height;
        //     return {
        //         top: top + 'px'
        //     }
        // },
        getClass(dataProperty) {
            let result = [];
            if(this[dataProperty]) {
                result.push('disable');
            }
            return result;
        }
    }
}
</script>
<style lang="less">
.task-tabs-tab-contextmenu-cntr{
    // position: fixed;
    // top: 0;
    // left: 0;
    // bottom: 0;
    // right: 0;
    // z-index: 1000;
    .mask{
        background: #efefee;
        opacity: 0;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 2;
        display: none;
    }
    .task-tabs-tab-contextmenu-ul{
        position: absolute;
        z-index: 10;
        width:122px;
        background:rgba(255,255,255,1);
        box-shadow:0px 0px 8px 0px rgba(120,144,180,0.2);
        .common{
            float: left;
            width:14px;
            height:14px;
            padding-left: 20px;
            background-repeat: no-repeat;
            background-position-y: 0px;
            margin-top: 2px;
        }
        li{
            padding: 8px;
            color: #3C5484;
            font-size: 12px;
            cursor: pointer;
            user-select:none;
            overflow: hidden;
            &:hover{
                color: #3366FF;
                background: rgba(51,102,255,0.08);
                .common{
                    background-position-y: -14px;
                }
            }
            &.disable{
                cursor: not-allowed;
                color:#849CC0;
                .common{
                    background-position-y: -28px;
                }
                &:hover{
                    background-color: #FFFFFF;
                }
            }
            .closeOther{
                background-image: url('./img/closeOther.png')
            }
            .closeLeft{
                background-image: url('./img/closeLeft.png')
            }
            .closeRight{
                background-image: url('./img/closeRight.png')
            }
            .closeAll{
                background-image: url('./img/closeAll.png')
            }
            .lockTab{
                background-image: url('./img/lockTab.png')
            }
            .toReload{
                background-image: url('./img/toReload.png')
            }
            p{
                line-height: 16px;
                float: left;
            }
        }
    }
}
</style>


