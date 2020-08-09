<template>
    <div class="yiche-iframe">
        <iframe :src="src" frameborder="0" 
                style="width:100%;background: #fff;position:absolute;left:0;height:100%;top:0px;"
                >
        </iframe>
    </div>
</template>
<script>
import { mapState } from "vuex";
export default {
    mounted() {
        this.updateById();
    },
    beforeRouteUpdate(to, from, next) {
        this.updateById();
        next();
    },
    computed: {
        ...mapState(["menuState"])
    },
    data() {
        return {
            src : ''
        }
    },
    methods: {
        updateById() {
            let src = '';
            let menuObj = this.menuState.currentMenu;
            src = menuObj.url;
            this.src = src;
        }
    }
}
</script>
