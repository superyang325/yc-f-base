<template></template>
<script>
import { mapMutations } from 'vuex';
export default {
    created() {
        this.updateErrorInfo({
            code: 404,
            desc: '此页面空空如也'
        });
    },
    methods: {
        ...mapMutations(['updateErrorInfo'])
    }
}
</script>

