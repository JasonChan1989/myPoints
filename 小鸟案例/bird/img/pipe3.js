/**
 * 1、管道是一对对出现，所以x轴坐标是一样的，y轴坐标不一样
 * 2、管道高度随机的，随机的时候，只需要随机生成上面管道的高，那么下面管道的高度跟着也就有了
 * 3、管道和管道左右之间有一定的间距
 * 4、管道和管道上下之间有一定的间距
 * 5、管道第一次绘制时，到画布左边有一定的缓冲间距，防止未开始即结束
 * 6、当管道走出画布重新进来时，高度需要再次随机生成
 * 也就是说管道随机生成高度的代码是要多次使用的。
 * 7、上面的管道在绘制的时候，需要我们计算它的y轴坐标，这个坐标我们允许负数的存在，
 * 这样我们就省去了图片裁剪的过程。
 * 8、下面的管道在绘制的时候，虽然y轴坐标不存在负数，但是需要注意绘制顺序，
 * 先绘制管道，再绘制大地，让大地覆盖掉下面的部分。
 * */

/**
 * @constructor 管道类
 * @param { options: Object }
 * @param { options.ctx: Context }
 * @param { options.imgPipeUp: Image } 口朝上的管道，在下面绘制
 * @param { options.imgPipeDown: Image } 口朝下的管道，在上面绘制
 * @param { options.x: number } 上下管道共享的x轴坐标
 * @param { options.yPipeUp: number } 口朝上管道的y轴坐标
 * @param { options.yPipeDown: number } 口朝下管道的y轴坐标
 * @param { options.speed: number } 速度
 * @param { options.speedA: number } 加速度
 * */
var pipeTotal = 0;

function Pipe(options) {
	this.ctx = options.ctx;
	this.imgPipeUp = options.imgPipeUp;
	this.imgPipeDown = options.imgPipeDown;
	this.x = options.x || 150;
	this.yPipeUp= options.yPipeUp || 0;
	this.yPipeDown= options.yPipeDown || 0;
	this.speed= options.speed || 4;
	this.speedA= options.speedA || 0.01;
	
	// 管道最大与最小高度
	this.maxHeight = 200;
	this.minHeight = 50;
	
	// 管道上下与左右的间距
	this.UDSpace = 150;
	
	// 在创建管道实例的时候，也需要随机生成一下管道高
	this.getPipeY();
	
	pipeTotal++;
}

Pipe.prototype = {
	
	// 随机生成上管道的高度，然后依据这个高度计算上下管道的y轴坐标，有了y轴坐标就可以绘制了
	getPipeY: function() {
		var pipeDownHeight = Math.random() * (this.maxHeight - this.minHeight) + this.minHeight;
		this.yPipeDown = pipeDownHeight - this.imgPipeDown.height;
		this.yPipeUp = pipeDownHeight + this.UDSpace;
	},
	
	draw: function() {
		this.ctx.drawImage(this.imgPipeDown, this.x, this.yPipeDown);
		this.ctx.drawImage(this.imgPipeUp, this.x, this.yPipeUp);
	},
	
	update: function() {
		this.x -= this.speed;
		this.speed += this.speedA;
		
		// 走出画布，向右拼接，同时再次随机生成管道高
		if(this.x < -this.imgPipeDown.width) {
			// 一根管道占用的宽度为 = 管道图片宽 + 管道左右间距
			this.x += (this.imgPipeDown.width + 100) * pipeTotal;
			this.getPipeY();
		}
	}
};
