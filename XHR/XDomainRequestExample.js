/**
 * 1. XDR ��ʵ�ְ�ȫ�ɿ��Ŀ���ͨ�š�
 * XDR ����İ�ȫ���Ʋ���ʵ���� W3C �� CORS �淶��
 */

/**
 * 2. XDR �� XHR �Ĳ�ͬ��
 * ��1��cookie �����������ͣ�Ҳ��������Ӧ���ء�
 * ��2��ֻ����������ͷ����Ϣ�е� Content-Type �ֶΡ�
 * ��3�����ܷ�����Ӧͷ����Ϣ��
 * ��4��ֻ֧�� GET �� POST ����
 *
 * XDR �� open( type,url ) ���� ֻ��������������Ϊ�����������첽�ġ�
 */
var xdr = new XDomainRequest();
xdr.onload = function() {
  alert(xdr.responseText);
};
xdr.onerror = function() {
  alert('������һ������');
};

xdr.timeout = 1000;
xdr.ontimeout = function() {
  alert('������Ӧ̫����');
};

xdr.open('get', 'http://www.somewhere-else.com/page/');
xdr.send(null);

/* ֧�� post ��Ҫ��ͷ�� Content-Type �޸ģ�ֱ��ʹ�� contentType ���Լ��� */
xdr.open('post', 'http://www.somewhere-else.com/page/');
xdr.contentType = 'application/x-www-form-unlencoded';
xdr.send('name1=value1&name2=value2');

/**
 * 3. ����ƽ̨ FireFox 3+��Safari 4+��Chrome��IOS �� Safari �� Android ƽ̨�е� WebKit ��ͨ��
 *    XHR ����ʵ���˶� CORS ��ԭ��֧�֡�
 *    �ڳ��Դ򿪲�ͬ��Դ����Դʱ����������д����Ϳ��Դ��������Ϊ��
 */
var xhr = createXHR();
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
      alert(xhr.responseText);
    } else {
      alert('���󲻳ɹ�' + xhr.status);
    }
  }
};
xhr.open('get', 'http://www.somewhere-else.com/page/', true);
xhr.send(null);

/**
 * 4. ���� XHR �����ƣ�
 * ��1������ʹ�� setRequestHeader() �����Զ���ͷ��
 * ��2�����ܷ��ͺͽ��� cookie
 * ��3������ getAllResponseHeaders() �����ܻ᷵�ؿ��ַ�����
 */

/**
 * 5. ��������� CORS
 *
 * ������
 * ��� XHR �Ƿ�֧�� CORS ����򵥷�ʽ��������Ƿ���� withCredentials ���ԡ�
 * �ٽ�ϼ�� XDomainRequest �����Ƿ���ڡ�
 */
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ('withCredentials' in xhr) {
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != 'undefined') {
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    xhr = null;
  }
  return xhr;
}
var request = createCORSRequest('get', 'http://www.somewhere-else.com/page/');
if (request) {
  request.onload = function() {
    //�� request��responseText ���д���
  };
  request.send();
}

/**
 * 6. ����������
 */

/**
 * 6.1 ͼ�� Ping
 * ԭ��һ����ҳ���Դ��κ���ҳ�м���ͼ�񣬲��õ��Ŀ���
 * �����ͨ����ѯ�ַ�����ʽ�����������ݣ���Ӧ�������κ����ݣ���ͨ��������ͼ��204��Ӧ��
 *       ͨ��ͼ�� Ping��������ò����κξ������ݣ���ͨ������ load �� error �¼���������֪����Ӧ��ʲôʱ����յ��ġ�
 *
 * �÷��������ڸ����û����ҳ���̬����ع������
 * ȱ�㣺��1��ֻ�ܷ��� GET ���� ��2���޷����ʷ���������Ӧ�ı������ֻ��������������������ĵ���ͨ�š�
 */
var img = new Image();
img.onload = img.onerror = function() {
  alert('Done!');
};
img.src = 'http://www.example.com/test?name=Nicholas';

/**
 * 6.2 JSONP��JSON with padding�����ʽ JSON �� ����ʽ JSON��
 *
 * JSONP����������ɣ�
 * ��1���ص�����������Ӧ����ʱӦ����ҳ���е��õĺ�����
 * ��2�����ݣ�����ص������е� JSON ���ݡ�
 *
 * http://freegeoip.net/json/?callback=handleResponse
 * ͨ����ѯ�ַ�����ָ�� JSONP ����Ļص�����������ָ���Ļص����������ֽ� handleResponse()
 *
 * ʹ�ã�JSONP ͨ����̬ <script> Ԫ����ʹ�ã�ʹ��ʱ����Ϊ src �����ƶ�һ������ URL��
 * ��Ϊ JSONP ����Ч�� JavaScript ���룬������������ɺ󣬼��� JSONP ��Ӧ���ص�ҳ�����Ժ󣬾ͻ�����ִ�С�
 */
function handleResponse(response) {
  alert(
    '������ IP ��ַΪ��' +
      response.ip +
      ' ��Ӧ����Ϊ��' +
      response.city +
      ' ������Ϊ��' +
      response.regionName +
      '������'
  );
}
var script = document.createElement('script');
script.src = 'http://freegeoip.net/json/?callback=handleResponse';
document.body.insertBefore(script, document.firstChild);

/**
 * JSONP
 * �ŵ㣺��1����ֱ�ӷ�����Ӧ�ı� ��2��֧����������������֮��˫��ͨ��
 * ȱ�㣺
 * ��1��JSONP �Ǵ��������м��ش���ִ�еġ���������򲻰�ȫ���ܿ�������Ӧ�мд�һЩ������롣
 * ��2��Ҫȷ�� JSONP �����Ƿ�ʧ�ܲ������ס�������Ա���ò�ʹ�ü�ʱ�����ָ��ʱ�����Ƿ���յ�����Ӧ��
 */

/**
 * 6.3 Web Sockets
 * Ŀ�꣺��һ�������ĳ־��������ṩȫ˫����˫��ͨ�š�
 *
 * Web Sockets ʹ���Զ����Э�飬δ���ܵ�����Ϊ ws:// �����ܵ�����Ϊ wss://
 * �ŵ㣺�ܹ��ڿͻ��˺ͷ�����֮�䷢�ͷǳ����������ݣ������ص��� HTTP �����ֽڼ��Ŀ������ǳ��ʺ��ƶ�Ӧ�á�
 */

/* ����� WebSocket ���캯��������� URL�� */
var socket = new WebSocket('ws://www.example.com/server.php');
socket.send('Hello World!');
/* WebSocket ֻ��ͨ�����ӷ��ʹ��ı����ݣ���˸��ӵ����ݽṹ����������л� */
var message = {
  time: new Date(),
  text: 'hello world',
  clientId: 'asdfg987654'
};
socket.send(JSON.stringify(message));

/* ��������ͻ��˷�����Ϣʱ��WebSocket ����ᴥ�� message �¼��� */
socket.onmessage = function(event) {
  var data = event.data;

  //��������
};

socket.onopen = function() {};
socket.onerror = function() {};

socket.onclose = function(event) {
  var data = event.data;
};
