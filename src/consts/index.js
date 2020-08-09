export let footerHeight = 48; //页面底部区域高度
export let row1Height = 36; //第一行的高度
export let row2Height = 36; //第二行的高度
export let taskHeight = 32; //第二行中tab的高度
export let secondMenuHeight = 40; //二级菜单行的高度
export let navButtonsHeight = 94; //左则应用列表下的按钮级高度,这个涉及到与上面的应用高度的计算
export let pageLeftPadding = 50;
export let pageRightPadding = 30;

export let homeMenuObj = {
    name: '欢迎页',
    openType: 0,
    url: '/home',
    gid: '0',
    isHome: true,
    lock: true,
}


export function getHost(apiHttpPrefix = '//saas.yichehuoban.cn') {
    if(process.env.NODE_ENV == 'development') {
        return '';
    }else {
        return apiHttpPrefix + '/gateway';
    }
};

export const cookieDomain = (()=>{
    //这个变量用来指定cookie保存时的公共域名
    if(process.env.NODE_ENV == 'development') {
        return '';
    }else {
        return 'yichehuoban.cn'
    }
})();

export const sassloginhost = (()=>{
    //这个变量用来指定用户登陆时需要跳转的域
    if(process.env.NODE_ENV == 'development') {
        return 'localhost:8089';
    }else {
        return 'saas.yichehuoban.cn'
    }
})();

export const loginUrl = (()=>{
    //这个变量用来指定用户登陆时需要跳转的域
    if(process.env.NODE_ENV == 'development') {
        return '//localhost:8089' + '/login';
    }else {
        return '//saas.yichehuoban.cn' + '/login'
    }
})();

export const userIdentitySelectUrl = (()=>{
    //这个变量用来指定用户登陆时需要跳转的域
    if(process.env.NODE_ENV == 'development') {
        return '//localhost:8089' + '/user-identity-select';
    }else {
        return '//saas.yichehuoban.cn' + '/user-identity-select'
    }
})();

//let httpPrefix = '//saas.yichehuoban.cn';  
//let httpPrefix = '//saas02.yichehuoban.cn:8089';  
//let httpPrefix = '//localhost:8089';

//export let loginUrl = httpPrefix + '/login';
//export let userIdentitySelectUrl = httpPrefix + '/user-identity-select';

export let tmpHome = '//localhost:8089/home';



