import yLabelQuery from './y-label-query';

const loading = {
    install(Vue) {
        Vue.component(yLabelQuery.name, yLabelQuery);
    }
}

export default loading;