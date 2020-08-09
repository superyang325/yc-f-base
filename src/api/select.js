import http from 'utils/http'
import { getHost } from 'consts';

export const api_getOptions = (opt) => {
    return http({
        url: getHost() + opt.url,
        method: 'post',
        data: opt.data
    });
 }