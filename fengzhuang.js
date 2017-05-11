function Sta(config) {
    this.data = config.data;
    this.type = config.type;
    this.total = 0;
    this.cvs = config.cvs;
    this.context = config.context
    // 定义一个空数据 用来存放每个需要绘制的元素
    this.role = [];
    this.colorArray = [];
        this.startX = config.startX;
    this.startY = config.startY;
    this.r = config.r
    this.rPlus = config.rPlus;
    this.lineColor=config.lineColor
    this.init()

}

Sta.prototype = {
    constructor: Sta,

    //初始化中 判断用户需要哪种类型的统计图,如果都不是则报错;
    init: function () {
        this.getTotal();
        if (this.type == "zhexian" || this.type == "折线") {
            this.zhexian();
        } else if (this.type == "bing" || this.type == "饼") {
            this.bing();
        } else {
            throw "请输入正确的统计类型"
        }

    },
    //计算总份数
    getTotal: function () {
        for (var i = 0; i < this.data.length; i++) {
            var ele = this.data[i];
            this.total += ele.total;
        }
    },
    //画饼主函数
    bing: function () {
        //计算没一份占饼图的多少
        var everySize = Math.PI * 2 / this.total;

        //计算一种数据所占的角度,存入数组
        for (var i = 0; i < this.data.length; i++) {
            this.role.push({
                begin: i == 0 ? 0 : this.role[i - 1].end,
                end: i == 0 ? everySize * this.data[i].total : this.role[i - 1].end + everySize * this.data[i].total,
                textRadian: i == 0 ? everySize * this.data[i].total / 2 : this.role[i - 1].end + everySize * this.data[i].total / 2,
                size: everySize * this.data[i].total,
                text: this.data[i].name
            })

        }
        this.getColorArray()
        this.drawBing()
        this.bingText()

    },
    getRandomColor: function () {
        var randomR = Math.floor(Math.random() * 256);
        var randomG = Math.floor(Math.random() * 256);
        var randomB = Math.floor(Math.random() * 256);

        var colorRgb = 'rgb(' + randomR + ',' + randomG + ',' + randomB + ')';

        return colorRgb;
    },
    getColorArray: function () {
        for (var i = 0; i < this.data.length; i++) {
            this.colorArray.push(this.getRandomColor())
        }
        console.log(this.colorArray);

    },
    drawBing: function () {
        var that = this;
        this.role.forEach(function (value, i) {
      

            this.context.beginPath();
            this.context.moveTo(that.startX, that.startY);
            console.log(that.startX);
            this.context.arc(that.startX, that.startY, that.r, value.begin, value.end);
            this.context.closePath();
            this.context.fillStyle = that.colorArray[i];
            this.context.fill();
        })
    },
    bingText: function () {
        var that = this;
        this.role.forEach(function (value, i) {

            //测量文字的长度
            var textWidth = context.measureText(value.text).width;

            var textX = that.startX + (that.r + that.rPlus) * Math.cos(value.textRadian);
            var textY = that.startY + (that.r + that.rPlus) * Math.sin(value.textRadian);

            //画延长线
            that.context.beginPath();
            that.context.moveTo(that.startX, that.startY);
            that.context.lineTo(textX, textY);
            context.strokeStyle=that.lineColor;
            
            that.context.stroke();



            //判断,如果文字在左边 就把字向右对齐,反之向左对齐
            if (value.textRadian > Math.PI / 2 && value.textRadian < Math.PI / 2 * 3) {
                context.textAlign = 'right';
                textWidth = -textWidth;

            } else {
                context.textAlign = 'left';
            }
            context.textBaseline = 'bottom'

            //绘制文字
            that.context.fillStyle = that.colorArray[i];
            that.context.fillText(value.text, textX, textY);
            //画文字底线
            context.beginPath();
            context.moveTo(textX, textY);
            context.lineTo(textX + textWidth, textY);
            context.stroke();
        })

    },

    zhexian: function () {

    }
}