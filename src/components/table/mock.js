let data = [
    {
        key: '0aa',
        name: 'Edward King 0',
        age: 'https://link.yiche.com/hb2020/img/2x.9f2814ed.png',
        address: 'London, Park Lane no. 0',
    }, {
        key: '1bc',
        name: 'Edward King 1',
        age: '<img src="https://link.yiche.com/hb2020/img/1x.f1fd7f5e.png" style="width:40px;height:40px;"></img>',
        address: 'London, Park Lane no. 1',
    },
    // {
    //     key: '0c',
    //     name: 'Edward King 0',
    //     age: 'https://link.yiche.com/hb2020/img/2x.9f2814ed.png',
    //     address: 'London, Park Lane no. 0',
    // }, {
    //     key: '1c',
    //     name: 'Edward King 1',
    //     age: '<img src="https://link.yiche.com/hb2020/img/1x.f1fd7f5e.png" style="width:40px;height:40px;"></img>',
    //     address: 'London, Park Lane no. 1',
    // },
    // {
    //     key: '0b',
    //     name: 'Edward King 0',
    //     age: 'https://link.yiche.com/hb2020/img/2x.9f2814ed.png',
    //     address: 'London, Park Lane no. 0',
    // }, {
    //     key: '1b',
    //     name: 'Edward King 1',
    //     age: '<img src="https://link.yiche.com/hb2020/img/1x.f1fd7f5e.png" style="width:40px;height:40px;"></img>',
    //     address: 'London, Park Lane no. 1',
    // },
    // {
    //     key: '0a',
    //     name: 'Edward King 0',
    //     age: 'https://link.yiche.com/hb2020/img/2x.9f2814ed.png',
    //     address: 'London, Park Lane no. 0',
    // }, {
    //     key: '1a',
    //     name: 'Edward King 1',
    //     age: '<img src="https://link.yiche.com/hb2020/img/1x.f1fd7f5e.png" style="width:40px;height:40px;"></img>',
    //     address: 'London, Park Lane no. 1',
    // }
]

//column对象必须有dataIndex属性且唯一
let columns = [
    {
        title: '姓名',
        dataIndex: 'name',
        width: 100,
        fixed: 'left',
        hidden: 0, //hidden代表该列不显示
        disable: 1,
    }, {
        title: '年龄',
        dataIndex: 'age',
        width: 240,
    }, {
        title: '地址',
        dataIndex: 'address'
    }
];

let queryData = {
    data: data,
    columns: columns
}

export let getData = () => {
    return new Promise(function(resolve, reject) {
        setTimeout(() => {
            resolve(queryData);
        }, 100);
    });
};
