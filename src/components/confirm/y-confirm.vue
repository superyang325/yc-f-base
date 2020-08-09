<template>
  <div >
    <!-- <a-button type="primary" @click="showModal">批量删除</a-button> -->
    <a-modal
      v-model="showFlag"
      :title="fieldOptions.title"
      :width="fieldOptions.width"
      :content="fieldOptions.content"
      :wrapClassName="fieldOptions.wrapClassName"
      centered
      class="confirm-modal-class"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
      @ok="ok"
      :okButtonProps="okButtonProps"
    >
    <slot name="content" :aa="contentTest">
      <!-- 默认内容 -->
    </slot>
    <!-- <template slot="content">
    </template> -->
  </a-modal>
  </div>
</template>

<script>
export default {
  name:'y-confirm',
  data() {
      return {
        contentTest:'aaaaaa',
        ModalText: 'Content of the modal',
        showFlag: true,
        confirmLoading: false,
      };
  },
  
  props:{
    fieldOptions:{
      type:Object,
      default(){
        return {}
      }
    },
    okButtonProps:Object,
  },
  methods:{
    showModal() {
      this.showFlag = true;
    },
    ok(e) {
      this.$emit('ok',e)
    },
    handleCancel(e) {
      this.$emit('close')
    },
  },
  
};
</script>

<style lang="less">
.confirm-modal-class{
  .ant-modal-content{
    border-radius: 0;
  }
  .ant-modal-close-x{
    width: 52px;
    height: 48px;
    line-height: 48px;
  }
  .ant-modal-header{
    height:48px;
    padding: 14px 20px;
    .ant-modal-title{
      font-size:16px;
      font-family:MicrosoftYaHei-Bold,MicrosoftYaHei;
      font-weight:bold;
      color:rgba(60,84,132,1);
    }
  }
  .ant-modal-body{
    padding:  20px;
  }
  .ant-modal-footer{
    padding: 8px 20px;
  }
  .ant-btn-primary{ 
    background-color:#3366FF;
    border:1px solid #3366FF;
  }
  .ant-btn-primary[disabled]{
    background-color:#84A3FF;
    color:#fff;
    border:none;
  }
  .ant-select-selection{
    border:1px solid #dbe0e7;
    border-radius:0;
  }
  .ant-input{
    border:1px solid #dbe0e7;
    border-radius:0;
  }
}
</style>
