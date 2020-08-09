import http from 'utils/http'
import { getHost } from 'consts';

export const api_fetchWithUrl = (opt,apiHttpPrefix) => {
    return http({
        url: getHost(apiHttpPrefix) + opt.url,
        method: 'post',
        data: opt.data
    });
 }