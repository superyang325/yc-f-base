import yDate from './y-date';

const loading = {
    install(Vue) {
        Vue.component(yDate.name, yDate);
    }
}

export default loading;