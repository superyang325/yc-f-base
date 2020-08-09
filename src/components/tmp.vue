<template>
    <div class="tmp">
        <y-table
            :options="options"
            :options-td-width="200"
            :scroll-x="1010"
            :height="400"
            :columns="columns"
            url="/tms/system/appCloud/pageList">
        </y-table>
    </div>
</template>
<script>
import yTable from './table/y-table'
import columns from './columns';
export default {
    data() {
        return {
            columns: columns,
            options: [
                {
                    text: '新增',
                    key: '1',
                    type: 'danger',
                    onClick(text, record) {
                        console.log('新增....')
                        console.log(text, record)
                    }
                },
                {
                    text: '编辑',
                    key: '2',
                    type: 'primary',
                    onClick(text, record) {
                        console.log('编辑....')
                        console.log(text, record)
                    }
                }
            ],
        }
    },
    components: {
        yTable
    }
}
</script>
<style lang="less">
.tmp{
    //height: 600px;
    width: 800px;
    background: skyblue;
}
</style>
