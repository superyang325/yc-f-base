import { removeCookie, removeToken } from './auth';
import { yc_goLogin } from './index';

let resetCache = ()=> {
    //删除vuex-along
    //localStorage.removeItem("vuex-along");
    clearVuexAlong();
    //删除cookie
    removeCookie('userIdentity');
    removeCookie('userIdentities');
    removeCookie('userTenantId');
    //删除token
    removeToken();
}

export function yc_resetCache() {
    resetCache();
}

export function yc_logout() {
    resetCache();
    //直接跳转
    yc_goLogin();
}