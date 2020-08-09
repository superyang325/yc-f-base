export default {
    state: {
        editStatus:'out'
    },
    mutations: {
        updateEditStatus(state,arg) {
            state.editStatus = arg
        }
    },
}