import yFormItemColor from './y-form-item-color';

const loading = {
    install(Vue) {
        Vue.component(yFormItemColor.name, yFormItemColor);
    }
}

export default loading;