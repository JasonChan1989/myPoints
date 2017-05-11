
    

    var birdObj=null;
   function Bird(config) {
        if (birdObj) {
            return birdObj;
           
        }else{
             birdObj=this;
        }
        this.x = typeof config.x != 'undefined' ? config.x : 10;
        this.y = typeof config.y != 'undefined' ? config.y : 10;
        this.img = config.img;
        this.w = config.w;
        this.h = config.h;
        this.speed = config.speed;
        this.speedA = config.speedA;
        this.context = config.context;
        this.bCount = 0;
        this.onClick();
        this.rotateRadian = 0;
    }

    Bird.prototype = {
        constructor: Bird,
        draw: function () {

            // 设置图片的 路径  被剪切开始的x y 剪切的宽和 高 开始绘制的地方x y 需要绘制到的x,y
            this.context.save();
            this.context.translate(this.x + this.w / 2, this.y + this.h / 2)
            this.rotateRadian = this.speed * Math.PI / 60;
            this.context.rotate(this.rotateRadian);
            this.context.drawImage(this.img, this.w * this.bCount, 0, this.w, this.h, -this.w/2, -this.h/2, this.w, this.h);
            this.context.restore();
            
        },
        upData: function () {
            //对计数器求摩,让器0  1  2 循环 分别取到每一帧
            this.bCount = ++this.bCount % 3;
            this.y += this.speed;
            this.speed += this.speedA;
        },
        onClick: function () {
            var that = this;
            this.context.canvas.onclick = function () {
                //点击的时候是让速度为负数,相对平滑 如果点击直接改位置 则为闪动
                that.speed = -7 ;
            }
        }
    }
