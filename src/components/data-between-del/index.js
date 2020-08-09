import yDataBetween from './y-data-between';

const loading = {
    install(Vue) {
        Vue.component(yDataBetween.name, yDataBetween);
    }
}

export default loading;