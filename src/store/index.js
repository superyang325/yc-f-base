import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import createPersistedState from "vuex-persistedstate" 
import createVuexAlong from 'vuex-along';
import menuState from './modules/menuState';
import userState from './modules/userState';
import cacheState from './modules/cacheState';
import errorState from './modules/errorState';
import globalState from './modules/globalState';
import editState from './modules/editState'
import translate from 'utils/translate';
                        //这行注释不要动1(store)start
 
import biState from '@bi/store';
translate.translateStore('bi', biState);
        
import jcpthtState from '@jcptht/store';
translate.translateStore('jcptht', jcpthtState);
        
import ttyyState from '@ttyy/store';
translate.translateStore('ttyy', ttyyState);
        
 //这行注释不要动1(store)end                        
const store = new Vuex.Store({
    // 在严格模式下，任何 mutation 处理函数以外修改 Vuex state 都会抛出错误
    strict: process.env.NODE_ENV !== 'production',
    state: {},
    modules:{  // 子模块
        menuState,
        userState,
        cacheState,
        errorState,
        globalState,
        editState,
                                //这行注释不要动2(store)start
 
        ...biState,
        ...jcpthtState,
        ...ttyyState,
 //这行注释不要动2(store)end                        
    },
    plugins: [
        //createPersistedState()
        createVuexAlong({
            local: {
                list: ["errorState"],// 过滤模块 ma 数据， 将其他的存入 localStorage
                isFilter: true,
            },
        })
    ],
    mutations: {
        //给一个对象动态增加可响应式属性
        addRProperty(state, payload) {
            //console.log(state, payload)
            //path用逗号分隔
            let targetObj = null,
                paths = payload.path.split('.');
            targetObj = state[paths.shift()];
            paths.forEach(item => {
                //console.log(item)
                targetObj = targetObj[item];
            });
            Vue.set(targetObj, payload.property, payload.value);
        }
    }
})
export default store