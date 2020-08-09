import yRegion from './y-region';

const loading = {
    install(Vue) {
        Vue.component(yRegion.name, yRegion);
    }
}

export default loading;