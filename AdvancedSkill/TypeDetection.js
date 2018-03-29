/**
 * instanceof 操作符在存在多个全局作用域的情况下，问题多多。
 */

var a = [1,2,3];
Object.prototype.toString.call(a); // "[object Array]"

/**
 * 原生数组的构造函数名与全局作用域无关，因此使用 toString() 能保证返回一致的值。
 */
function isArray(value){
    return Object.prototype.toString.call(value) == "[object Array]";
}

/**
 * 同样，可以基于这一思路才是某个值是不是原生函数或正则表达式
 */
function isFunction(value){
    return Object.prototype.toString.call(value) == "[object Function]";
}
function isRegExp(value){
    return Object.prototype.toString.call(value) == "[object RegExp]";
}

/**
 * 检测原生 JSON 对象
 * Object 的 toString() 方法不能检测非原生构造函数的构造函数名。
 * 因此，开发人员定义的任何构造函数都将返回 [object Object]。
 */
