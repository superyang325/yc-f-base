import yFormItemColorSelect from './y-form-item-colorSelect';

const loading = {
    install(Vue) {
        Vue.component(yFormItemColorSelect.name, yFormItemColorSelect);
    }
}

export default loading;