import yLogo from './y-logo';

const loading = {
    install(Vue) {
        Vue.component(yLogo.name, yLogo);
    }
}

export default loading;