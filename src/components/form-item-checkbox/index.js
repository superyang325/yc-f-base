import yFormItemCheckbox from './y-form-item-checkbox';

const loading = {
    install(Vue) {
        Vue.component(yFormItemCheckbox.name, yFormItemCheckbox);
    }
}

export default loading;