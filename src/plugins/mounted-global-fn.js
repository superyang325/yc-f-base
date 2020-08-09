import { addDateRange, yc_mTs_arr, yc_region2Obj, yc_isArray, yc_deepCopy } from 'utils/index';
import { Modal, message, notification } from 'ant-design-vue';
import { yc_logout } from 'utils/logout';
import Vue from 'vue';

Vue.prototype.addDateRange = addDateRange;
Vue.prototype.mTs_arr = yc_mTs_arr;
Vue.prototype.region2Obj = yc_region2Obj;
Vue.prototype.isArray = yc_isArray;
Vue.prototype.deepCopy = yc_deepCopy;

Vue.prototype.Modal = Modal;

Vue.prototype.$message = message;
Vue.prototype.$notification = notification;
Vue.prototype.$confirm = Modal.confirm;
Vue.prototype.logout = yc_logout;