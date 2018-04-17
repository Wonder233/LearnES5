/**
 * 1. XDR 能实现安全可靠的跨域通信。
 * XDR 对象的安全机制部分实现了 W3C 的 CORS 规范。
 */

/**
 * 2. XDR 与 XHR 的不同：
 * （1）cookie 不会随请求发送，也不会随响应返回。
 * （2）只能设置请求头部信息中的 Content-Type 字段。
 * （3）不能访问响应头部信息。
 * （4）只支持 GET 和 POST 请求。
 *
 * XDR 的 open( type,url ) 方法 只有两个参数，因为它的请求都是异步的。
 */
var xdr = new XDomainRequest();
xdr.onload = function() {
  alert(xdr.responseText);
};
xdr.onerror = function() {
  alert('发生了一个错误。');
};

xdr.timeout = 1000;
xdr.ontimeout = function() {
  alert('请求响应太长。');
};

xdr.open('get', 'http://www.somewhere-else.com/page/');
xdr.send(null);

/* 支持 post ，要将头部 Content-Type 修改，直接使用 contentType 属性即可 */
xdr.open('post', 'http://www.somewhere-else.com/page/');
xdr.contentType = 'application/x-www-form-unlencoded';
xdr.send('name1=value1&name2=value2');

/**
 * 3. 其他平台 FireFox 3+、Safari 4+、Chrome、IOS 版 Safari 和 Android 平台中的 WebKit 都通过
 *    XHR 对象实现了对 CORS 的原生支持。
 *    在尝试打开不同来源的资源时，无需额外编写代码就可以触发这个行为。
 */
var xhr = createXHR();
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
      alert(xhr.responseText);
    } else {
      alert('请求不成功' + xhr.status);
    }
  }
};
xhr.open('get', 'http://www.somewhere-else.com/page/', true);
xhr.send(null);

/**
 * 4. 跨域 XHR 的限制：
 * （1）不能使用 setRequestHeader() 设置自定义头部
 * （2）不能发送和接收 cookie
 * （3）调用 getAllResponseHeaders() 方法总会返回空字符串。
 */

/**
 * 5. 跨浏览器的 CORS
 *
 * 方法：
 * 检测 XHR 是否支持 CORS 的最简单方式，即检查是否存在 withCredentials 属性。
 * 再结合检测 XDomainRequest 对象是否存在。
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
    //对 request。responseText 进行处理
  };
  request.send();
}

/**
 * 6. 其他跨域技术
 */

/**
 * 6.1 图像 Ping
 * 原因：一个网页可以从任何网页中加载图像，不用担心跨域。
 * 结果：通过查询字符串形式发送请求数据，响应可以是任何内容，但通常是像素图或204响应。
 *       通过图像 Ping，浏览器得不到任何具体数据，但通过监听 load 和 error 事件，它可以知道响应是什么时候接收到的。
 *
 * 用法：常用于跟踪用户点击页面或动态广告曝光次数。
 * 缺点：（1）只能发送 GET 请求。 （2）无法访问服务器的响应文本，因此只能用于浏览器与服务器间的单向通信。
 */
var img = new Image();
img.onload = img.onerror = function() {
  alert('Done!');
};
img.src = 'http://www.example.com/test?name=Nicholas';

/**
 * 6.2 JSONP：JSON with padding（填充式 JSON 或 参数式 JSON）
 *
 * JSONP由两部分组成：
 * （1）回调函数：当响应到来时应该在页面中调用的函数；
 * （2）数据：传入回调函数中的 JSON 数据。
 *
 * http://freegeoip.net/json/?callback=handleResponse
 * 通过查询字符串来指定 JSONP 服务的回调参数，上面指定的回调函数的名字叫 handleResponse()
 *
 * 使用：JSONP 通过动态 <script> 元素来使用，使用时可以为 src 属性制定一个跨域 URL。
 * 因为 JSONP 是有效的 JavaScript 代码，所以在请求完成后，即在 JSONP 响应加载到页面中以后，就会立即执行。
 */
function handleResponse(response) {
  alert(
    '你正在 IP 地址为：' +
      response.ip +
      ' 响应城市为：' +
      response.city +
      ' 区域名为：' +
      response.regionName +
      '的网中'
  );
}
var script = document.createElement('script');
script.src = 'http://freegeoip.net/json/?callback=handleResponse';
document.body.insertBefore(script, document.firstChild);

/**
 * JSONP
 * 优点：（1）能直接访问响应文本 （2）支持在浏览器与服务器之间双向通信
 * 缺点：
 * （1）JSONP 是从其他域中加载代码执行的。如果其他域不安全，很可能在响应中夹带一些恶意代码。
 * （2）要确定 JSONP 请求是否失败并不容易。开发人员不得不使用计时器检测指定时间内是否接收到了响应。
 */

/**
 * 6.3 Web Sockets
 * 目标：在一个单独的持久连接上提供全双工、双向通信。
 *
 * Web Sockets 使用自定义的协议，未加密的连接为 ws:// ，加密的连接为 wss://
 * 优点：能够在客户端和服务器之间发送非常少量的数据，而不必担心 HTTP 那样字节级的开销。非常适合移动应用。
 */

/* 必须给 WebSocket 构造函数传入绝对 URL。 */
var socket = new WebSocket('ws://www.example.com/server.php');
socket.send('Hello World!');
/* WebSocket 只能通过连接发送纯文本数据，因此复杂的数据结构必须进行序列化 */
var message = {
  time: new Date(),
  text: 'hello world',
  clientId: 'asdfg987654'
};
socket.send(JSON.stringify(message));

/* 服务器向客户端发来消息时，WebSocket 对象会触发 message 事件。 */
socket.onmessage = function(event) {
  var data = event.data;

  //处理数据
};

socket.onopen = function() {};
socket.onerror = function() {};

socket.onclose = function(event) {
  var data = event.data;
};
