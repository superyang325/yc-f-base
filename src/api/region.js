import http from 'utils/http'
import { getHost } from 'consts';

export const api_getRegion = (opt) => {
    return http({
        url: getHost() + '/tms/api/location/getLocationList',
        method: 'post',
        data: opt.data
    });
 }

 export const api_listDealerSerial = (opt) => {
    return http({
        url: getHost('//saas001.yichehuoban.cn') + '/crmapi/car/listDealerSerial', // 
        method: 'post',
        data: opt.data
    });
 }
 
 export const api_listSerialCar = (opt) => {
    return http({
        url: getHost('//saas001.yichehuoban.cn') + '/crmapi/car/listSerialCar', // 
        method: 'post',
        data: opt.data
    });
 }
 
 export const api_getBusinessesTags = (opt) => {
    return http({
        url: getHost('//saas001.yichehuoban.cn') + '/crmapi/business/getBusinessesTags',
        method: 'post',
        data: opt.data
    });
 }


//  url: '/tms/system/tag/getTenantTagListByGroupCode',
//  typeProperty:'tagGroupCode',
//  typeValue:'kehu_laiyuan',

//  export const api_getBusinessesTags = (opt) => {
//     return http({
//         url: getHost() + '/crmapi/business/getBusinessesTags',
//         method: 'post',
//         data: opt.data
//     });
//  }