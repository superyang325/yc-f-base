<template>
    <div class="popover-trans" v-if="isShow">
      <a-popover 
        :placement="fieldOptions.placement" 
        :getPopupContainer="getContainer"
        :trigger="fieldOptions.trigger ? fieldOptions.trigger : 'click'" 
        :overlayClassName="fieldOptions.wrapClassName"
        destroyTooltipOnHide=true 
        v-model="visible"
        @visibleChange="visibleChange">
        <template slot="content" scoped-slot="text,index">
          <a-form :form="form" layout="horizontal">

            <div >
              <div >
                <span class="row-title">
                  <span class="required-dot">*</span>
                  <span class="select-title">
                    {{fieldOptions.selectTitle}}
                  </span>
                </span>
              </div>
              <div >
                <y-form-item-select
                  style="width: 100%;"
                  :fieldOptions="fieldOptions"
                  class="query-select"
                  @change="selectChange"
                  @dataed="dataed"
                >
                </y-form-item-select>
               </div>
            </div>    
            <div>
              <div>
                <span class="title-area">
                  {{fieldOptions.areaTitle}}
                </span>
              </div>
              <div  style="position: relative;">
                <a-textarea
                  v-decorator="['description', {
                    rules: [{ required: false, message: '请输入转移原因' }]
                  }]"
                  :rows="4"
                  @change="textareaChange" 
                  :maxlength="fieldOptions.maxlength ? (fieldOptions.maxlength + 1):50"
                  placeholder="请输入转移原因"
                />
                <span class="count"><span :style="{color: currentLength == (fieldOptions.maxlength+1) ? 'red': ''}">{{currentLength}}</span><span>/{{fieldOptions.maxlength}}</span></span>
              </div>
            </div>
          </a-form>
        </template>
        <span slot="title">Title</span>
        <slot name="hover" :options="fieldOptions">
          <y-button type="primary" @click="show" :isLoading = false>{{fieldOptions.btnText}}</y-button>
        </slot>

      </a-popover>
    </div>
</template>

<script>
export default {
    name:'y-popover',
    data() {
        return {
          form: this.$form.createForm(this, { name: 'coordinated' }),
          visible: false,
          subObj:{},
          currentLength: 0,
          errorFlag:false,
          lengthError: false,
        };
    },
    computed:{
      selectFieldOptions(){
        return {
          selectTitle:this.fieldOptions.selectTitle, //'业务员',
          areaTitle:this.fieldOptions.areaTitle, //'备注',
          compType:  this.fieldOptions.compType, // 'select-url',
          defaultValue: '',
          fieldName: this.fieldOptions.fieldName, // 'customerSource',
          rules: [],
          label:this.fieldOptions.label, //'业务员',  // 'customerSource',
          cache:false,
          url: this.fieldOptions.url,  // 'customerSource', //'/tms/system/tag/getTenantTagListByGroupCode',
          typeProperty:this.fieldOptions.typeProperty, //'tagGroupCode',
          typeValue:this.fieldOptions.typeValue, //'kehu_laiyuan',
          idProperty: this.fieldOptions.idProperty, //'id', //接口返回的对象哪个属性代表id,用户迭代时唯一性区分 // 
          valueProperty: this.fieldOptions.valueProperty, //'tagCode', //接口返回的对象哪个属性代表value,用户向后台传值
          textProperty: this.fieldOptions.textProperty, //'tagName', //接口返回的对象哪个属性代表text,用户显示
          urlDataAppendTotal:this.fieldOptions.urlDataAppendTotal,
          placeholder:this.fieldOptions.placeholder,
          labelCol: {  },
          wrapperCol: {span: 24 },

          isFilterData: true,
          filterId: this.fieldOptions.filterId ,
          // filterData:function(targetId,data){
            
          // },
        }
      }
    },
    props:{
      fieldOptions:Object,
      
    },
    methods:{
      getContainer(e) {
          //console.log(e)
          return e.parentNode;
      },
      show(){
        this.visible = true
      },
      isShow(){
         return this.visible
      },
      
      selectChange(data){
        this.subObj[this.fieldOptions.fieldName] = data
        
        this.$emit('selectChange',data)
      },
      textareaChange(e) {
        let val = e.target.value;
        this.currentLength = val.trim()
        console.log("val::"+val)

        let fieldName = this.fieldOptions.fieldName2;
        if(this.fieldOptions.maxlength){
            this.currentLength = e.target.value.trim().length;
            if(this.currentLength > this.fieldOptions.maxlength){
              this.errorFlag = true
              this.lengthError = true
              return
            }else{
              this.errorFlag = false
              this.lengthError = false
            }
        }
        console.log("subObj2::"+JSON.stringify(this.subObj))

        this.subObj[this.fieldOptions.fieldName2] = val
        console.log("textareaval:"+val)
        this.$emit('textareaChange',val.trim())

      },
      
      visibleChange(e){
        if(!e){
          // 隐藏
          if(this.lengthError){
            this.$message.error('请输入50字')
            return
          }
          if(this.errorFlag){
            return
          }
          // 校验通过。emit
          this.$emit('emitdata',this.subObj)
          // 每次隐藏初始化数据
          this.subObj = {}
        }else{
          this.currentLength = 0
          this.errorFlag = false
          this.lengthError = false
        }
      }
    }
};
</script>

<style lang="less">
.ant-select{
  width: 100%;
}
.required-dot{
  color:rgba(245,34,45,1);
  font-size: 12px;
}
.ant-input{
  /* min-height: 165px; */
}
.detail-header-popover{
  .ant-form{
    float: none !important; 
  }

}
.popover-trans{
  .ant-form{
    display: block;
  }
.ant-popover{
    width: 280px;
    height: 228px;
    .ant-select-selection{
      border: 1px solid rgba(219,224,231,1);
      border-radius: 0;
    }
    .ant-input{
      border: 1px solid rgba(219,224,231,1);
      border-radius: 0;
    }
    .ant-popover-title{
      display: none;
    }
    .select-title{
      font-size:14px;
      font-family:MicrosoftYaHei;
      color:#3C5484;
    }
    .title-area{
      display: inline-block;
      margin-bottom: 3px;
    }

    .count{
      position: absolute;
      bottom: 6px;
      right: 5px;
    }


    .query-zone .query-select{
      left:0;
    }
    .query-select .ant-select-enabled .ant-select-selection__placeholder{
      color:#849cc0 !important;
    }
    .ant-select-selection{
      background-color: transparent;
    }

}  
}
</style>
