import yFormItemInput from './y-form-item-input';

const loading = {
    install(Vue) {
        Vue.component(yFormItemInput.name, yFormItemInput);
    }
}

export default loading;