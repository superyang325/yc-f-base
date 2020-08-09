import yFormItemSelect from './y-form-item-select';

const loading = {
    install(Vue) {
        Vue.component(yFormItemSelect.name, yFormItemSelect);
    }
}

export default loading;