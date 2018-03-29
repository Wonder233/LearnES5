/**
 * 链式 setTimeout() 来避免 setInterval() 的重复定时器缺点
 * @type {number}
 */

/*
var interval = 1000;
setTimeout(function () {
    log(arguments.callee);
    setTimeout(arguments.callee,interval);
},interval)
*/

var left = 0,toppx = 0;
var interval = 50;
setTimeout(function () {
    var div = document.getElementById("myDiv");
    left = parseInt(div.style.left) + 5;
    toppx = parseInt(div.style.top) + 5;
    console.log(toppx);
    div.style.left = left + "px";
    div.style.top = toppx + "px";
    if(left < 200){
        setTimeout(arguments.callee,interval);
    }
},interval)

