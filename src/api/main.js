import http from 'utils/http'
import { getHost } from 'consts';

export const api_getAppCloudList = (opt = {}) => {
    return http({
        url: `${getHost()}/tms/api/appcloud/getAppCloudList`,
        method: 'post',
        data: opt.data
    });
}

export const api_getAppMenuList = (opt = {}) => {
    return http({
        url: `${getHost()}/tms/api/appmenu/getAppMenuList`,
        method: 'post',
        data: opt.data
    });
}

export const api_getListLockedTab = (opt = {}) => {
    return http({
        url: `${getHost()}/tms/system/preference/listLockedTab`,
        method: 'post'
    });
}

export const api_lockTab = (opt = {}) => {
    return http({
        url: `${getHost()}/tms/system/preference/lockTab`,
        method: 'post',
        data: opt.data
    });
}

export const api_unlockTab = (opt = {}) => {
    return http({
        url: `${getHost()}/tms/system/preference/unlockTab`,
        method: 'post',
        data: opt.data
    });
}