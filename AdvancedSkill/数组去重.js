var arr = ['a', 'bb', '22', 'a', 'yuci', 'haha', '22'];

/**
 * 数组去重 ES6的解决方法
 * @param {*} arr
 */
function ES6Method(arr) {
  var set = new Set(arr);
  return [...set];
}

console.log('原始数组：', arr, ' 去重后：', ES6Method(arr));

/**
 * 使用 push() 方法
 */
function usePush(arr) {
  var a = [];
  for (let i = 0; i < arr.length; i++) {
    if(a.indexOf(arr[i])<0){
      a.push(arr[i]);
    }
  }
  return a;
}

console.log('原始数组：', arr, ' 去重后：', usePush(arr));
