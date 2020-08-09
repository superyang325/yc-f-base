import yTable from './y-table';

const loading = {
    install(Vue) {
        Vue.component(yTable.name, yTable);
    }
}

export default loading;