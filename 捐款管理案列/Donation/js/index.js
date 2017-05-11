// 捐款单位下拉表单初始数据的拉去
// 一进页面 先拉取一次数据
var sel = document.getElementById('s_select');
var sel2 = document.getElementById('addselect');
getSelData(sel)
getSelData(sel2)

function getSelData(ele) {

    for (var i = 0; i < OrgList.length; i++) {
        var opt = document.createElement('option');
        opt.setAttribute('value', OrgList[i].orgid);
        opt.innerText = OrgList[i].name;
        ele.appendChild(opt)
    }

}

// 这里遇见了一个问题 , 我想分开两个模块取写 一个数据模块 一个页面逻辑模块
// 但是 全局变量就不能相互访问了 怎么解决
// 两个模块都用了addEventListener('load')

//发现原版一个bug 当数据到最后一起 切换团体 并查询的时候 数据页数没有重置

//点击下一页按钮 切换数据

var nextBtn = document.getElementById('nextpage');
nextBtn.onclick = function () {

    if (pageIndex >= pageTotal) {
        alert('到底了少年');
        return
    }
    pageIndex++;
    pageindexDom.innerText = pageIndex;
    var selValue = parseInt(sel.value);

    getOnePage(pageIndex, getGroupList(selValue))
}

//点击上一页按钮 切换数据


var preBtn = document.getElementById('prepage');

preBtn.onclick = function () {
    if (pageIndex < 2) {
        alert('到头了少年');
        return
    }
    pageIndex--;

    pageindexDom.innerText = pageIndex;
    var selValue = parseInt(sel.value);

    getOnePage(pageIndex, getGroupList(selValue))
}


// 查询按钮的功能

var querybtn = document.getElementById('querybtn');
var selValue = parseInt(sel.value);
querybtn.onclick = function () {
    var selValue = parseInt(sel.value);
    pageIndex = 1;
    pageindexDom.innerText = pageIndex;

    //根据sel的值拉去不同团体的数据
    if (selValue == -1) {
        //如果value的值是-1 则拉取全部数据
        getPageData(MoneyList, 1, MoneyList.length)
    } else {
        getOnePage(pageIndex, getGroupList(selValue))
    }
    //因为每次拉取数据之后 总页数都变了 需要重新计算
    pageTotal = Math.ceil(getGroupList(selValue).length / pageSize);
    pageCount.innerText = pageTotal;

}

// 增删改功能


// 增加一条新数据

var addBtn = document.getElementById('addBtn');

addBtn.onclick = function () {
    var addName = document.getElementById('pname').value;
    var addSelect = parseInt(document.getElementById('addselect').value);
    var addMoney = document.getElementById('money').value;
    var addTime = document.getElementById('date').value;

    MoneyList.push(addMoneyList(addName, addSelect, addMoney, addTime));
}


//编辑
document.body.addEventListener('click', function (e) {
    if (e.target.className == 'update') {
        //询问助教这个方法靠谱不
        //根据序号获取对象
        var id = e.target.parentNode.parentNode.firstChild.innerText - 1;
        var thisData = MoneyList[id];
        //修改选中行的边框
        var thisTr = e.target.parentNode.parentNode
        thisTr.style.border = '1px solid red'
        var trChilds = e.target.parentNode.parentNode.children;
        //修改捐款人
        // 疑问 创建dom 节点 和字符串拼接渲染那个性能好 更可取
        var tempTxt = trChilds[1].innerText;
        trChilds[1].innerHTML = '';
        var input = document.createElement('input');
        input.type = 'text';
        input.value = tempTxt;
        trChilds[1].setAttribute('ori-data', tempTxt);
        trChilds[1].appendChild(input);
        input.onblur = function () {
            thisData.name = this.value;

        }

        //修改捐款单位
        //清空原按钮

        trChilds[2].innerHTML = '';

        //创建一个捐款单位的select标签
        var newSel = document.createElement('select');
        getSelData(newSel);

        var temVal = parseInt(newSel.value);
        newSel.selectedIndex = thisData.orgid - 1;
        trChilds[2].setAttribute('ori-data', temVal);
        trChilds[2].appendChild(newSel);

        newSel.onblur = function () {
            thisData.orgid = this.value;
        }

        //修改捐款金额

        var tempMoney = trChilds[3].innerHTML;
        trChilds[3].innerHTML = '';

        var inputMoney = document.createElement('input');
        inputMoney.type = 'text';
        inputMoney.value = tempMoney;
        trChilds[3].setAttribute('ori-data', tempMoney);
        trChilds[3].appendChild(inputMoney);
        inputMoney.onblur = function () {
            thisData.money = this.value;

        }

        //修改捐款时间
        var tempTime = trChilds[4].innerHTML;
        trChilds[4].innerHTML = '';
        var inputTime = document.createElement('input');
        inputTime.type = 'text';
        inputTime.value = tempTime;
        trChilds[4].setAttribute('ori-data', tempTime);
        inputTime.className = 'tcal tcalInput'
        trChilds[4].appendChild(inputTime);
        inputTime.onblur = function () {
            thisData.time = this.value;

        }

        // 点击编辑的时候出现确定或者取消按钮

        // 清空原有内容 重新生成
        trChilds[trChilds.length - 1].innerHTML = '';
        // 确定

        var btnSure = document.createElement('a');
        btnSure.setAttribute('href', 'javascript:void(0)');
        btnSure.innerText = '确定';
        btnSure.className = 'btnSure';
        trChilds[trChilds.length - 1].appendChild(btnSure);

        btnSure.onclick = function () {
            //获取当前
            var tBody = document.getElementById('t_body');
            //获取当前表格所有的tr
            var allTr = tBody.children;
            // 坑爹了 这里的逻辑想了一个小时!!!
            for (var i = 0; i < allTr.length; i++) {
                var allTd = allTr[i].children;
                //保存修改当前页面所有的TD
                //修改所有的捐款人
                allTd[1].innerHTML = MoneyList[i].name;
                //修改所有的捐款单位
                allTd[2].innerHTML = getGroup(MoneyList[i].orgid);
                //修改捐款金额
                allTd[3].innerHTML = MoneyList[i].money;
                //修改捐款时间
                allTd[4].innerHTML = MoneyList[i].time;
                //重新穿件编辑 删除按钮
                createBtn(allTd[5])
                //点击确定 再次创建编辑和删除按钮
                // createBtn(allTr[i][allTr[i].length-1]);
                allTr[i].style.border = '';
            }

        }

        //取消
        var btnCancel = document.createElement('a');
        btnCancel.setAttribute('href', 'javascript:void(0)');
        btnCancel.innerText = '取消';
        btnCancel.className = 'btnCancel';
        //设置两个按钮的间距
        btnCancel.style.marginLeft = '10px';
        trChilds[trChilds.length - 1].appendChild(btnCancel);
        btnCancel.onclick = function () {

            var dataId = this.parentNode.parentNode.children[0].innerText;
            //取消时,通过之前缓存在标签上的自定义属性再次让数据进行回滚
            MoneyList[dataId].name = this.parentNode.parentNode.children[1].getAttribute('ori-data')
            MoneyList[dataId].orgid = parseInt(this.parentNode.parentNode.children[2].getAttribute('orgid'))
            MoneyList[dataId].money = this.parentNode.parentNode.children[3].getAttribute('ori-data')
            MoneyList[dataId].time = this.parentNode.parentNode.children[4].getAttribute('ori-data')

            //通过回滚的数据重新传染一次tr
            this.parentNode.parentNode.children[1].innerHTML = MoneyList[dataId].name;
            this.parentNode.parentNode.children[2].innerHTML = getGroup(MoneyList[dataId].orgid);
            this.parentNode.parentNode.children[3].innerHTML = MoneyList[dataId].money;
            this.parentNode.parentNode.children[4].innerHTML = MoneyList[dataId].time;
            var parent = this.parentNode;

            //又是一个坑
            // create 按钮里面删除this的按钮 所以要提前保存
            createBtn(this.parentNode)
            parent.parentNode.style.border = '';
        }
    }
})

//  删除
document.body.addEventListener('click', function (e) {
    if (e.target.className == 'del') {
        var id = e.target.parentNode.parentNode.children[0];
        id = parseInt(id);
        MoneyList.splice(id, 1)
        getOnePage(pageIndex)
    }
})


// input修改时间 点击出现插件
tBody.addEventListener('click', function (e) {
    
    if (e.target.className=='tcal tcalInput') {
        e.target.className='tcal addinput tcalInput tcalActive';
        
    }
})