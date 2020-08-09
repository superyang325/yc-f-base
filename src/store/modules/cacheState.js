export default {
    state: {
        treeselectCache: {}, //用来根据url缓存远程数据,treeselect组件使用
        selectCache: {},
        regionCache: [], //专门用于缓存地区组件的全量数据
    },
    mutations: {
        updateTreeselectCache(state, payload = {}) {
            state.treeselectCache[payload.url] = payload.data;
        },
        updateSelectCache(state, payload = {}) {
            state.selectCache[payload.url] = payload.data;
        },
        updateRegionCache(state, payload) {
            state.regionCache = payload;
        },
    },
}