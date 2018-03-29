/**
 * 1. ֧�� IE ���ڰ汾�Ĵ��� XHR ����
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
                    //����
                }
            }
        }
        return new ActiveXObject(arguments.callee.activeXString);
    } else {
        throw new Error("NO XHR object available.");
    }
}

var xhr = createXHR();

//5. ��������·����첽���� �� JavaScript ����ִ�ж����صȴ���Ӧ��
//��ʱ����� XHR ����� readyState ���ԣ������Ա�ʾ ����/��Ӧ ���̵ĵ�ǰ��׶Ρ�
//ֻҪ readyState ���Ե�ֵ��һ�������һ�����ͻᴥ��һ�� readystatechage �¼���
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
            alert(xhr.responseText);
        } else {
            alert("���󲻳ɹ�" + xhr.status);
        }
    }
};


//2. open() ����һ�������Ա�����
xhr.open("get", "example.txt", false);

//3. send() �����ض�������
xhr.send(null);

//4. ���յ���Ӧ�󣬵�һ����� status ���ԣ���ȷ����Ӧ�Ѿ��ɹ����ء�
// ������ͬ���������õķ���
/*
if((xhr.status >= 200 && xhr.status <300) || xhr.status == 304){
    alert(xhr.responseText);
}else{
    alert("���󲻳ɹ�"+xhr.status);
}
*/

//6. ���յ���Ӧ֮ǰ���Ե��� abort() ȡ���첽����
xhr.abort();

/**
 * 7. ʹ�� setRequestHeader() �������������Զ��������ͷ����Ϣ��
 * �÷��������������� setRequestHeader(name,value)
 * @param name ͷ���ֶε�����
 * @param value ͷ���ֶε�ֵ
 */
xhr.open("get", "example.txt", true);
xhr.setRequestHeader("MyHeader", "MyValue");
xhr.send(null);

/**
 * 8. ʹ�� getResponseHeader() ��������ȡ����Ӧ����Ӧͷ����Ϣ��
 */
var myHeader = xhr.getResponseHeader("MyHeader");

/**
 * 9. ʹ�� getAllResponseHeaders() ��������ȡ��һ����������ͷ����Ϣ�ĳ��ַ�����
 */
var allHeaders = xhr.getAllResponseHeaders();

//10. GET ���󣺳��������������ѯĳЩ��Ϣ��
//����ѯ�ַ�����׷�ӵ� URL ��ĩβ���Ա㽫��Ϣ���͸���������
xhr.open("get", "example.php?name1=value1&name2=value2", true);

// GET ���󾭳�������һ�����󣺲�ѯ�ַ����ĸ�ʽ�����⡣

/**
 * ��ѯ�ַ�����ÿ�����������ƺ�ֵ������ʹ�� encodeURIComponet() ���б����ٷŽ� URL ĩβ��
 * ������-ֵ�� �������� �ͺţ�&���ָ�
 * @param url Ҫ��Ӳ����� URL
 * @param name ����������
 * @param valule ������ֵ
 * @returns {string|*}
 */
function addURIParam(url, name, valule) {
    url += (url.indexOf("?") == -1 ? "?" : "&");
    url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
    return url;
}

var url = "example.php";

//��Ӳ���
url = addURIParam(url,"name","Nicholas");
url = addURIParam(url,"book","Professional JavaScript");

//��ʼ������
xhr.open("get",url,false);

//11. POST ���󣺳����������������Ӧ�ñ���������ݡ�
xhr.open("post","postexample.php",true);
xhr.setRequestHeader("Content-Type","application/x-www-form-unlencoded");
var form = document.getElementById("user-info");
xhr.send(serialize(form));
