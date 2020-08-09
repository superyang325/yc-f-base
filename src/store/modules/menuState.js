import { api_getAppCloudList, api_getListLockedTab } from 'api/main';
import { homeMenuObj } from 'consts';
import { findOneLevelMenuInStore } from 'utils/menu';
export default {
    state: {
        /**
         * taskTabs中的对象必须有一个值唯一的键gid,必须有一个用户点击时显示页面的路由属性url,以及一个打开类型openType,同时有url及children且children不为空时则url不起作用
         * 例:最少需提供三个字段
         * taskObj:
         * {
         *    gid: 'xxx',
         *    url: '/path/to/xxx',
         *    openType: 0, //0代表在任务栏中显示,1代表新开页面显示,2代表在当前页面全屏显示
         *    childrenIndex: 0,//该属性可选,默认为0,即在有children的情况下,默认显示第几个
         * }
         */
        taskTabs: [ homeMenuObj ], //任务列表,存放的一级菜单或页面对象
        allHistoryTabs: [ homeMenuObj ],//存放所有历史中加入过的tab,不会被删除,用于浏览器回退时使用.
        currentYun: null, //当前选中的云,yunList不用放这儿,因为每次刷新页面都会重新请求接口
        yingyongList: [], //当前云模块下的应用列表
        currentOneLevelMenu: homeMenuObj, //当前选中的某个应用下的一级菜单,不能设置成null,因为如果设置成null,则ying-yong-list中selectedKeys引用时会报错,可以根据这个对象的keyPath,将对应的应用高亮
        yunList: [],//云列表,在云管理模块也会触发查询导致列表信息变化
        switchTwoLevelMenuParamObj: {}, //二级菜单切换时传递的参数对象
    },
    getters: {
        currentOneLevelMenuNoF(state) {
            let result = [];
            if(state.currentOneLevelMenu 
                    && state.currentOneLevelMenu.children
                    && state.currentOneLevelMenu.children.length) {
                result = state.currentOneLevelMenu.children.filter(item => {
                    return item.menuType != 'F';
                });
            }
            return result
        },
        currentPageF(state) {
            //当前页面的按钮数组
            //1.如果currentOneLevelMenu的menuType为M(目录),则根据childrenIndex及children来确定当前页面
            //2.如果currentOneLevelMenu的menuType为C(菜单),则为当前页面
            //当前页面的children中menuType为F的值列表即为按钮数组
            let menuType = state.currentOneLevelMenu.menuType;
            let currentPage = JSON.parse(JSON.stringify(state.currentOneLevelMenu));
            if(menuType == 'M') {
                currentPage = currentPage.children[currentPage.childrenIndex];
            }
            let result = [];
            console.log('currentPage',currentPage)
            if(currentPage 
                    && currentPage.children
                    && currentPage.children.length) {
                result = currentPage.children.filter(item => {
                    return item.menuType == 'F';
                });
            }
            return result;
        }
    },
    actions: {
        pageShowInTask(context,opt={}) {
            if(opt.menuType != 'F') {
                //如果不是按钮
                //console.log('1')
                context.commit('addToTaskTabs', opt);
                context.commit('updateCurrentOneLevelMenu', opt);
            }
        },
        switchTwoLevelMenu(context,opt) {
            context.commit('updateCurrentOneLevelMenuProperty', {
                property: 'childrenIndex',
                value: opt
            });
        },
        async getAppCloudList(context,opt={}) {
            let data = await api_getAppCloudList();
            context.commit('updateYunList', data);
        },
        async initTasktabs(context,opt) {
            //调用用户偏好管理接口,得到锁定tab的列表
            let idList = await api_getListLockedTab();
            if(idList.length) {
                idList.forEach(element => {
                    element.lock = true;
                });
                //console.log('idList', idList)
                context.commit('updateTaskTabs', [homeMenuObj, ...idList]);
            }
        },
        setCurrentOneLevelMenuByRoute(context, opt) {
            let path = opt.path;
            let oneLevelMenu = findOneLevelMenuInStore(context, opt);
            //console.log('oneLevelMenu', oneLevelMenu);
            if(oneLevelMenu) {
                context.commit('updateCurrentOneLevelMenu', oneLevelMenu);
                //如果这个一级菜单有二级菜单,则要计算index值
                if(oneLevelMenu.children && oneLevelMenu.children.length) {
                    let index = oneLevelMenu.children.findIndex(citem => {
                        return path == citem.url;
                    });
                    if(index != -1) {
                        context.commit('updateCurrentOneLevelMenuProperty', {
                            property: 'childrenIndex',
                            value: index
                        });
                    }
                }
            }
        },
    },
    mutations: {
        updateSwitchTwoLevelMenuParamObj(state, payload) {
            state.switchTwoLevelMenuParamObj = payload;
        },
        updateYunList(state, payload) {
            state.yunList = payload;
        },
        updateCurrentYun(state, payload) {
            state.currentYun = payload;
        },
        updateYingyongList(state, payload) {
            state.yingyongList = payload;
        },
        updateCurrentOneLevelMenu(state, payload) {
            state.currentOneLevelMenu = payload;
        },
        updateCurrentOneLevelMenuProperty(state, payload) {
            state.currentOneLevelMenu[payload.property] = payload.value;
        },

        updateTaskTabs(state, payload) {
            state.taskTabs = payload;
        },
      
        addToTaskTabs(state, payload) {
            //如果列表中已有值,则不填加,仅仅是重置currentHeaderTabKey为最新值
            //console.log(payload,state.taskTabs)
            //console.log('2')
            let isExist = state.taskTabs.find(item => {
                return item.gid == payload.gid;
            });
            if(!isExist) {
                state.taskTabs.push(payload);
            }

            let isInAll = state.allHistoryTabs.find(item => {
                return item.gid == payload.gid;
            });
            if(!isInAll) {
                state.allHistoryTabs.push(payload);
            }
            
        },
        clearTaskTabs(state, payload) {
            state.taskTabs = [ homeMenuObj ];
        },
        removeHeaderTabsItem(state, payload) {
            let index = state.taskTabs.findIndex(item => {
                return item.gid == payload;
            });
            if(index != -1) {
                state.taskTabs.splice(index, 1);
            }
            /**
             * 首先判断将要被关闭的任务对象是否是当前对象,如果不是,直接从taskTabs中移除即可,如果是,则需要设置一个新的当前对象
             */
            if(payload == state.currentOneLevelMenu.gid) {
                let newOneLevelMenu = state.taskTabs[index];
                if(!newOneLevelMenu) {
                    newOneLevelMenu = state.taskTabs[state.taskTabs.length - 1]
                }
                //console.log('newOneLevelMenu', newOneLevelMenu);
                state.currentOneLevelMenu = newOneLevelMenu;
            }
        }
    }
}