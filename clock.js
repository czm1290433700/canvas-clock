/**
 * @author By chenzhenmin
 * @create in 2020/11/3
 */
var drawing = document.getElementById('clock'), context;
// 判断浏览器是否支持canvas
if(drawing.getContext){
    context = drawing.getContext('2d');
    PaintClockBorder();
    PaintClockSign();
}

/**
 * 把sin值封装成绝对正数,因为我不记得什么时候取负数了，头皮发麻
 */
function sin(num){
    return Math.abs(Math.sin(num));
}

/**
 * 把cos值封装成绝对正数
 */
function cos(num){
    return Math.abs(Math.cos(num));
}

/**
 * 钟表轮框
 */
function PaintClockBorder(){
    // 先画一个圈圈出来
    context.beginPath();
    context.arc(100, 100, 100, 0, 2 * Math.PI, false);
    // 调个白变黑渐变色
    var fTo0 = context.createLinearGradient(-50, 100, 200, 100);
    fTo0.addColorStop(0, '#fff');
    fTo0.addColorStop(1, '#000');
    // 第一个最外面的圈圈搞定
    context.fillStyle = fTo0;
    context.fill();
    // 咱开始画第二个圈圈
    context.beginPath();
    context.arc(100, 100, 90, 0, 2 * Math.PI, false);
    // 搞个黑圈
    context.fillStyle = '#000';
    context.fill();
    // 终于搞第三个圈圈了
    context.beginPath();
    context.arc(100, 100, 85, 0, 2 * Math.PI, false);
    // 调个橘黄to黄渐变
    var oToy = context.createLinearGradient(20, 70, 180, 170);
    oToy.addColorStop(0, '#E17101');
    oToy.addColorStop(1, '#FFF507');
    // 第三个圈圈搞定
    context.fillStyle = oToy;
    context.fill();
}

/**
 * 钟表指数
 */
function PaintClockSign(){
    context.beginPath();
    // 咱先画大的，每10分钟的,注意要分四个区间去渲染
    for(let i = 1; i <= 12; i++){
        // 每加一个就加30deg
        if(i <= 3){
            context.moveTo(100 + 85 * sin(30 * i) + 5, 100 - 85 * cos(30 * i));
            context.arc(100 + 85 * sin(30 * i), 100 - 85 * cos(30 * i), 5, 0, 2 * Math.PI, false);
        }else if(i > 3 && i <= 6){
            // context.moveTo(100 + 85 * sin(30 * i) + 5, 100 + 85 * cos(30 * i));
            // context.arc(100 + 85 * sin(30 * i), 100 + 85 * cos(30 * i), 5, 2 * Math.PI, false);
        }else if(i > 6 && i <= 9){
            // context.moveTo(100 - 85 * sin(30 * i) + 5, 100 + 85 * cos(30 * i));
            // context.arc(100 - 85 * sin(30 * i), 100 + 85 * cos(30 * i), 5, 2 * Math.PI, false);
        }else{
            // context.moveTo(100 - 85 * sin(30 * i) + 5, 100 - 85 * cos(30 * i));
            // context.arc(100 - 85 * sin(30 * i), 100 - 85 * cos(30 * i), 5, 2 * Math.PI, false);
        }
    }
    // 然后咱画一下分钟的
    context.fillStyle = '#000';
    context.fill();
}

