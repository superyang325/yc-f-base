import ySelect from './y-select';

const loading = {
    install(Vue) {
        Vue.component(ySelect.name, ySelect);
    }
}

export default loading;