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

//1. XHR2 定义了 FormData 类型：序列化表单以及创建于表单格式相同的数据（用于 XHR 传输）
var data = new FormData();
data.append("name","Nicholas");

//也可以向表单元素的数据预先向其中填入键值对
var data = new FormData(document.forms[0]);

var xhr = createXHR();
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
            alert(xhr.responseText);
        } else {
            alert("请求不成功" + xhr.status);
        }
    }
};
xhr.open("post","postexample.php",true);
var form = document.getElementById("user-info");
xhr.send(new FormData(form));

//2. XHR 对象添加了一个 timeout 属性：请求再等待响应多少毫秒之后就终止。
xhr.timeout = 1000; //将超市设置为 1 秒钟（仅适用于 IE8+）
xhr.ontimeout = function () {
    alert("请求在 1 秒内没有响应。");
}

