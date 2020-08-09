import yTableEdit from './y-table-edit';

const loading = {
    install(Vue) {
        Vue.component(yTableEdit.name, yTableEdit);
    }
}

export default loading;