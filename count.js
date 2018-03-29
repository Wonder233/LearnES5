function f(){
    var count = 1;
    return function () {
        count++;
        return count;
    }
}
var a = f();
var b = f();
console.log(a());
console.log(b());
