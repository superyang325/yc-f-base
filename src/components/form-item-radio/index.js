import yFormItemRadio from './y-form-item-radio';

const loading = {
    install(Vue) {
        Vue.component(yFormItemRadio.name, yFormItemRadio);
    }
}

export default loading;