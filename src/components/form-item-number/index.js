import yFormItemNumber from './y-form-item-number';

const loading = {
    install(Vue) {
        Vue.component(yFormItemNumber.name, yFormItemNumber);
    }
}

export default loading;