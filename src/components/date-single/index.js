import yDateSingle from './y-date-single';

const loading = {
    install(Vue) {
        Vue.component(yDateSingle.name, yDateSingle);
    }
}

export default loading;