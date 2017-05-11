
/**
 * @constructor 背景类
 * @param { config: Object } 可选参数
 * @param { config.ctx: Context } 绘图上下文
 * @param { config.img: Image } 背景图
 * @param { config.x: number } 背景图在画布中的x坐标
 * @param { config.y: number } 背景图在画布中的y坐标
 * @param { config.speed: number } 背景运动速度
 * */


(function  (window) {
    var skyTotal = 0;
    function Background (config) {
        
        this.x=typeof config.x != 'undefined'? config.x: 10;
        this.y=typeof config.y != 'undefined'? config.y: 10;
        this.img=config.img;
        this.speed=config.speed;
        this.context=config.context;
        skyTotal++;
      //  console.log(this.img);
    }

    Background.prototype={
        constructor:Background,
        draw:function(){
            this.context.drawImage(this.img, this.x, this.y);
        },
        upData:function(){
            
            this.x -=this.speed;
            if (this.x== -this.img.width) {
                this.x +=this.img.width*skyTotal
            }
            
        }
    }



    window.Background=Background;

})(window)