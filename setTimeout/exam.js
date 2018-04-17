//setTimeout可以往前面的函数传递参数

function add (a,b){
    console.log(a+b);
}

setTimeout(add,1000,12,2);