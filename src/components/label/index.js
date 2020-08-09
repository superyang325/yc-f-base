import yLabel from './y-label';
import yAddLabel from './y-add-label';

const loading = {
    install(Vue) {
        Vue.component(yLabel.name, yLabel);
        Vue.component(yAddLabel.name, yAddLabel);
    }
}

export default loading;