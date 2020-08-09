<template>
  <div class="edit-table-outer" >
  <a-table 
    :columns="columnsArr" 
    :dataSource="data" 
    :pagination="false" 
    class="edit-table"
    >
    <!-- rowKey="key" -->
    <template
      v-for="col in columnsArr"
      :slot="col.dataIndex"
      slot-scope="text, record, index">

      <!-- :title="col.userRender.getTitle(text,record,index,col.dataIndex)" -->
     
          <div
            v-if="col.dataIndex == 'isMain' && data.length >= 2 && carLen>=2"
            class="ellipsis"
            :style="getStyle(col,text,record)"
            >
            <img @click="mainChange(index,1)" v-if="!record.editable && text == 1" src="./img/flag_active.png" style="width:18px;height:18px;cursor: pointer;">
            <img @click="mainChange(index,1)" v-if="!record.editable && text == 0" src="./img/flag_cancel.png" style="width:18px;height:18px;cursor: pointer;">
          </div>

        <div
          v-if="col.dataIndex == 'carId' "
          class="ellipsis"
          :style="getStyle(col,text,record)"
          >
          <y-chose-car
            :fieldOptions="createCarFullNameOpt('',index)"
            :initData ="initData"
            @change="carChange($event,index)"
            :ref="'carChange' + index"
          >
          </y-chose-car>
        </div>
        
        <div class="ellipsis"
        :style="getStyle(col,text,record)"
        v-else-if="col.dataIndex == 'outerColorList' " 
        >
        <div
          v-show="record.colorTextObj.outerColorList"
          class="ellipsis car-color-text textshow" 
          :class="getCarColorTextClass('outerColorList',index)"
          @dblclick="colorDblclick('outerColorList',index)"
          style="text-align:left;" 
          v-html="getDefaultValue('outerColorList',index,true)">
        </div>

        <a-popover v-show="!record.colorTextObj.outerColorList" 
        :ref="'carColorPopover' + index" 
        placement="top"
        trigger="dblclick" 
        :getPopupContainer="getContainer" 
        @visibleChange="visibleChange_out($event,'outerColorList',index)"
        overlayClassName="car-color-popover">
        <!-- @dblclick="colorDblclick('outerColorList',index)" -->
          <div class="ellipsis car-color-text bottom-blue" 
            :class="getCarColorTextClass('outerColorList',index)" 
            @click="colorTextClick('outerColorList',index)"
            style="text-align:left;" 
            v-html="getDefaultValue('outerColorList',index,true)">
            
          </div>
          
          <span slot="title" v-html="getColorPopoverTitle('outerColorList')"></span>
          <template slot="content">
            <y-form-item-select 
              :fieldOptions="createOuterColorOpt('',index)"
              :initData ="initData"
              class="query-select"
              @change="outChange($event,index)"
              :ref="'outSelect' + index"
            >
            </y-form-item-select>
          </template>

        </a-popover>

        </div
        >
        <div
        v-else-if="col.dataIndex == 'innerColorList' " 
        class="ellipsis"
          :style="getStyle(col,text,record)"
        >
        <div
        v-show="record.colorTextObj.innerColorList"
        class="ellipsis car-color-text textshow" 
        :class="getCarColorTextClass('innerColorList',index)"
        @dblclick="colorDblclick('innerColorList',index)"
        style="text-align:left;" 
        v-html="getDefaultValue('innerColorList',index,true)">
      </div>
        
      <a-popover v-show="!record.colorTextObj.innerColorList" 
      :ref="'carColorPopover' + index" 
      placement="top"
      trigger="dblclick" 
      :getPopupContainer="getContainer" 
      @visibleChange="visibleChange_inn($event,'innerColorList',index)"
      overlayClassName="car-color-popover">
      
      
        <!-- @dblclick="colorDblclick('innerColorList',index)" -->
          
          <div class="ellipsis car-color-text bottom-blue" 
            :class="getCarColorTextClass(index)" 
            @click="colorTextClick('innerColorList',index)"
            style="text-align:left;"  
            v-html="getDefaultValue('innerColorList',index,true)">
            
          </div>
          
          <span slot="title" v-html="getColorPopoverTitle('innerColorList')"></span>
          <template slot="content">
          <y-form-item-select
            :fieldOptions="createInnerColorOpt('',index)"
            :initData ="initData"
            class="query-select"
            @change="innChange($event,index)"
            :ref=" 'innSelect' + index"
          >
          </y-form-item-select>

          </template>
        </a-popover>
          </div
        >
    
        <div
        v-else-if="col.dataIndex == 'quantity' " 
        class="ellipsis"
          :style="getStyle(col,text,record)"
        >

          <y-form-item-number
            :fieldOptions="createQuantityOpt('',index)"
            class="query-input"
            @change="quantityChange($event,index)"
            @blur="quantityBlur($event,index)"
            :ref=" 'quantity' + index"
          >
          </y-form-item-number>
        </div
        >

          <div
            v-else-if="col.dataIndex == 'remark' " 
            class="ellipsis"
            :style="getStyle(col,text,record)"
            >
            <div v-if="!initData">
              <y-form-item-input
                v-if="record.editable"
                :fieldOptions="createRemarkOpt('',index)"
                class="query-input input-remark"
                @change="remarkChange($event,index)"
              >
              </y-form-item-input>
              <!-- <template v-else>
                <span style="margin: -5px 0;display: inline-block;height: 32px;">{{text}}</span> 
              </template> -->
            </div>
            <div v-else>
               <y-form-item-input
                :fieldOptions="createRemarkOpt2('',index)"
                class="query-input input-remark"
                @change="remarkChange($event,index)"
                @blur="remarkBlur($event,index)"
                :isError="isError(index)"
              >
              </y-form-item-input>
            </div>
          </div>
    
          <div
            v-if="col.dataIndex == 'operation' " 
            :style="getStyle(col,text,record)"
            class="editable-row-operations ellipsis" 
            >
            <span v-show="record.editable && initData">
              <a @click="save(index)">保存</a>
            </span>
            <span v-if="!initData">
              <a @click="del(index)">删除</a>
            </span>
            <span v-show="!record.editable">
              <a v-if="!initData" @click="del(index)">删除</a>
              <a-popconfirm v-else
                title="确认删除此车型?"
                class="operation-td"
                placement='topRight'
                @confirm="del(index)">
                <a>删除</a>
              </a-popconfirm>
            </span>
          </div>
      
    </template>
  </a-table>
  <a-button v-show="data.length < 5" class="editable-add-btn" @click="handleAdd">添加意向车型</a-button>
 </div>
</template>

<script>
  function createCarFullNameOpt(fieldName,index){
    return {
            compType: 'region',
            label: '',
            id:'serialId',
            fieldName: 'serialId'+index,
            textProperty: 'serialName',
            defaultValue: this.getDefaultValue('carArr',index),
            cache:false,
            canSwitchToView:true,
            // popupVisible:true,
      }
  }
  function createOuterColorOpt(fieldName,index){
    return {
            compType: 'select-url',
            label: '',
            mode: 'tags',
            cache:false,
            fieldName: 'outerColorCustomize'+index,
            url: '/crmapi/car/getCarDetail',
            stopInitFetch:true,
            apiHttpPrefix:'//saas001.yichehuoban.cn',
            innerkey:'outsideBodyColor',
            typeProperty:'carId',
            typeValue:'1',
            hasDynamicQuerypar:true,
            urlDataAppendTotal: false,
            // withItems: true, //与接口返回值结构有关
            idProperty: 'id', //接口返回的对象哪个属性代表id,用户迭代时唯一性区分
            valueProperty: 'id', //接口返回的对象哪个属性代表value,用户向后台传值
            itemIsSimple: true, // 数组项的类型是简单类型 如 String、Number
            defaultValue: this.getDefaultValue('outerColorList',index),
            maxTagTextLength:10,
            // tips:{
            //   tipsTitle:'1',
            // },
           
      }
  }
  function createInnerColorOpt(fieldName,index){
      return {
            compType: 'select-url',
            label: '',
            mode: 'tags',
            cache:false,
            fieldName: 'innerColorCustomize'+index,
            url: '/crmapi/car/getCarDetail',
            // dontInitGetData:true,
            stopInitFetch:true,
            apiHttpPrefix:'//saas001.yichehuoban.cn',
            innerkey:'insideInteriorColor',
            typeProperty:'carId',
            typeValue:'1',
            hasDynamicQuerypar:true,
            urlDataAppendTotal: false,
            // withItems: true, //与接口返回值结构有关
            idProperty: 'id', //接口返回的对象哪个属性代表id,用户迭代时唯一性区分
            valueProperty: 'id', //接口返回的对象哪个属性代表value,用户向后台传值
            itemIsSimple: true, // 数组项的类型是简单类型 如 String、Number
            defaultValue: this.getDefaultValue('innerColorList',index),
            // useDivMode:true,
      }
  }
  function createQuantityOpt(fieldName,index){
    return {
            compType: 'number',
            label: '',
            fieldName: 'quantity'+index,
            defaultValue: this.getDefaultValue('quantity',index),
            min: 1,
            max:99,
            unit: '',
            // width: '100%',
            rules: [],
            labelCol: {  },
            wrapperCol: {  }
      }
  }
  function createRemarkOpt(fieldName,index){
    return {

            compType: 'input',
            defaultValue: this.getDefaultValue('remark',index),
            fieldName: 'remark'+index,
            rules: [],
            label:'',
            sufix:true,
            labelCol: {  },
            wrapperCol: {span: 24 },
            canSwitchToView:true,
            useDivMode:true,

      }
  }
  function createRemarkOpt2(fieldName,index){
    return {

            compType: 'input',
            defaultValue: this.getDefaultValue('remark',index),
            fieldName: 'remark'+index,
            rules: [],
            label:'',
            sufix:true,
            labelCol: {  },
            wrapperCol: {span: 24 },
            canSwitchToView:true,
            useDivMode:true,
            mode:'view'
            
      }
  }

  let columns = [
    {
      title: '意向车型',
      dataIndex: 'carId',
      width: (180 + 20),
      textWidth: (180 ),
      scopedSlots: { customRender: 'carId' },
      userRender:{
        getTitle(text,record,index,col){
          let title
          if(record){
            title = record
          }else{
            title = '--'
          }
          return title
        }
      }
    },
    {
      title: '外观颜色',
      dataIndex: 'outerColorList',
      width: (125 + 20),
      textWidth: (125 ),
      scopedSlots: { customRender: 'outerColorList' },
      userRender:{
        getTitle(text,record,index,col){
          let title = record[col].join(',')
          if(!title){
            title = '--'
          }
          return title
        }
      }
    },
    {
      title: '内饰颜色',
      dataIndex: 'innerColorList',
      width: (125 + 20),
      textWidth: (125 ),
      scopedSlots: { customRender: 'innerColorList' },
      userRender:{
        getTitle(text,record,index,col){
          let title = record[col].join(',')
          if(!title){
            title = '--'
          }
          return title
        }
      }
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      width: (40 + 20),
      textWidth: (40 ),
      scopedSlots: { customRender: 'quantity' },
      userRender:{
        getTitle(text,record,index,col){
          let title
          if(record){
            title = record[col]
          }else{
            title = '--'
          }
          return title
        }
      }
    },
    {
      title: '备注',
      class:'remark',
      dataIndex: 'remark',
      width: (122 + 20),
      textWidth: (122 ),
      scopedSlots: { customRender: 'remark' },
      userRender:{
        getTitle(text,record,index,col){
          let title
          if(record){
            title = record[col]
          }else{
            title = '--'
          }
          return title
        }
      }
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: (24 + 20),
      textWidth: (24 ),
      scopedSlots: { customRender: 'operation' },
      userRender:{
        getTitle(text,record,index,col){
          let title
          if(record){
            title = record
          }else{
            title = '--'
          }
          return title
        }
      }
    },
  ];
  let columns2 = [
    {
      title: '',
      dataIndex: 'isMain',
      width: (40 + 10),
      textWidth: (50),
      scopedSlots: { customRender: 'isMain' },
      userRender:{
      getTitle(text,record,index,col){
        let title
        if(record){
          title = record
        }else{
          title = '--'
        }
        return title
      }
    }
    },
    {
      title: '意向车型',
      dataIndex: 'carId',
      width: (200),
      textWidth: (180),
      scopedSlots: { customRender: 'carId' },
      userRender:{
        getTitle(text,record,index,col){
          let title
          if(record){
            title = record
          }else{
            title = '--'
          }
          return title
        }
      }
    },
    {
      title: '外观颜色',
      dataIndex: 'outerColorList',
      width: (120 + 20),
      textWidth: (120),
      scopedSlots: { customRender: 'outerColorList' },
      userRender:{
        getTitle(text,record,index,col){
          let title = record[col].join(',')
          if(!title){
            title = '--'
          }
          return title
        }
      }
    },
    {
      title: '内饰颜色',
      dataIndex: 'innerColorList',
      width: (120 + 20),
      textWidth: (120),
      scopedSlots: { customRender: 'innerColorList' },
      userRender:{
        getTitle(text,record,index,col){
          let title = record[col].join(',')
          if(!title){
            title = '--'
          }
          return title
        }
      }
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      width: (44),
      textWidth: (44),
      scopedSlots: { customRender: 'quantity' },
      userRender:{
        getTitle(text,record,index,col){
          let title
          if(record){
            title = record[col]
          }else{
            title = '--'
          }
          return title
        }
      }
    },
    {
      title: '备注',
      class:'remark',
      dataIndex: 'remark',
      width: (142),
      textWidth: (142),
      scopedSlots: { customRender: 'remark' },
      userRender:{
        getTitle(text,record,index,col){
          let title
          if(record){
            title = record[col]
          }else{
            title = '--'
          }
          return title
        }
      }
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: (24 + 20),
      textWidth: (24 ),
      scopedSlots: { customRender: 'operation' },
      userRender:{
        getTitle(text,record,index,col){
          let title
          if(record){
            title = record
          }else{
            title = '--'
          }
          return title
        }
      }
    },
  ];

  export default {
    name:'y-table-edit',
    data() {
      // this.cacheData = data.map(item => ({ ...item }));
      return {
        count:0,
        key:0,
        columns,
        columns2,
        columnsArr:[],
        carLen:0,
        notSave:false,
        isBlur:false,
        newData:{},
        // choseCar:[], // 每行的临时数据
        carArr:[],// 每行的临时数据
        isMain:'',
        outColor:[],// 每行的临时数据
        innColor:[],// 每行的临时数据
        quantity:'',// 每行的临时数据
        remark:'',// 每行的临时数据
        initSaveAll:true,
        visible:false,

        createCarFullNameOpt,
        createOuterColorOpt,
        createInnerColorOpt,
        createQuantityOpt,
        createRemarkOpt,
        createRemarkOpt2

      }
    },
    props:{
      data:{
        type:Array,
        // key:,
        default(){
          return []
        }
      },
      rowKey: {
          type: Number,
          default() {
              return 'key';
          }
      },
      initData:{
          type:Boolean,
          default(){
            return false
          }
      },
      businessDetailPending:{
        type:Boolean,
          default(){
            return true
          }
      },
      allSave:{
        type:Boolean,
        default(){
          return true
        }
      },
      errorNum:Array
    },
    watch:{
      data:{
        handler:function(newVal){
          this.data = newVal;
          this.carLen = newVal.length;
          if(this.notSave == true){
            this.carLen = newVal.length - 1;
          }
          console.log('www',newVal);
        },
        deep:true
      }
    },
    created(){
      if(this.initData){
        this.columnsArr = this.columns2;
      }else{
        this.columnsArr = this.columns;
      }
    },
    methods: {
      isError(num){
        if(this.errorNum.indexOf(num) != '-1'){
           return true;
        }else{
          return false;
        }
      },
      mainChange(index,value){
        console.log(index,this.data[index]);
        this.$emit("mainChange",this.data[index].id,value);
      },
      getDefaultValue(key,index,isShowText){
        let showText = this.initData
        if(key == 'carArr' && this.initData){
          return [this.data[index].serialId,this.data[index].carId]
        }else if(key === 'outerColorList' || key === 'innerColorList'){
          
          let arr = this.data[index][key],res
          // if(!this.data[index].colorTextObj[key]){
          //   return arr
          // }else{
          //   return arr.join('、')
          // }
          if(isShowText){
            if(arr.length){
              res = arr.join('、')
            }else{
              res = '-'
            }
          }else{
            res = arr
          }
          
          return res
        }else{
          // this.$forceUpdate();
          return this.data[index][key]
        }

      },
      getColorPopoverTitle(str){
        if(str === 'outerColorList'){
          return '外观颜色'
        }else if(str === 'innerColorList'){
          return '内饰颜色'
        }
      },
      getCarColorTextClass(str,index){
        return 'car-color-text'+str+index
      },
      // 颜色双击事件
      colorDblclick(str,index){
        
        this.data[index].colorTextObj[str] = false
        this.$forceUpdate()
        
      },
      // 文本单击
      colorTextClick(str,index){
        // debugger

      },
      // getDefaultValueText(key,index){
      //   if(this.initData){
      //     return [this.data[index].serialId,this.data[index].carId].join('、')
      //   }
      // },
      getStyle(column,text,record) {
          let result = {};
          if(column.textWidth) {
              result.width=column.textWidth+'px'
              result.maxWidth=column.textWidth+'px'
          }
          return result;
      },
      showData(){
        console.log(this.data);
      },
      getHtml(text, column, record) {
          return '-'
      },
      getContainer(e) {
          //console.log(e)
          return e.parentNode;
      },
      carChange($event,index){
        if(this.initData){
          if($event.length == 1){
            this.data[index].serialId = $event[0]
          }else if($event.length == 2){
            this.data[index].carId = $event[1]
          }
          if(this.data[index].id){
            this.$emit("carChange2",this.data[index].id,$event);
          }
          return;
        }
        console.log('carChange'+JSON.stringify($event))
        // this.choseCar = $event
        // this.carArr = [].concat($event)
        this.data[index].carArr = [].concat($event)
        if($event.length == 1){
          this.data[index].serialId = $event[0]
        }
        if($event.length == 2){
          this.data[index].carId = $event[1]
        }
        this.$emit("carChange",$event);
        this.save(index)
        
      },
      visibleChange_out(par,str,index){
        if(par){
          let that = this
            setTimeout(() => {
              let outSelectRef = that.$refs['outSelect'+index][0]
              // let innSelectRef = that.$refs['innSelect'+index][0]
              
              let carId = that.data[index].carId
              if(carId){
                let selectQueryPar = {carId}
                outSelectRef.getData(selectQueryPar)
              }

            },0)
        }else{
          this.data[index].colorTextObj[str] = true
          this.$forceUpdate()
        }
        
      },
      visibleChange_inn(par,str,index){
        if(par){
          let that = this
            setTimeout(() => {
              let innSelectRef = that.$refs['innSelect'+index][0]
              // let innSelectRef = that.$refs['innSelect'+index][0]
              // 隐藏选择车型框
              // this.$refs['carChange'+index][0].hidePop()
              
              let carId = that.data[index].carId
              if(carId){
                let selectQueryPar = {carId}
                innSelectRef.getData(selectQueryPar)
              }

            },0)
        }else{
          this.data[index].colorTextObj[str] = true
          this.$forceUpdate()
        }
        
      },
      outChange(data,index){
        this.outColor = data//this.outColor.concat(data)
        this.data[index].outerColorList = this.outColor
        if(data.length>5){
          this.data[index].outerColorList.pop()
          this.$message.error('外观颜色最多可选5个')
        }
        console.log('car-out'+JSON.stringify(this.outColor))
        this.$emit("outChange",data,index)
        this.$emit("outChange2",this.data[index].id,data)
      },
      innChange(data,index){
        this.innColor = data//this.innColor.concat(data)
        this.data[index].innerColorList = this.innColor
        if(data.length>5){
          this.data[index].innerColorList.pop()
          this.$message.error('内饰颜色最多可选5个')
        }
        console.log('car-inn'+JSON.stringify(this.innColor))
        console.log('car-inn-data'+JSON.stringify(data))
        this.$emit("innChange",data,index)
        this.$emit("innChange2",this.data[index].id,data)
      },
      quantityChange(data,index){
        this.quantity = data
        this.data[index].quantity = this.quantity
        console.log('quantityChange'+JSON.stringify(this.quantity))
        this.$emit("quantityChange",data,index)
        this.$emit("quantityChange2",this.data[index].id,data,index)
      },
      quantityBlur(data,index){
        this.$emit("quantityBlur",this.data[index].id,data,index);
        this.isBlur = true;
        setTimeout(() =>{
          this.isBlur = false;
        },500)
      },
      remarkChange(data,index){
        this.remark = data
        this.data[index].remark = this.remark
        this.$emit("remarkChange",data,index)
        this.$emit("remarkChange2",index,this.remark)
      },
      remarkBlur(data,index){
        this.$emit("remarkBlur2",this.data[index].id,data,index)
      },
      del(key) {
        if(!this.allSave && !this.initSaveAll && this.initData){
            this.$message.error("请先保存当前意向车型");
            return;
        }
        if(this.data.length == 1){
          this.$message.error('需要至少保留一个意向车型.');
          return
        }

        if(this.initData && this.businessDetailPending){
          this.$emit("delId",this.data[key].id)
        }else if(this.initData && !this.businessDetailPending){
          this.$message.error("存在未保存或保存中的数据");
          return;
        }

        this.data.splice(key,1)
        console.log('del::'+JSON.stringify(this.data))
        this.$emit('del',key)
      },
      save(key) {
        if(this.initData && !this.isBlur && !this.data[key].quantity){
          this.$message.error('请填写数量');
        }
        if(this.initData && !this.data[key].quantity){
          return;
        }
        if(this.initData && !this.data[key].serialId){
          this.$message.error('请先选择意向车型.');
          this.$emit("saveErr",key);
          return
        }
        if(this.initData){
          this.$emit("saveCar",this.data[key],key);
          this.data[key].editable = false;
        }
        this.$emit('save',this.data,key)
        this.notSave = false;
        console.log('save::'+JSON.stringify(this.data))
      },
      handleAdd() {
        this.isBlur = false;
        if(this.initData && !this.initSaveAll && !this.businessDetailPending){
            this.$message.error("存在未保存或保存中的数据");
            return;
        }
        if(!this.allSave && !this.initSaveAll && this.initData){
            this.$message.error("请先保存当前意向车型");
            return;
        }
        console.log("this.count::"+this.count)
        this.newData = {
          key: this.count++,
          random:Math.random(),
          carArr:this.carArr,
          serialId:null, // 车型Id
          carId: null, // 车款Id
          innerColorList:[],
          isMain: 0,
          outerColorList:[],
          quantity:1,
          remark:'',
          editable:true,
          colorTextObj:{
            outerColorList:true,
            innerColorList:true,
          },
          
        }
        this.data.push(this.newData);
        this.initSaveAll = false;
        this.$emit("handle")
        this.notSave =true;
        console.log('handleAdd::'+JSON.stringify(this.data))
      },
    },
  };
</script>
<style  lang="less">
/*车型颜色展示文本*/
/*bottom-blue*/
.car-color-text{
  min-height: 18px;
  height: 32px;
  line-height: 32px;
  padding-bottom: 6px;
    &.bottom-blue{
      border-bottom: 1px solid #3366FF;
    }
  }
/*车型颜色popover*/
.car-color-popover{
  width: 454px;
  font-size:14px;
  font-family:MicrosoftYaHei;
  color:rgba(60,84,132,1);
  
  /*title*/
  .ant-popover-title{
    font-size:14px;
    font-family:MicrosoftYaHei;
    color:rgba(60,84,132,1);
    border-bottom:0 !important;
  }
  /*内容*/
  .ant-popover-inner-content{
    padding-top: 0 !important;
    .ant-select-selection__rendered{

        .select-option-default{
          font-size:12px !important;
          font-family:MicrosoftYaHei;
          color:rgba(60,84,132,1);
        }
      
    }
       
    

    .ant-select-selection.ant-select-selection--multiple{
        border: 1px solid #DBE0E7 !important;
      }
  }

}
/*列padding*/
  .edit-table-outer .ant-table-thead th{
    padding: 10px 10px 10px 0 !important;
  }
  .edit-table-outer .ant-table-thead > tr:first-child > th:first-child {
    padding-left: 12px !important;
  }


  .item-default-input .ant-form-item-control-wrapper{
    margin-left: 0 !important;
  }
  .edit-table-outer{
    margin-top: 20px;
    .editable-add-btn{
      width: 760px;
      height: 32px;
      margin-top: 8px;
      font-size:12px;
      font-family:MicrosoftYaHei;
      color:rgba(60,84,132,1);
      background:url(./img/add.png) no-repeat 43% center;

    }
    .ant-table-placeholder{
      display: none;
    }

    .ant-table-tbody > tr > td{
      padding:0 !important;
    }
    td.remark{
      div{
        text-align:left;
        height: 40px;
        /* line-height: 28px; */
        span{
          display: inline-block;
          /* height: 28px; */
          line-height: 40px;
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
  .edit-table-outer{
    table{
      font-size: 12px;
      color:#3C5484;
    }
    .ant-table-tbody > tr > td{
      padding-top:10px !important;
      padding-bottom:10px !important;
      text-align:center;
      vertical-align:middle;
    }
    .query-select{
      /* width:120px; */
    }
    .ant-input{
      /* margin-top:4px; */
    }


    .query-input{
    /* .ant-form-item-control-wrapper{
      margin-left: 0 !important;
    } */
    .ant-input-number{
      border-left: 0;
      border-top: 0;
      border-right: 0;
    }
  }

  .ant-input-number-handler-wrap{
    right:0px;
  }

  .item-default-input .ant-form-item-control-wrapper{
    margin-left: 0 !important;
  }

  .ant-input-number-input{
    padding:0 !important;
  }

  .modal-form-double .ant-modal-content .ant-modal-body .ant-input-number{
    width:40px !important;
  }
  .ant-input{
    padding:0 !important;
  }

  .ant-cascader-picker-label{
    padding:0 !important;
  }

  .editable-row-operations a{
    margin-right: 0 !important;
  }
  }

  
  
  
</style>
