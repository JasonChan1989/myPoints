(function  (window) {
    var LandTotal = 0;
    function Land (config) {
        
        this.x=typeof config.x != 'undefined'? config.x: 10;
        this.y=typeof config.y != 'undefined'? config.y: 10;
        this.img=config.img;
        this.speed=config.speed;
        this.speedA=config.speedA;
        this.context=config.context;
        LandTotal++;
      //  console.log(this.img);
    }

    Land.prototype={
        constructor:Land,
        draw:function(){
            this.context.drawImage(this.img, this.x, this.y);
        },
        upData:function(){  
            this.x -=this.speed;
            if (this.x== -this.img.width) {
                this.x +=this.img.width*LandTotal
            }     
        }
    }
        

    
    window.Land=Land;

})(window)