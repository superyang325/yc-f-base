<template>
    <div class="y-color-select" id="Select">
      <a-form-item 
        :label="fieldOptions.label" 
        :label-col="fieldOptions.labelCol" 
        :wrapper-col="fieldOptions.wrapperCol"
      >
        <a-select 
            :size="fieldOptions.size ? fieldOptions.size : 'default'" 
            style="width: 200px" 
            dropdownClassName="y-color-select-dropdown"
            allowClear = true
            :getPopupContainer="
              triggerNode => {
                return triggerNode.parentNode || document.body;
              }
            "
            v-decorator="[
                fieldOptions.fieldName,
                { 
                    initialValue: fieldOptions.defaultValue,
                    rules: rules
                }
            ]"
            :title="titleValue"
            @change="handleChange" 
            placeholder="请选择ICON色值" 
        >
          <a-select-option value="burlywood">
            <div class="y-ant-selection-common" style="background-color:burlywood;"></div>
          </a-select-option>
          <a-select-option value="black">
            <div class="y-ant-selection-common" style="background-color:black;"></div>
          </a-select-option>
          <a-select-option value="red">
            <div class="y-ant-selection-common" style="background-color:red;"></div>
          </a-select-option>
          <a-select-option value="yellow">
            <div class="y-ant-selection-common" style="background-color:yellow;"></div>
          </a-select-option>
        </a-select>
      </a-form-item>
    </div>
</template>
<script>
export default {
  name: 'y-form-item-colorSelect',
  data(){
    return{
       rules: [],
    }
  },
  props: {
    fieldOptions: Object,
    err: Object,
  },
  created(){
     this.getRules();
  },
  methods: {
    handleChange(e) {
      if(e=='') {
          this.titleValue = '全部';
      }else {
          this.titleValue = e;
      }
      this.$emit('change', e);
    },
    getRules() {
        let result = [];
        if(Array.isArray(this.fieldOptions.rules) && this.fieldOptions.rules.length > 0) {
            result = this.fieldOptions.rules;
        }
        this.rules = result;
    }
  },
};
</script>

<style lang="less">
.y-color-select{
  .ant-select-selection__rendered{
    padding-top: 2px;
  }
}
.y-color-select-dropdown{
  .ant-select-dropdown-menu{
    overflow: hidden;
    .ant-select-dropdown-menu-item{
      float: left;
      padding: 5px 0 5px 12px;
    }
    .ant-select-dropdown-menu-item:hover{
      background: white !important;
    }
    .ant-select-dropdown-menu-item-active{
      background: white !important;
    }
    .ant-select-dropdown-menu-item-selected{
      div{
        // background-image:url('@jcptht/static/thick-check.png');
        background-repeat: no-repeat;
        background-position-x: center;
        background-position-y: center;
      }
    }
  }
}
.y-ant-selection-common{
  width:35px;
  height:25px;
  background-color:burlywood;
}
</style>