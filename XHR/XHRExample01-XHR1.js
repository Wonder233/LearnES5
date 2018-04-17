/**
 * 1. 支持 IE 早期版本的创建 XHR 对象
 * @returns {Window.XMLHttpRequest|XMLHttpRequest}
 */
function createXHR() {
    if (typeof XMLHttpRequest != "undefined") {
        return new XMLHttpRequest();
    } else if (typeof ActiveXObject != "undefined") {
        if (typeof arguments.callee.activeXString != "undefined") {
            var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"],
                i, len;
            for (i = 0, len = versions.length; i < len; ++i) {
                try {
                    new ActiveXObject(version[i]);
                    arguments.callee.activeXString = versions[i];
                    break;
                } catch (ex) {
                    //跳过
                }
            }
        }
        return new ActiveXObject(arguments.callee.activeXString);
    } else {
        throw new Error("NO XHR object available.");
    }
}

var xhr = createXHR();

//5. 多数情况下发送异步请求， 让 JavaScript 继续执行而不必等待响应。
//此时，检测 XHR 对象的 readyState 属性，该属性表示 请求/响应 过程的当前活动阶段。
//只要 readyState 属性的值从一个变成另一个，就会触发一次 readystatechage 事件。
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
            alert(xhr.responseText);
        } else {
            alert("请求不成功" + xhr.status);
        }
    }
};


//2. open() 启动一个请求以备发送
xhr.open("get", "example.txt", false);

//3. send() 发送特定的请求
xhr.send(null);

//4. 接收到响应后，第一步检查 status 属性，以确定相应已经成功返回。
// 以下是同步请求所用的方法
/*
if((xhr.status >= 200 && xhr.status <300) || xhr.status == 304){
    alert(xhr.responseText);
}else{
    alert("请求不成功"+xhr.status);
}
*/

//6. 接收到响应之前可以调用 abort() 取消异步请求
xhr.abort();

/**
 * 7. 使用 setRequestHeader() 方法可以设置自定义的请求头部信息。
 * 该方法接收两个参数 setRequestHeader(name,value)
 * @param name 头部字段的名称
 * @param value 头部字段的值
 */
xhr.open("get", "example.txt", true);
xhr.setRequestHeader("MyHeader", "MyValue");
xhr.send(null);

/**
 * 8. 使用 getResponseHeader() 方法可以取得相应的响应头部信息。
 */
var myHeader = xhr.getResponseHeader("MyHeader");

/**
 * 9. 使用 getAllResponseHeaders() 方法可以取得一个包含所有头部信息的长字符串。
 */
var allHeaders = xhr.getAllResponseHeaders();

//10. GET 请求：常用于向服务器查询某些信息。
//将查询字符参数追加到 URL 的末尾，以便将信息发送给服务器。
xhr.open("get", "example.php?name1=value1&name2=value2", true);

// GET 请求经常发生的一个错误：查询字符串的格式有问题。

/**
 * 查询字符串中每个参数的名称和值都必须使用 encodeURIComponet() 进行编码再放进 URL 末尾；
 * 所有名-值对 都必须由 和号（&）分隔
 * @param url 要添加参数的 URL
 * @param name 参数的名称
 * @param valule 参数的值
 * @returns {string|*}
 */
function addURIParam(url, name, valule) {
    url += (url.indexOf("?") == -1 ? "?" : "&");
    url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
    return url;
}

var url = "example.php";

//添加参数
url = addURIParam(url,"name","Nicholas");
url = addURIParam(url,"book","Professional JavaScript");

//初始化请求
xhr.open("get",url,false);

//11. POST 请求：常用于向服务器发送应该被保存的数据。
xhr.open("post","postexample.php",true);
xhr.setRequestHeader("Content-Type","application/x-www-form-unlencoded");
var form = document.getElementById("user-info");
xhr.send(serialize(form));
