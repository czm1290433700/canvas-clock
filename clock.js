/**
 * @author By chenzhenmin
 * @create in 2020/11/3
 */
const radius = 4, // 指数圈半径
    radius1 = 100, // 圆1半径(这里圆1的直径需要为画布width的一半, 不然下面刻度的部分可能对不上)
    radius2 = 90, // 圆2半径
    radius3 = 83, // 圆3半径
    fontRadius = 65, // 字体距圆心的距离
    hourWidth = 5, // 时针宽度
    hourHeight = 55, // 时针高度
    hourShadow = 2; // 时针阴影
    minuteWidth = 3, // 分针宽度
    minuteHeight = 68, // 分针高度
    minuteShadow = 1; // 分针阴影
    secondWidth = 1, // 秒针宽度
    secondHeight = 80, // 秒针高度
    secondShadow = 0.5; // 秒针阴影
var drawing = document.getElementById('clock'), context;
// 判断浏览器是否支持canvas
if(drawing.getContext){
    context = drawing.getContext('2d');
    setInterval(paintClock, 1000);
}

/**
 * 把sin值封装成绝对正数,因为我不记得什么时候取负数了，头皮发麻
 * @params num 度数
 */
function sin(num){
    return Math.abs(Math.sin(degTolength(num)));
}

/**
 * 把cos值封装成绝对正数
 * @params num 度数
 */
function cos(num){
    return Math.abs(Math.cos(degTolength(num)));
}

/**
 * 度数转弧度
 */
function degTolength(num){
    return num * (2 * Math.PI / 360);
}

/**
 * 钟表轮框
 */
function paintClockBorder(){
    // 先画一个圈圈出来
    context.beginPath();
    context.arc(100, 100, radius1, 0, 2 * Math.PI, false);
    // 调个白变黑渐变色
    var fTo0 = context.createLinearGradient(-50, 100, 200, 100);
    fTo0.addColorStop(0, '#fff');
    fTo0.addColorStop(1, '#000');
    // 第一个最外面的圈圈搞定
    context.fillStyle = fTo0;
    context.fill();
    // 咱开始画第二个圈圈
    context.beginPath();
    context.arc(100, 100, radius2, 0, 2 * Math.PI, false);
    // 搞个黑灰渐变色
    var bTod = context.createLinearGradient(10, 100, 190, 100);
    bTod.addColorStop(0, '#000');
    bTod.addColorStop(1, '#39452D');
    context.fillStyle = bTod;
    context.fill();
    // 终于搞第三个圈圈了
    context.beginPath();
    context.arc(100, 100, radius3, 0, 2 * Math.PI, false);
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
function paintClockSign(){
    context.beginPath();
    // 咱先画大的，每10分钟的,注意要分四个区间去渲染
    for(let i = 0; i < 12; i++){
        // 每加一个就加30deg
        if(i < 3){
            context.moveTo(radius1 + radius3 * sin(30 * i) + radius, radius1 - radius3 * cos(30 * i));
            context.arc(radius1 + radius3 * sin(30 * i), radius1 - radius3 * cos(30 * i), radius, 0, 2 * Math.PI, false);
        }else if(i >= 3 && i < 6){
            context.moveTo(radius1 + radius3 * sin(30 * i) + radius, radius1 + radius3 * cos(30 * i));
            context.arc(radius1 + radius3 * sin(30 * i), radius1 + radius3 * cos(30 * i), radius, 0, 2 * Math.PI, false);
        }else if(i >= 6 && i < 9){
            context.moveTo(radius1 - radius3 * sin(30 * i) + radius, radius1 + radius3 * cos(30 * i));
            context.arc(radius1 - radius3 * sin(30 * i), radius1 + radius3 * cos(30 * i), radius, 0, 2 * Math.PI, false);
        }else{
            context.moveTo(radius1 - radius3 * sin(30 * i) + radius, radius1 - radius3 * cos(30 * i));
            context.arc(radius1 - radius3 * sin(30 * i), radius1 - radius3 * cos(30 * i), radius, 0, 2 * Math.PI, false);
        }
    }
    context.fillStyle = '#000';
    context.fill();
    // 然后咱画一下分钟的,分钟的每加一个是加6deg
    context.beginPath();
    for(let i = 0; i < 60; i++){
        if(i < 15){
            context.moveTo(radius1 + (radius3 - radius) * sin(6 * i), radius1 - (radius3 - radius) * cos(6 * i));
            context.lineTo(radius1 + radius3 * sin(6 * i), radius1 - radius3 * cos(6 * i));
        }else if(i >= 15 && i < 30){
            context.moveTo(radius1 + (radius3 - radius) * sin(6 * i), radius1 + (radius3 - radius) * cos(6 * i));
            context.lineTo(radius1 + radius3 * sin(6 * i), radius1 + radius3 * cos(6 * i));
        }else if(i >= 30 && i < 45){
            context.moveTo(radius1 - (radius3 - radius) * sin(6 * i), radius1 + (radius3 - radius) * cos(6 * i));
            context.lineTo(radius1 - radius3 * sin(6 * i), radius1 + radius3 * cos(6 * i));
        }else{
            context.moveTo(radius1 - (radius3 - radius) * sin(6 * i), radius1 - (radius3 - radius) * cos(6 * i));
            context.lineTo(radius1 - radius3 * sin(6 * i), radius1 - radius3 * cos(6 * i));
        }
    }
    context.strokeStyle = '#AD9300';
    context.stroke();
    // 最后我们开始写度数的字
    context.font = '20px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    for(let i = 1; i <= 12; i++){
        if(i <= 3){
            context.fillText(i, radius1 + fontRadius * sin(30 * i), radius1 - fontRadius * cos(30 * i));
        }else if(i > 3 && i <= 6){
            context.fillText(i, radius1 + fontRadius * sin(30 * i), radius1 + fontRadius * cos(30 * i));
        }else if(i > 6 && i <= 9){
            context.fillText(i, radius1 - fontRadius * sin(30 * i), radius1 + fontRadius * cos(30 * i));
        }else{
            context.fillText(i, radius1 - fontRadius * sin(30 * i), radius1 - fontRadius * cos(30 * i));
        }
    }
}

/**
 * 钟表指针
 */
function paintClockPointer(){
    let hour = new Date().getHours(),
        minute = new Date().getMinutes(),
        second = new Date().getSeconds();
    context.beginPath();
    context.fillStyle = '#fff';
    // 搞个阴影吧，不搞阴影太丑了。
    context.shadowBlur = 4;
    context.shadowColor = '#B97C29';
    // 先把画布原点换到圆心，因为得绕中心旋转
    context.translate(radius1, radius1);
    // 先时针吧，时针得粗一点
    context.shadowOffsetX = hourShadow;
    context.shadowOffsetY = hourShadow;
    context.rotate(degTolength(hour * 30));
    context.fillRect(- 2.5, - hourHeight + 10, hourWidth, hourHeight);
    // 分针
    context.shadowOffsetX = minuteShadow;
    context.shadowOffsetY = minuteShadow;
    context.rotate(degTolength( - hour * 30 + minute * 6));
    context.fillRect(- 2.5, - minuteHeight + 10, minuteWidth, minuteHeight);
    //秒针
    context.shadowOffsetX = secondShadow;
    context.shadowOffsetY = secondShadow;
    context.rotate(degTolength(- ( - hour * 30 + minute * 6) + second * 6));
    context.fillRect(- 2.5, - secondHeight + 10, secondWidth, secondHeight);
    // 圆心画个小黑点吧
    context.beginPath();
    context.arc(0 ,0 ,1 ,0, 2 * Math.PI, false);
    context.fillStyle = '#000';
}

/**
 * 绘制钟表
 */
function paintClock(){
    context.height = context.height;
    context.save();
    paintClockBorder();
    paintClockSign();
    paintClockPointer();
    context.restore();
}

