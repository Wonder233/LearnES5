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
                    //����
                }
            }
        }
        return new ActiveXObject(arguments.callee.activeXString);
    } else {
        throw new Error("NO XHR object available.");
    }
}

//1. XHR2 ������ FormData ���ͣ����л����Լ������ڱ���ʽ��ͬ�����ݣ����� XHR ���䣩
var data = new FormData();
data.append("name","Nicholas");

//Ҳ�������Ԫ�ص�����Ԥ�������������ֵ��
var data = new FormData(document.forms[0]);

var xhr = createXHR();
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
            alert(xhr.responseText);
        } else {
            alert("���󲻳ɹ�" + xhr.status);
        }
    }
};
xhr.open("post","postexample.php",true);
var form = document.getElementById("user-info");
xhr.send(new FormData(form));

//2. XHR ���������һ�� timeout ���ԣ������ٵȴ���Ӧ���ٺ���֮�����ֹ��
xhr.timeout = 1000; //����������Ϊ 1 ���ӣ��������� IE8+��
xhr.ontimeout = function () {
    alert("������ 1 ����û����Ӧ��");
}

