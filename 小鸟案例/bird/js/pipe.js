
var pipecount=0;
function Pipe (config) {
        this.imgup=config.imgdown;
        this.imgdown=config.imgup;
        this.speed=config.speed;
        this.speedA=config.speedA;
        this.context=config.context;
        this.x=config.x;
        this.y=config.y;
        this.jianju=150;
        this.max=200;
        this.min=50;
        this.upy=0;
        this.downy=0;
        pipecount++;
         //每次创建对象都需要重新随机一组数据
         this.getRandom()
        
}
Pipe.prototype={
    constructor:Pipe,

    draw:function(){
        //this.context.beginPath();
       
        //绘制图片
        this.context.drawImage(this.imgup, this.x,this.upy )
        this.context.drawImage(this.imgdown, this.x, this.downy )

        //绘制路径
        this.context.rect(this.x,this.upy, this.imgup.width, this.imgup.height);
        this.context.rect(this.x,this.downy, this.imgup.width, this.imgup.height);
        this.context.strokeStyle='red';
        
        this.context.stroke();
        
    },
    upData:function(){
        this.x-=this.speed;
        this.speed += this.speedA;
        //这里注意  要求x值小于一个宽的的时候 就把他挪到最后
        if (this.x < -this.imgup.width) {
            this.x+=(this.imgup.width+150)*pipecount
                this.getRandom()
        }
    },
    getRandom:function(){
       var random=Math.ceil(Math.random()*(this.max-this.min)+this.min)
       this.upy=random-this.imgdown.height;
       this.downy=random+this.jianju
       
    }
}