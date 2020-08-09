<template>
    <div class="contacts">
        <a-popover trigger="click" v-model="visible">
            <template slot="content">
                <ul class="y-contacts-ul">
                    <li v-for="item in list"
                        :key="item.className"
                        :class="getClass(item)"
                        @click="itemClick(item)">
                        <div :class="'img '+item.className"></div>
                        <span class="txt">{{item.name}}</span>
                    </li>
                </ul>
            </template>
        </a-popover>
    </div>
</template>
<script>
export default {
    data() {
        return {
            visible: false,
            list: [
                {
                    name: '手机',
                    className: 'img-phone',
                    disabled: false,
                    type: 'phone'
                },
                {
                    name: '微信',
                    className: 'img-wechat',
                    disabled: false,
                    type: 'wechat'
                },
                {
                    name: '地址',
                    className: 'img-address',
                    disabled: false,
                    type: 'address'
                },
                {
                    name: '邮箱',
                    className: 'img-email',
                    disabled: false,
                    type: 'email'
                }
            ]
        }
    },
    methods: {
        show() {
            this.visible = true;
        },
        itemClick(item) {
            console.log(item)
            // this.$emit('phone-click', item);
            // this.$emit('email-click', item);
            this.$emit(item.type+'-click', item);
            this.hide();
        },
        hide() {
            this.visible = false;
        },
        disabled(type) {
            let obj = this.list.find(item => {
                item.type == type;
            })
            obj.disabled = true;
        },
        enabled(type) {
            let obj = this.list.find(item => {
                item.type == type;
            })
            obj.disabled = false;
        },
        getClass(item) {
            let result = [];
            if(item.disabled) {
                result.push('item-disabled')
            }else {
                result.push('item-enabled');
            }
            return result;
        }
    }
}
</script>
<style lang="less" scoped>
.y-contacts-ul{
    overflow: hidden;
    li{
        float: left;
        width: 60px;
        height: 60px;
        margin-right: 4px;
        background: #FFFFFF;
        display: flex;
        flex-direction: column;
        justify-content: center;
        cursor: pointer;
        align-items: center;
        .txt{
            margin-top: 8px;
            font-size: 12px;
            color: #3C5484;
        }
        .img-phone,.img-wechat,.img-address,.img-email{
            width: 20px;
            height: 20px;
        }
        .img-phone{
            background-image: url('./img/phone.png');
            background-position: 0 0;
            background-size: 20px auto;
        }
        .img-wechat{
            background-image: url('./img/wechat.png');
            background-position: 0 0;
            background-size: 20px auto;
        }
        .img-address{
            background-image: url('./img/adress.png');
            background-position: 0 0;
            background-size: 20px auto;
        }
        .img-email{
            background-image: url('./img/email.png');
            background-position: 0 0;
            background-size: 20px auto;
        }
        &:hover {
            background: #E6ECFF;
            .txt{
                color: #3366FF;
            }
            .img-phone,.img-wechat,.img-address,.img-email{
                background-position: 0 -20px;
            }

        }
    }
} 
</style>


