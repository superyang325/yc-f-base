import { mapState, mapMutations } from 'vuex';

/*
    author:dongbo 
    email:dongbo@yiche.com

    <div v-show="!isShowEditMode" @dblclick="toEdit" @contextmenu.prevent="toEdit" class="form-item-wrap">
    {{this.titleValue||'--'}}
    </div>

    <a-select v-show="isShowEditMode"
        @change="onChange"
        @blur="onBlur"

    import {switchEdit} from 'components/switchEditJs/swithEdit'

    export default {
        mixins: [switchEdit] ,
    }

    mounted() {
        this.setFieldsValue({status: 1});
        //
        if(!this.fieldOptions.stopInitFetch){
            this.UpdateTitleValue();
        }
        
    },
*/

export let switchEdit = {
    mounted() {
        this.UpdateTitleValue();
    },
    data() {
        return {
            titleValue: '',
            canSwitchToView: this.fieldOptions.canSwitchToView || false,
            useDivMode: this.fieldOptions.useDivMode || false,
            mode:this.fieldOptions.mode || 'edit',
            inputObj:null
        }
    },

    computed: {
        ...mapState(['cacheState']),
        total() {
            return this.fieldOptions.total || 5;
        },
        isShowEditMode() {
            //console.log('isShowEditMode canSwitchToView=' + this.canSwitchToView + ' this.mode=' + this.mode );

            if(this.canSwitchToView && this.mode == 'view') {
                //console.log('is show = false');
                if(!this.useDivMode)
                    return true;
                return false;
            }
            //console.log('is show = true');
            return true;
        },
        getTitleValue(){
            return this.titleValue || this.fieldOptions.defaultValue || '-';
        }
    },    
    methods: {
        getViewDivClassName(){
            return "form-input-" + this.fieldOptions.fieldName + "-view"
        },
        UpdateTitleValue(){
            this.D(" UpdateTitleValue defaultValue = " + this.fieldOptions.defaultValue,this.fieldOptions);
            var selectedItemObj = this.getSelectItemByKey(this.fieldOptions.defaultValue);
            if(selectedItemObj != null)
                this.titleValue = selectedItemObj[this.fieldOptions.textProperty];
            this.D(" UpdateTitleValue titleValue = " + this.titleValue);
        },
        getSelectItemByKey(){
            //留给控件自己去定义
        },
        onBlur(e){
            console.log('onBlur ----');
            this.switchToView();
        },
        onLoad(e){
            D.msg(" onLoad --------- ",e);
            this.inputObj = e;
        },
        toEdit() {
            console.log('int toEdit swith mode = edit')
            this.switchToEdit();
        },
        switchToEdit(){
             if(!this.canSwitchToView) {
                return;
            }
            this.mode = 'edit';
            //var iobj = this.$refs[this.fieldOptions.fieldName + '_edit_obj'].$refs.input;
            //this.D("swithToEdit -------------- refs.input " + this.fieldOptions.fieldName + '_edit_obj',iobj);
            //this.$refs[this.fieldOptions.fieldName + '_edit_obj'].$refs['input'].focus();
            //this.$refs[this.fieldOptions.fieldName + '_edit_obj'].$refs['input'].click();
            //this.$refs[this.fieldOptions.fieldName + '_edit_obj'].focus();
            //iobj.value = 'abc';
            //iobj.setSelectionRange(0,iobj.value.length);
            //this.D("swithToEdit -------------- input.value " + iobj.value);
            
            //this.D("swithToEdit --------------" + this.fieldOptions.fieldName + '_edit_obj',this.$refs[this.fieldOptions.fieldName + '_edit_obj']);
        },
        switchToView(){
            if(!this.canSwitchToView) {
                return;
            }
            this.mode = 'view';
        },
        toView(e) {
            console.log('in toView swith mode = view')
            this.$emit('blur',e);
            this.$emit("blur2",e.target.value.trim(),this.fieldOptions.fieldName);
            switchToView();
        },
        D(msg,obj=null){
           console.log(this.fieldOptions.fieldName + " " + msg + " --------------");
           if(obj != null)
                console.log(obj); 
        }
    },
}