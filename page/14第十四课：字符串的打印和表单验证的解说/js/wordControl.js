var wordConsole = function(){
    //私有变量
    var arr = [];
    var speed = 50;
    var wordbox = null;
    //c变量进行拼接 换行处理
    var c = "";
    //index数组的开始位置
    var index = 0;
    //pos当前已经读取到的位置
    var pos = 0;
    //文本长度
    var strLen = 0,tLen = 0;
    //记录函数
    var row = 0;
    //私有方法
    function setDate(targetId,sp,data) {
        //赋值
        arr = data;
        speed = sp || 50;
        //目标对象初始化
        wordbox = document.getElementById(targetId);
        //获取数组的第一个字符串
        strLen = arr[0].length;
        //数组的数组长度
        tLen = arr.length;
        //开始执行
        start();
    }
    function start() {
        c = '';
        row = Math.max(0,index-tLen);
        while(row < index) {
            //每次往最后追加
            c += arr[row++] + '<br>';
        };
        wordbox.innerHTML = c + arr[index].substring(0,pos); //I love you
        if(pos == strLen){
            //下个字符串的位置
            index ++;//数组索引进行便宜
            pos = 0;//位置重新置为0，下
            if(index < tLen){
                //字符串的长度等于下一个字符串的长度
                strLen = arr[index].length;
                timer = setTimeout(start,300);
                //执行动画函数
            }else{
                clearTimeout(timer);
            }
        }else{
            pos++;
            setTimeout(start,speed);
        }
    };
    
    return {
        console: setDate
    };

}();

