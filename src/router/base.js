import Home from "pages/home"
export default {
	children: [
		{
			path: '/iframe/:menuId',
			meta: { auth: true },
            component: resolve => require(['pages/iframe'], resolve)
        },
		{
		    path: '/home',
		    component: resolve => require(['pages/home'], resolve),
		    meta: { keepAlive: true }
		},
		{
			path: '/404',
			// beforeEnter: (to, from, next) => {
			// 	console.log('from', from)
			// 	console.log('to', to)
			// 	next();
			// },
		    component: resolve => require(['pages/404'], resolve)
		},
	],
	siblings: [
		{
		    path: '/login',
		    component: resolve => require(['pages/login/login'], resolve)
		},
		{
		    path: '/user-identity-select',
		    component: resolve => require(['pages/login/user-identity-select'], resolve)
		},
		{
			path: '/',
		    redirect: '/home'
		}
	]
};