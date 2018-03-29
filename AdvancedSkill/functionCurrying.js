/**
 * 函数柯里化
 * 作用：用于创建已经设置好了一个或多个参数的函数
 *
 * 函数柯里化的基本方法和函数绑定一样：使用一个闭包返回一个函数。
 * 两者的区别是：当函数被调用时，返回的函数还需要设置一些传入的参数。
 */

function add(num1, num2) {
    return num1 + num2;
}

function curriedAdd(num2) {
    return add(5, num2);
}

//console.log(add(2, 3));      //5
//console.log(curriedAdd(3)); //8

/**
 * 函数柯里化通常由以下步骤动态创建：
 * 调用另一个函数并未它传入要柯里化的函数和必要参数
 */

/**
 * 柯里化函数
 * @param fn 要柯里化的函数
 */
function curry(fn) {
    //在 arguments 对象上调用 slice() 方法，并传入参数 1 表示被返回的数组包含从第二个参数开始的所有参数。
    //目的是为了获取第一个参数之后的所有参数
    var args = Array.prototype.slice.call(arguments, 1);
    console.log("args " + args)
    return function () {
        var innerArgs = Array.prototype.slice.call(arguments);
        console.log("innerArgs " + innerArgs);
        var finalArgs = args.concat(innerArgs);
        return fn.apply(null, finalArgs);
    };
}

function add1(num1,num2){
    return num1+num2;
}

var curriedAdd1 = curry(add1,5);
console.log(curriedAdd1(3));
console.log(curriedAdd1(2));
