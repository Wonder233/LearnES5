function bind(func,context){
    return function () {
        return func.apply(context,arguments);
    }
}

var handler = {
    message:"Event handled",
    handlerClick:function(e){
        alert(this.message);
    }
}

var btn = document.getElementById("my-btn");
btn.addEventListener("click",bind(handler.handlerClick,handler),false);

//使用bind绑定的函数无法移除
var btn1 = document.getElementById("remove");
btn1.addEventListener("click", function () {
    console.log("remove")
    btn.removeEventListener("click",bind(handler.handlerClick,handler));
});