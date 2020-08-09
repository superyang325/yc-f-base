<template>
    <div class="task-tabs" :style="getTaskTabsStyle()">
        <a-tabs
            hideAdd
            :activeKey="menuState.currentOneLevelMenu.gid"
            type="editable-card"
            @change="onChange"
            class="task-tabs-a-tabs"
        >
            <a-tab-pane v-for="taskObj in menuState.taskTabs"   :key="taskObj.gid" :closable="false">
                <div slot="tab" class="task-tabs-tab-div" @contextmenu.prevent="contextmenu(taskObj, $event)">
                    <div class="info">{{taskObj.name}}</div>
                    <div class="lock common current" v-show="isLockShow(taskObj)" @click.stop="unlockTab(taskObj)"></div>
                    <div class="close common" v-show="isCloseShow(taskObj)"  @click.stop="closeTab(taskObj)"></div>
                    <!-- <a-icon type="lock" 
                        v-show="isLockShow(taskObj)"
                        @click.stop="unlockTab(taskObj)" />
                    <a-icon type="close" 
                        v-show="isCloseShow(taskObj)"
                        @click.stop="closeTab(taskObj)" /> -->
                </div>
            </a-tab-pane>
        </a-tabs>
        <tab-contextmenu
            :taskObj="taskObj"
            :pageX="pageX"
            :pageY="pageY"
            v-if="isContextmenuShow"
            @close="hideContextmenu"
            @locked="locked">
        </tab-contextmenu>
    </div>
    
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { 
    row2Height,
    taskHeight,
    pageRightPadding,
    pageLeftPadding,
    } from 'consts';
import { api_unlockTab } from 'api/main';
import tabContextmenu from './tab-contextmenu';
import { setTimeout } from 'timers';

export default {
    created() {
        //console.log('menuState.taskTabs',this.menuState.taskTabs)
        /**
         * taskTabs中的对象必须有一个值唯一的键gid,必须有一个用户点击时显示页面的路由属性url,以及一个打开类型openType,同时有url及children且children不为空时则url不起作用
         * 例:最少需提供三个字段
         * taskObj:
         * {
         *    gid: 'xxx',
         *    url: '/path/to/xxx',
         *    openType: 0, //0代表在任务栏中显示,1代表新开页面显示,2代表在当前页面全屏显示
         * }
         */
        /**
         * 根据store中的taskTabs进行任务栏的展示
         * 点击某任务栏,将对应的任务对象保存进store中的currentOneLevelMenu中,供其他模块使用
         */
        //这里调用获取一下初始的taskTabs列表.
        this.initTasktabs();
    },
    data() {
        return {
            isContextmenuShow: false,
            taskObj: null,
            //contextmenuE: null
            pageX: 0,
            pageY: 0
        }
    },
    mounted() {
        setTimeout(() => {
            $('.task-tabs').find('.ant-tabs-nav-container').height(taskHeight);
            document.removeEventListener("click",this.hideContextmenu,false)
            document.addEventListener("click",this.hideContextmenu,false)
        }, 0);
    },
    computed: {
        ...mapState(['menuState'])
    },
    components: {
        tabContextmenu
    },
    methods: {
        ...mapMutations([
            'updateCurrentOneLevelMenu',
            'removeHeaderTabsItem',
        ]),
        ...mapActions(['initTasktabs']),
        isLockShow(taskObj) {
            //当lock属性为true时显示
            if(taskObj.isHome) {
                return false;
            }else {
                return taskObj.lock;
            }
        },
        isCloseShow(taskObj) {
            //当lock属性为false时显示
            if(taskObj.isHome) {
                return false;
            }else {
                return !taskObj.lock;
            }
        },
        closeTab(taskObj) {
            //console.log('taskObj',taskObj)
            this.removeHeaderTabsItem(taskObj.gid);
        },
        async unlockTab(taskObj) {
            let res = await api_unlockTab({
                data: {
                    menuId: taskObj.id
                }
            });
            taskObj.lock = false;
            this.$message.success('解锁成功');
        },
        locked() {
            // alert('get..') //执行
            this.taskObj.lock = true;
            this.$message.success('锁定成功');
        },
        onChange(activeKey) {
            let currentTaskObj = this.menuState.taskTabs.find(item => {
                return item.gid == activeKey;
            });
            //console.log('currentTaskObj', currentTaskObj);
            this.updateCurrentOneLevelMenu(currentTaskObj);
        },
        getTaskTabsStyle() {
            return {
                paddingTop: (row2Height - taskHeight) + 'px',
                paddingRight: pageRightPadding + 'px',
                paddingLeft: pageLeftPadding + 'px'
            }
        },
        contextmenu(taskObj, e) {
            this.isContextmenuShow = true;
            this.taskObj = taskObj;
            console.log('e', e.pageX)
            this.pageX = e.pageX;
            this.pageY = e.pageY;
        },
        hideContextmenu() {
            console.log('here.....')
            this.isContextmenuShow = false;
        }
    }
}
</script>
<style lang="less">
@import "../../consts/vars.less";
.task-tabs{
    width: 100%;
    .ant-tabs-bar{
        margin-bottom: 0;
    }
    .ant-tabs-tab{
        background: #e2e6ee!important;
        line-height: 30px!important; //这里如果发生变化,需要手动维护
        .anticon{
            //visibility: hidden;
            display: none;
        }
        &:hover{
            .anticon{
                //visibility: visible;
                display: inline-block;
            }
        }
    }
    .ant-tabs-tab-active{
        background: #fff!important;
        .anticon{
            visibility: visible;
        }
    }
    .task-tabs-tab-div{
        position: relative;
        user-select:none;
        overflow: hidden;
        .common{
            width: 16px;
            height: 16px;
            background-repeat: no-repeat;
            float: left;
            margin-top: 8px;
            margin-left: 6px;
        }
        .info{
            float: left;
        }
        .lock{
            background-image: url('./img/lock.png')
        }
        .close{
            background-image: url('./img/close.png')
        }
        .current{
            background-position-y: -16px;
        }
        .complete{
            background-position-y: -32px;
        }
    }
    .task-tabs-a-tabs{
        z-index: 1001;
    }
}
</style>
