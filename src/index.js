import Vue from 'vue';
import Router from 'vue-router';
import App from './app';
import 'static/reset.css';
import 'static/common.css';
import 'static/pages.css';
import 'static/label.css';
import 'static/y-common.css'
//[" ~

Vue.config.devtools=true;

import PartAntDUI from './plugins/import-part-of-ant-d';
Vue.use(PartAntDUI);

import mountComponents from './plugins/mount-components';
Vue.use(mountComponents);//将自定义的常用组件

Vue.use(Router);

import './plugins/mounted-global-fn';// 全局方法挂载

import './permission' // permission control

import store from './store';
import router from './router';

new Vue({
    el: "#app",
    router,
    store,
    render: h => h(App),
})
