var tool = {
    loaded: function (obj, callback) {
        /**
         * 1、定义一个用来存储所有图片的对象
         * 2、定义一个用来统计图片已加载个数的变量，再定义一个用来统计所有src数量的变量
         * 3、遍历所有的src，依次创建image对象，然后存储起来
         * 4、在遍历的过程中，还需要计算出所有src的数量
         * 5、在遍历的过程中，每 创建一个img，都要监听它的load事件
         * 6、load事件的回调中，需要对已加载的变量自增，自增后判断这个值有没有达到src的总数，到达则执行回调，把所有的img传递过去
         * */

        var imgobj = {};
        var count = 0;
        var srcCount = 0;

        for (var key in obj) {
            imgobj[key] = new Image();
            imgobj[key].src = obj[key];
            count++;
            imgobj[key].onload = function () {
                if (++srcCount >= count) {
                    callback(imgobj);
                }
            }
        }
    }
}