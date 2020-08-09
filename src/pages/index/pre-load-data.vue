<template>
</template>
<script>
import { mapMutations } from 'vuex';
import { api_getTree } from 'api/tree';
import { api_getRegion } from 'api/region';
import { yc_regionDataProcess } from 'utils/region';

export default {
    created() {
        //console.log('提前取一些数据,并缓存')
        //this.cacheTreeselectData();
        this.cacheRegionData();
    },
    methods: {
        ...mapMutations([
            'updateTreeselectCache',
            'updateRegionCache'
        ]),
        async cacheRegionData() {
            let res = await api_getRegion({data: {}});
            res = yc_regionDataProcess(res);
            this.updateRegionCache(res);
        },
        cacheTreeselectData() {
            let treeselectUrlList = [
                '/tms/system/org/orgDetTree',
                '/tms/perms/dept/tree'
            ];
            treeselectUrlList.forEach(item => {
                this.getTreeselectData(item)
            });
        },
        async getTreeselectData(url) {
            let res = await api_getTree({
                url: url,
            });
            
            this.updateTreeselectCache({
                url: url,
                data: res
            });
        },
    }
}
</script>

