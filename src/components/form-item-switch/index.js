import yFormItemSwitch from './y-form-item-switch';

const loading = {
    install(Vue) {
        Vue.component(yFormItemSwitch.name, yFormItemSwitch);
    }
}

export default loading;