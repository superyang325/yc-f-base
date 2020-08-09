/**
 * 我们并没有一次性把ant-d的所有组件全部加载进来,可能我们的项目只是使用里面的30%左右,所以我们这里只是把我们用到的组件按需定义进来
 */

import Vue from 'vue';
import { 
    Button,
    BackTop,
    Empty,
    Layout,
    ConfigProvider,
    Icon, 
    Checkbox,
    Radio,
    Menu, 
    Row, 
    Col,
    Tabs,
    Select,
    Tag,
    Table,
    Input,
    InputNumber,
    Modal,
    Form,
    Message,
    Pagination,
    Tree,
    LocaleProvider,
    Dropdown,
    Popconfirm,
    Popover,
    TreeSelect, //这个将来删除,用的vue-treeselect组件,没有用蚂蚁的
    Switch,
    DatePicker,
    Cascader,
    Upload,
    Tooltip,
} from 'ant-design-vue';

export default {
    install() {
        Vue.use(Button);
        Vue.use(BackTop);
        Vue.use(Empty);
        Vue.use(Layout);
        Vue.use(ConfigProvider);
        Vue.use(Icon);
        Vue.use(Checkbox);
        Vue.use(Radio);
        Vue.use(Menu);
        Vue.use(Row);
        Vue.use(Col);
        Vue.use(Tabs);
        Vue.use(Select);
        Vue.use(Tag);
        Vue.use(Table);
        Vue.use(Input);
        Vue.use(InputNumber);
        Vue.use(Modal);
        Vue.use(Form);
        Vue.use(Message);
        Vue.use(Pagination);
        Vue.use(Tree);
        Vue.use(LocaleProvider);
        Vue.use(Dropdown);
        Vue.use(Popconfirm);
        Vue.use(Popover);
        Vue.use(TreeSelect);
        Vue.use(Switch);
        Vue.use(DatePicker);
        Vue.use(Cascader);
        Vue.use(Upload);
        Vue.use(Tooltip);
    }
}