import yChoseCar from './y-chose-car';

const loading = {
    install(Vue) {
        Vue.component(yChoseCar.name, yChoseCar);
    }
}

export default loading;