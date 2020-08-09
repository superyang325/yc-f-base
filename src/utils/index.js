import { 
    loginUrl,
    userIdentitySelectUrl,
    } from 'consts/index';
// 添加日期范围
export function addDateRange(params, dateRange) {
	var search = params;
	if (null != dateRange) {
		search.params = {
			beginTime: this.dateRange[0],
			endTime: this.dateRange[1]
		};
	}
	return search;
}

export function yc_uuid() {
	var s = [];
	var hexDigits = "0123456789abcdef";
	for (var i = 0; i < 36; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	}
	s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
	s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
	s[8] = s[13] = s[18] = s[23] = "-";

	var uuid = s.join("");
	return uuid;
}

export function yc_isArray(o){
	return Object.prototype.toString.call(o)== '[object Array]';
}

export function yc_aRedirect(href) {
	//通过a标签的形式进行跨域跳转  
	let $a = $(document).find('#yc-hidden-go-app-a');
	// if(!$a.length) {
	// 	$(document).append('<a href="" id="yc-hidden-go-app-a" style="display:none;"></a>')
	// 	$a = $(document).find('#yc-hidden-go-app-a');
	// }
	$a.attr('href', href);
	setTimeout(() => {
		document.getElementById('yc-hidden-go-app-a').click();
	}, 100);
}

export function yc_goLogin() {
	//这里只是跳转到登陆页面,不涉及状态清空
	yc_aRedirect(loginUrl);
}

export function yc_goUserIdentitySelect() {
	//登出逻辑:需要清空cookie及store,这里只是跳转到登陆页面,不涉及状态清空
	yc_aRedirect(userIdentitySelectUrl);
}



/**
 * 深拷贝
 * @param {*} obj 拷贝对象(object or array)
 * @param {*} cache 缓存数组
 */
export function yc_deepCopy(obj, cache = []) {
	// typeof [] => 'object'
	// typeof {} => 'object'
	if (obj === null || typeof obj !== 'object') {
	  return obj
	}
	// 如果传入的对象与缓存的相等, 则递归结束, 这样防止循环
	/**
	 * 类似下面这种
	 * var a = {b:1}
	 * a.c = a
	 * 资料: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value
	 */
	const hit = cache.filter(c => c.original === obj)[0]
	if (hit) {
	  return hit.copy
	}
  
	const copy = Array.isArray(obj) ?  [] :   {}
	// 将copy首先放入cache, 因为我们需要在递归deepCopy的时候引用它
	cache.push({
	  original: obj,
	  copy
	})
	Object.keys(obj).forEach(key => {
	  copy[key] = yc_deepCopy(obj[key], cache)
	})
  
	return copy
}
	
export function yc_debounce(fn, wait = 1000) {
	var timeout = null;
	return function() {
		if(timeout !== null) {
			clearTimeout(timeout);
		}
		timeout = setTimeout(fn, wait);
	}
}

export function yc_throttle(fn, delay = 500) {
	var timer = null;
	return function() {
		var context = this;
		var args = arguments;
		if (!timer) {
			timer = setTimeout(function() {
				fn.apply(context, args);
				timer = null;
			}, delay);
		}
	}
}

export function yc_mTs_arr(arr, formatterStr = 'YYYY-MM-DD hh:mm:ss') {
	let result = [];
	for(let i = 0, j = arr.length; i < j; i++) {
		result.push(arr[i].format(formatterStr));
	}
	return result;
}

export function yc_region2Obj(regionVal) {
	//regionVal是一个数组
	let obj = {};
	let properties = ['proviceId', 'cityId', 'zoneId'];
	for(let i = 0, j = regionVal.length; i < j; i++) {
		obj[properties[i]] = regionVal[i];
	}
	return obj;
}

export function yc_isHzStr(str) {
	let reg = /^([\u4E00-\u9FA5])*$/;
	return reg.test(str);
}

export function yc_isPhoneNo(str) {
	let reg = /^1[0-9]{10}$/;
	return reg.test(str);
}

export function yc_isEmail(str) {
	let reg = /^[A-Za-z0-9_-]+([_\.][A-Za-z0-9_-]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/
	return reg.test(str);
}

export function yc_isName(str) {
	let reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/
	return reg.test(str);
}

export function yc_isNumber(str){
    var reg = /^\d+$/; // 非负整数
    return reg.test(str);
}

export function yc_isIdentityCard(str){
	var reg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|31)|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/;
	return reg.test(str);
}