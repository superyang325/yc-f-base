import yFormItemTextarea from './y-form-item-textarea';

const loading = {
    install(Vue) {
        Vue.component(yFormItemTextarea.name, yFormItemTextarea);
    }
}

export default loading;