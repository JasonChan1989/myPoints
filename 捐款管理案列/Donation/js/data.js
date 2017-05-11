//----------------1、初始化数据----------
var id = 0;
//捐款数组
var MoneyList = [
     addMoneyList("张xx", 1, 10000000, "2013-12-15"),
     addMoneyList("邹xx", 2, 10000000, "2013-12-16"),
     addMoneyList("王xx", 3, 10000000, "2013-12-17"),
     addMoneyList("伍xx", 4, 10000000, "2013-12-12"),
     addMoneyList("周xx", 1, 10000000, "2013-12-11"),
          addMoneyList("张xx", 1, 10000000, "2013-12-15"),
     addMoneyList("邹xx", 2, 10000000, "2013-12-16"),
     addMoneyList("王xx", 3, 10000000, "2013-12-17"),
     addMoneyList("伍xx", 4, 10000000, "2013-12-12"),
     addMoneyList("周xx", 1, 10000000, "2013-12-11"),
          addMoneyList("张xx", 1, 10000000, "2013-12-15"),
     addMoneyList("邹xx", 2, 10000000, "2013-12-16"),
     addMoneyList("王xx", 3, 10000000, "2013-12-17"),
     addMoneyList("伍xx", 4, 10000000, "2013-12-12"),
     addMoneyList("周xx", 1, 10000000, "2013-12-11"),
          addMoneyList("张xx", 1, 10000000, "2013-12-15"),
     addMoneyList("邹xx", 2, 10000000, "2013-12-16"),
     addMoneyList("王xx", 3, 10000000, "2013-12-17"),
     addMoneyList("伍xx", 4, 10000000, "2013-12-12"),
     addMoneyList("周xx", 1, 10000000, "2013-12-11"),
          addMoneyList("张xx", 1, 10000000, "2013-12-15"),
     addMoneyList("邹xx", 2, 10000000, "2013-12-16"),
     addMoneyList("王xx", 3, 10000000, "2013-12-17"),
     addMoneyList("伍xx", 4, 10000000, "2013-12-12"),
     addMoneyList("周xx", 1, 10000000, "2013-12-11"),
          addMoneyList("张xx", 1, 10000000, "2013-12-15"),
     addMoneyList("邹xx", 2, 10000000, "2013-12-16"),
     addMoneyList("王xx", 3, 10000000, "2013-12-17"),
     addMoneyList("伍xx", 4, 10000000, "2013-12-12"),
     addMoneyList("周xx", 1, 10000000, "2013-12-11"),
      addMoneyList("伍xx", 4, 10000000, "2013-12-12"),
     addMoneyList("周xx", 1, 10000000, "2013-12-11"),
];
//捐款单位数组
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
//1.1根据传入的参数返回一个对象
function addMoneyList(Pname, orgid, money, date) {
    id++;
    return { "id": id, "Pname": Pname, "orgid": orgid, "money": money, "date": date };

}
//1.2根据传入的id得到一个捐款单位
function getOrgObj(orgid) {
    //循环查找对象的受捐单位对象
    for (var i = 0; i < OrgList.length; i++) {
        //如果当前循环到的对象的orgid等于出入的orgid则返回该对象
        if (OrgList[i].orgid == orgid) {
            return OrgList[i];
        }
    }
}
//根据id返回一个对象
function getMoneyObjById(id) {
    //循环查找对象的受捐单位对象
    for (var i = 0; i < MoneyList.length; i++) {
        //如果当前循环到的对象的id等于出入的id则返回该对象
        if (MoneyList[i].id == id) {
            return MoneyList[i];
        }
    }
}
//根据id返回一个对象数组
function getMoneyObjListById(orgid) {
    //记录当前匹配元素
    var MoneObjList = [];
    //循环查找对象的受捐单位对象
    for (var i = 0; i < MoneyList.length; i++) {
        //如果当前循环到的对象的orgid与参入orgid相同者把循环到的对象记录到数组中
        if (MoneyList[i].orgid == orgid || orgid == -1) {
            MoneObjList.push(MoneyList[i]);
        }
    }
    //返回数组
    return MoneObjList;
}
//1.3根据id及传入的对象
function updateMoneyObjById(id, EditObj) {
    //根据id得到一个需要更新的对象
    var oldObj = getMoneyObjById(id);
    //用传入的对象的值覆盖老对象的值
    oldObj.Pname = EditObj.Pname;
    oldObj.orgid = EditObj.orgid;
    oldObj.money = EditObj.money;
    oldObj.date = EditObj.date;
}
//5、--------------分页-----------------
//当前页码
var pageindex = 0;
//页容量
var pagesize = 5;
//总页数
var pagecount = 0;
//5.1计算总页数
function getPageCount() {
    //计算总页数
    pagecount = Math.ceil(MoneyList.length / pagesize);
    //显示总页数
    getDom("count").innerHTML = pagecount;
}
//5.2获取下一页数据
function getNextPageData() {
    //页码加加
    pageindex++;
    //判断人加加后是否大于总页数，如果大于则提示最后一页
    if (pageindex > pagecount) {
        alert("骚年！！最后一页了");
        //把页码要减回去
        pageindex--;
        return;
    }
    //计算开始位置
    var startIndex = (pageindex - 1) * pagesize;
    //计算结束位置  结束为最大也就是数组长度，如果 pageindex * pagesize大于了数据总长度则使用数据的长度作为结束位置
    var endIndex = pageindex * pagesize > MoneyList.length ? MoneyList.length : pageindex * pagesize;
    //记录查询到对象
    var selectArr = [];
    //从开始位置循环，循环到结束为止 获取这中间的数据
    for (var i = startIndex; i < endIndex; i++) {
        selectArr.push(MoneyList[i]);
    }
    return selectArr;
}

//5.3获取上一页数据
function getPrePageData() {
    //页码--
    pageindex--;
    //判断人--后是否小于o，如果小于则提示是第一页
    if (pageindex <= 0) {
        alert("骚年！！第一页了");
        //把页码要减回去
        pageindex++;
        return;
    }
    //计算开始位置
    var startIndex = (pageindex - 1) * pagesize;
    //计算结束位置  
    var endIndex = pageindex * pagesize;
    //记录查询到对象
    var selectArr = [];
    //从开始位置循环，循环到结束为止 获取这中间的数据
    for (var i = startIndex; i < endIndex; i++) {
        selectArr.push(MoneyList[i]);
    }
    return selectArr;
}

//5.3获取当前页数据
function getCurrentPageData() {

    //计算开始位置
    var startIndex = (pageindex - 1) * pagesize;
    //计算结束位置  结束为最大也就是数组长度，如果 pageindex * pagesize大于了数据总长度则使用数据的长度作为结束位置、
    var endIndex = pageindex * pagesize > MoneyList.length ? MoneyList.length : pageindex * pagesize;
    //记录查询到对象
    var selectArr = [];
    //从开始位置循环，循环到结束为止 获取这中间的数据
    for (var i = startIndex; i < endIndex; i++) {
        selectArr.push(MoneyList[i]);
    }
    return selectArr;
}