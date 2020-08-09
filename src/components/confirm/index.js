import yConfirm from './y-confirm.vue';

const loading = {
    install(Vue) {
        Vue.component(yConfirm.name, yConfirm);
    }
}

export default loading;