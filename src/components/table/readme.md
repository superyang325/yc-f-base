## 使用说明
1.提供options属性注入,传入的参数demo:
```
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
```
每一个对象代表一个按钮,必须有key且值唯一

2.后端提供的api返回值必须包含data及columns两部分,其中columns中的对象必须有title,dataIndex属性,其中dataIndex值唯一
为了使表格具有自适应性,虽然每个column对象都可以设置width属性,但请至少保证至少一个不固定列不要设置width属性,width设置时最好设置成px
```
let columns = [
    {
        title: '姓名',
        dataIndex: 'name',
        width: 100,
        fixed: 'left',
        hidden: 0, //hidden代表该列不显示
        disable: 1, //代表不可编辑,即在可选列表中不能改变其隐藏显示状态
    }, {
        title: '年龄',
        dataIndex: 'age',
        width: 240,
    }, {
        title: '地址',
        dataIndex: 'address'
    }
];
```

3.scroll-x传进去的宽度,一定要大于表格总体宽度,具体多少需要参考columns中宽度的设定,建议指定 scroll-x 为大于表格宽度的固定值或百分比。注意，且非固定列宽度之和不要超过 scroll-x。


## 对不齐的问题
https://blog.csdn.net/baozhuona/article/details/94007661

如果一个表格需要设置固定列,则一定要保证,至少有四个以上的不固定列存在才行