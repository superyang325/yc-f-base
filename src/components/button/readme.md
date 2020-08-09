使用场景
点击某按钮时,发起异步请求,此时使用该组件
最长时间限制,最短时间限制及api接口

success()  文字最终变为[xx成功],loading消失
finish()  文字为最初状态,loading消失

demo:
1.在页面引入
<y-button type="primary" class="login-btn" block @click="login" ref="xxRef">登录</y-button>

2.点击发起XX接口请求
let res = await login({
    query: {
        username: that.account,
        password: that.password
    }
});

3.调用方法,关闭loading效果,注意第1和第3步的ref值要对应
this.$refs['xxRef'].finish();