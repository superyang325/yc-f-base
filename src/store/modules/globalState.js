import { 
    row1Height,
    row2Height,
    secondMenuHeight,
    footerHeight,
    pageLeftPadding,
    pageRightPadding,
    } from 'consts';
export default {
    state: {
        screenHeight: 0, //屏幕高度,可视区高度
        screenWidth: 0, //屏幕宽度
    },
    getters: {
        contentHeight(state, moduleGetters) {
            //这里应该还要判断一下二级菜单行是否存在的问题
            //内容区高度,含padding
            let sMenuHeight = 0
            if(moduleGetters.currentOneLevelMenuNoF.length) {
                //说明有二级菜单行
                sMenuHeight = secondMenuHeight;
            }
            
            return state.screenHeight - row1Height - row2Height - footerHeight - sMenuHeight;
        },
        viewHeight(state, moduleGetters) {
            //等于内容区高度减去padding
            return moduleGetters.contentHeight - 32;//32是上下内边距
        },
        contentWidth(state) {
            return state.screenWidth - pageRightPadding - pageLeftPadding;
        },
        viewWidth(state, moduleGetters) {
            return moduleGetters.contentWidth - 32;//32是左右内边距
        }
    },
    mutations: {
        updateScreenHeight(state, payload) {
            state.screenHeight = payload;
        },
        updateScreenWidth(state, payload) {
            state.screenWidth = payload;
        },
    },
}