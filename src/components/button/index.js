import yButton from './y-button';

const loading = {
    install(Vue) {
        Vue.component(yButton.name, yButton);
    }
}

export default loading;