import yFormItemTree from './y-form-item-tree';

const loading = {
    install(Vue) {
        Vue.component(yFormItemTree.name, yFormItemTree);
    }
}

export default loading;