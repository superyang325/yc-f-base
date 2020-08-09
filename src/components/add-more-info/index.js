import addMoreInfo from './add-more-info';

const loading = {
    install(Vue) {
        Vue.component(addMoreInfo.name, addMoreInfo);
    }
}

export default loading;