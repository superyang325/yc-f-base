export default {
    state: {
        errorInfo: {
            // imgUrl: '',
            // code: 404,
            // desc:'此页面空空如也'
        },
    },
    mutations: {
        updateErrorInfo(state, payload) {
            state.errorInfo = payload;
        },
        resetErrorInfo(state, payload) {
            state.errorInfo = {};
        },
    },
}