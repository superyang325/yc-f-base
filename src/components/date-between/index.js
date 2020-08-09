import yDateBetween from './y-date-between';

const loading = {
    install(Vue) {
        Vue.component(yDateBetween.name, yDateBetween);
    }
}

export default loading;