import yTreeselect from './y-treeselect';

const loading = {
    install(Vue) {
        Vue.component(yTreeselect.name, yTreeselect);
    }
}

export default loading;