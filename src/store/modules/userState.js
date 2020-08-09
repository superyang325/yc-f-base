import { gotoapp } from 'api/login';
import { getToken, setCookie } from '@/utils/auth';
import { yc_aRedirect } from 'utils/index';
import { tmpHome } from 'consts/index';
export default {
    state: {
        userIdentity: []
    },
    mutations: {
        updateUserIdentity(state, payload) {
            state.userIdentity = payload;
        },
    },
    actions: {
        async gotoapp(context, opt = {}) {
            //console.log('userIdentity123', opt.userIdentity)
            let appUrl = await gotoapp({
                data: {
                    appOpenId: '',
                    organizationId: opt.userIdentity.organizationId,
                    organizationName: opt.userIdentity.organizationName,
                    roleId: opt.userIdentity.roleId,
                    roleName: opt.userIdentity.roleName,
                    tenantId: opt.userIdentity.tenantId,
                    dataScope: opt.userIdentity.dataScope,
                    userId:opt.userIdentity.userId,
                    userCode:opt.userIdentity.userCode,
                    nickName:opt.userIdentity.nickName,
                }
            });
            opt.sucFn && opt.sucFn();
            let res = {
                tenantDomain: appUrl.tenantDomain,
                tenantId: appUrl.tenantId
            };
            //console.log('appUrl', appUrl);
            clearVuexAlong();//每次身份切换,都要把之前的vuex缓存清掉

            setCookie('userIdentity', JSON.stringify(opt.userIdentity));
            setCookie('userTenantId', res.tenantId);
            let href = '';
            if(process.env.NODE_ENV == 'development') {
                href = tmpHome;
            }else {
                href = '//'+res.tenantDomain + '/home';
            }
            yc_aRedirect(href)
        }
    }
}