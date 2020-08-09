import Router from "vue-router";
let routes = [],
    children = [],
    siblings = [];
import index from 'pages/index';

//基础项目相关路由
import baseRoutes from './base';
children = children.concat(baseRoutes.children || []);
siblings = siblings.concat(baseRoutes.siblings || []);   

import translate from 'utils/translate';
                            //这行注释不要动(router)start
 
import biProjectRoutes from '@bi/router';
translate.translateRouter('bi', biProjectRoutes);
children = children.concat(biProjectRoutes.children || []);
siblings = siblings.concat(biProjectRoutes.siblings || []);
        
import jcpthtProjectRoutes from '@jcptht/router';
translate.translateRouter('jcptht', jcpthtProjectRoutes);
children = children.concat(jcpthtProjectRoutes.children || []);
siblings = siblings.concat(jcpthtProjectRoutes.siblings || []);
        
import ttyyProjectRoutes from '@ttyy/router';
translate.translateRouter('ttyy', ttyyProjectRoutes);
children = children.concat(ttyyProjectRoutes.children || []);
siblings = siblings.concat(ttyyProjectRoutes.siblings || []);
        
 //这行注释不要动(router)end                            

routes = routes.concat([{
    path: '/home',
    meta: { auth: false },//不需要验证
    component: index,
    children: children}])
                .concat(siblings)
                .concat([{path: '*', redirect: '/404'}]);
console.log('routes::::', routes);
export default new Router({
    mode: 'history',
    routes: routes
})