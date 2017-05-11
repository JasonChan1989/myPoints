//数据相关
//捐款列表
var tBody = document.getElementById('t_body');
var MoneyList = [
    addMoneyList("张xx", 1, 10000000, "2013-12-15"),
    addMoneyList("邹xx", 2, 10000000, "2013-12-16"),
    addMoneyList("王xx", 3, 10000000, "2013-12-17"),
    addMoneyList("伍xx", 4, 10000000, "2013-12-12"),
    addMoneyList("周xx", 1, 10000000, "2013-12-11"),
    addMoneyList("伍xx", 4, 10000000, "2013-12-12"),
    addMoneyList("周xx", 1, 10000000, "2013-12-11"),
    addMoneyList("张xx", 1, 10000000, "2013-12-15"),
    addMoneyList("邹xx", 2, 10000000, "2013-12-16"),
    addMoneyList("王xx", 3, 10000000, "2013-12-17"),
    addMoneyList("伍xx", 4, 10000000, "2013-12-12"),
    addMoneyList("伍xx", 4, 10000000, "2013-12-12"),
    addMoneyList("周xx", 1, 10000000, "2013-12-11"),
    addMoneyList("周xx", 1, 10000000, "2013-12-11"),
    addMoneyList("张xx", 1, 10000000, "2013-12-15"),
    addMoneyList("邹xx", 2, 10000000, "2013-12-16"),
    addMoneyList("王xx", 3, 10000000, "2013-12-17"),
    addMoneyList("伍xx", 4, 10000000, "2013-12-12"),
    addMoneyList("伍xx", 4, 10000000, "2013-12-12"),
    addMoneyList("周xx", 1, 10000000, "2013-12-11"),
    addMoneyList("周xx", 1, 10000000, "2013-12-11"),
    addMoneyList("张xx", 1, 10000000, "2013-12-15"),
    addMoneyList("邹xx", 2, 10000000, "2013-12-16"),
    addMoneyList("王xx", 3, 10000000, "2013-12-17"),
    addMoneyList("伍xx", 4, 10000000, "2013-12-12"),
    addMoneyList("周xx", 1, 10000000, "2013-12-11"),
    addMoneyList("伍xx", 4, 10000000, "2013-12-12"),
    addMoneyList("周xx", 1, 10000000, "2013-12-11"),
    addMoneyList("张xx", 1, 10000000, "2013-12-15"),
    addMoneyList("邹xx", 2, 10000000, "2013-12-16"),
    addMoneyList("王xx", 3, 10000000, "2013-12-17"),
    addMoneyList("伍xx", 4, 10000000, "2013-12-12"),
    addMoneyList("伍xx", 4, 10000000, "2013-12-12"),
    addMoneyList("周xx", 1, 10000000, "2013-12-11"),
    addMoneyList("周xx", 1, 10000000, "2013-12-11"),
    addMoneyList("张xx", 1, 10000000, "2013-12-15"),
    addMoneyList("邹xx", 2, 10000000, "2013-12-16"),
    addMoneyList("王xx", 3, 10000000, "2013-12-17"),
    addMoneyList("伍xx", 4, 10000000, "2013-12-12"),
    addMoneyList("周xx", 1, 10000000, "2013-12-11"),
    addMoneyList("伍xx", 4, 10000000, "2013-12-12"),
    addMoneyList("周xx", 1, 10000000, "2013-12-11"),
];

//捐款单位列表
var OrgList = [{
    orgid: 1,
    name: "壹基金"
}, {
    orgid: 2,
    name: "xx十字会"
}, {
    orgid: 3,
    name: "宋庆龄基金"
}, {
    orgid: 4,
    name: "全xx基金"
}];

//添加数据的函数 (工厂方式创建对象);
// 问一下助教 哪种好一点
//  直接 return 对象
function addMoneyList(name, orgid, money, time) {
    return {
        name: name,
        orgid: orgid,
        money: money,
        time: time
    }
}

/*  创建一个对象然后返回
   function addMoneyList (name,orgid,money,time) {
    var obj={};
    obj.name=name;
    obj.orgid=orgid;
    obj.money=money;
    obj.time=time;
      return obj;
 }*/



// 根据orgid 获取捐款单位
// 疑问 问什么 直接传orgid 不行;
function getGroup(orgid) {
    var id = orgid;
    var groupNmae = undefined;
    OrgList.forEach(function (value, i, arr, orgid) {
        if (id == value.orgid) {
            groupNmae = value.name
        }
    })
    return groupNmae
}

function getGroupList(id) {

    var id = id;
    return MoneyList.filter(function (v, i) {
        if (id == v.orgid) {
            return true;
        }
    })
}

// 获取 表格默认数据
function getPageData(dataList, pageindex, pageSize) {
    //查询之前先清空
    tBody.innerHTML = '';

    // 使用数据的遍历方法  遍历对象 创建表格元素
    var pageindex = pageindex;

    dataList.forEach(function (value, i, arr) {
        //创建tr
        var tr = document.createElement('tr')
        // 创建 序号 td
        var tnum = document.createElement('td');
        // 如果序号按每一页的顺序排列 这选下面这个方法
        // 这个方法不可行 需要序号查找对应的数据进行修改或删除
        //tnum.innerHTML = (i + 1) + (pageindex - 1) * pageSize;
        // 如果 序号是这条数组在总数据里面的位置 就选下面的这方法
        tnum.innerHTML = MoneyList.indexOf(value) + 1;
        //创建捐款人
        var tname = document.createElement('td');
        tname.innerHTML = value.name;
        //创建捐款单位
        var tgroup = document.createElement('td');
        tgroup.innerHTML = getGroup(value.orgid);
        tgroup.setAttribute('orgid', value.orgid);
        //创建捐款钱数
        var tmoney = document.createElement('td');
        tmoney.innerHTML = value.money;
        //创建捐款事件
        var ttime = document.createElement('td');
        ttime.innerHTML = value.time;
        //创建 操作选项
        var toperate = document.createElement('td');
        //封装成一个函数 方便再次使用
        createBtn(toperate)



        //把 td 添加到tr中
        tr.appendChild(tnum);
        tr.appendChild(tname);
        tr.appendChild(tgroup);
        tr.appendChild(tmoney);
        tr.appendChild(ttime);
        tr.appendChild(toperate);


        //把tr 添加到表格的末尾;
        //这个东西咋用 和append啥区别
        //tBody.insertRow(-1);
        tBody.appendChild(tr);
    })
}



//设置一个页面可以显示多少条数据
var pageSize = 6;
//当前页数
var pageIndex = 1;
var pageindexDom = document.getElementById('pageindex');
pageindexDom.innerText = pageIndex;
//总页数
var pageTotal = Math.ceil(MoneyList.length / pageSize);
var pageCount = document.getElementById('count');

pageCount.innerText = pageTotal;

//以进页面默认拉一次数据

getOnePage(1)


// 根据页码获取数据
function getOnePage(pageIndex, dataList) {
    // 如果传入了获取数据了列表 就从传入的获取数据,没传或者传入空数组就从原列表获取数据

    // 判断传入值是不是空数组,如果是空数组则取默认的数组
    //这里有个坑 不能使用短路运算 dataList==dataList||MoneyList;
    //如果使用短路运算 传入空数组会直接去取值空数组,不符合需求(空数组为ture)
    //也不能判断dataList == [];
    // 因为相当于判断[]==[];偶没有什么好的写法
    //询问 助教y
    if (dataList == undefined) {
        dataList = MoneyList
    }
    if (dataList == 0) {
        dataList = MoneyList
    }


    //  var dataList=dataList || MoneyList;
    var pageindex = pageIndex;
    var start = (pageIndex - 1) * pageSize;
    var end = start + pageSize;
    var result = [];
    for (var i = start; i < end; i++) {
        // 排除undefined项
        if (!dataList[i]) {
            continue;
        }
        result.push(dataList[i]);
    }

    getPageData(result, pageindex, pageSize);
}



function createBtn (ele) {
    ele.innerHTML='';
           var update = document.createElement('a');
        update.setAttribute('href', 'javascript:void(0)');
        update.innerText = '编辑';
        update.className='update';
        var del = document.createElement('a');
        del.setAttribute('href', 'javascript:void(0)');
        del.innerText = '删除';
        del.className= 'del';
        //设置两个按钮的间距
        del.style.marginLeft = '10px';
        //把按钮添加到td
        ele.appendChild(update);
        ele.appendChild(del);
}