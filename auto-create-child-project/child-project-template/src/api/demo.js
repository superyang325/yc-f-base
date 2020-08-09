import http from 'utils/http'
let host = process.env.NODE_ENV == 'development' ? '/dev' : '/prod';
export const api_getPageLayout = (opt) => {
   return http({
       url: `${host}/newWeb/data/gateway/selectLayoutJson.do`,
       method: 'get',
       params: opt.params,
       loadingDom: opt.loadingDom
   });
}
export const api_saveOrUpdateSiteLayout = (opt) => {
   return http({
       url: `${host}/newWeb/data/gateway/api_saveOrUpdateSiteLayout.do`,
       method: 'post',
       data: opt.data,
       useResWithCode: true,
       loadingDom: opt.loadingDom
   });
}