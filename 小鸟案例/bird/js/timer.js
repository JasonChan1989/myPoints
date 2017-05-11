    function Timer (config) {
        this.context = config.context;
        this.x=config.x || this.context.canvas.width;
        this.y= config.y || 0;
        this.textAlign=config.textAlign||'right';
        this.textBaseLine=config.textBaseLine||'top';
        this.font = config.font||'900 28px 微软雅黑';
        this.fontColor=config.fontColor||'hotpink';

        this.startTime=Date.now();
        this.text='恭喜，你已坚持了0小时0分钟0秒！'
       // console.log(4);
       
        

}

    Timer.prototype={
        constructor:Timer,
        draw:function(){
        this.context.save();
            //文字样式的修改
           
        this.context.textAlign = this.textAlign;
		this.context.textBaseline = this.textBaseLine;
		this.context.font = this.font;
		this.context.fillStyle = this.fontColor;
        this.context.fillText(this.text,this.x,this.y)
    

        this.context.restore();
        
    },
    	upData: function() {
    

		var duration = Date.now() - this.startTime;
		
		// 求有多少个小时
		var hours = Math.floor(duration / (1000 * 60 * 60));
		
		// 先除去小时的数据，剩余的值求分钟
		var minutes = Math.floor(duration % (1000 * 60 * 60) / (1000 * 60));
		
		// 先除去小时与分钟的数据，剩余的值求秒
		var seconds = duration % (1000 * 60) / 1000;
		
		// 拼接字符串
		this.text = '恭喜，你已坚持了' + hours + '小时' + minutes + '分钟' + seconds + '秒！';
	}

    }