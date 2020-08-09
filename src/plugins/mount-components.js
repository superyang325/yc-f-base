/**
 * 我们并没有一次性把ant-d的所有组件全部加载进来,可能我们的项目只是使用里面的30%左右,所以我们这里只是把我们用到的组件按需定义进来
 */

import Vue from 'vue';
import yButton from 'components/button';
import ySelect from 'components/select';
import yTable from 'components/table';
import yTableEdit from 'components/table-edit';
import yLogo from 'components/logo';
import yChoseCar from 'components/chose-car';

import yFormItemInput from 'components/form-item-input';
import yFormItemSelect from 'components/form-item-select';
import yFormItemColorSelect from 'components/form-item-colorSelect';
import yFormItemTextarea from 'components/form-item-textarea';
import yFormItemIcon from 'components/form-item-icon';
import yFormItemColor from 'components/form-item-color';
import yFormItemNumber from 'components/form-item-number';
import yFormItemSwitch from 'components/form-item-switch';
import yFormItemRadio from 'components/form-item-radio';
import yFormItemCheckbox from 'components/form-item-checkbox';
import yFormItemTree from 'components/form-item-tree';

import yTreeselect from 'components/tree-select';
import yRegion from 'components/region';
import yDateBetween from 'components/date-between';
import yDateSingle from 'components/date-single';
import yDate from 'components/date';

import yLabelQuery from 'components/label-query';
import yLabel from 'components/label';

import yPopOver from 'components/pop-over';
import addMoreInfo from 'components/add-more-info';
import yConfirm from 'components/confirm';


export default {
    install() {
        Vue.use(yTable);
        Vue.use(yTableEdit);
        Vue.use(yButton);
        Vue.use(ySelect);
        Vue.use(yLogo);
        Vue.use(yChoseCar);
        

        Vue.use(yFormItemInput);
        Vue.use(yFormItemSelect);
        Vue.use(yFormItemColorSelect);
        Vue.use(yFormItemTextarea);
        Vue.use(yFormItemIcon);
        Vue.use(yFormItemColor);
        Vue.use(yFormItemNumber);
        Vue.use(yFormItemSwitch);
        Vue.use(yFormItemRadio);
        Vue.use(yFormItemCheckbox);
        Vue.use(yFormItemTree);

        Vue.use(yTreeselect);
        Vue.use(yRegion);
        Vue.use(yDateBetween);
        Vue.use(yDateSingle);
        Vue.use(yDate);

        Vue.use(yLabelQuery);
        Vue.use(yLabel);

        Vue.use(yPopOver);
        Vue.use(addMoreInfo);
        Vue.use(yConfirm);
    }
}