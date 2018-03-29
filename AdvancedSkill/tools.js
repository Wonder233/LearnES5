var group = console.group,
    groupEnd = console.groupEnd,
    log = console.log;

EventUtil={
    addListener:function(target,type,handler){
        if(target.addEventListener){
            target.addEventListener(type,handler);
        }else if(target.attachEvent){
            target.attachEvent("on"+type,function(){
                handler.call(target);  //让handler中的this指向目标元素
            });
        }else{
            target["on"+type]=handler;
        }
    },
    removeListener:function(target,type,handler){
        if(target.removeEventListener){
            target.removeEventListener(type,handler);
        }else if(target.detachEvent){
            target.detachEvent("on"+type,handler);
        }else{
            target["on"+type]=null;
        }
    },
    getEvent:function(e){      //获取事件对象
        var evt=window.event||e;
        return evt;
    },
    getTarget:function(e){      //获得目标对象
        var evt=EventUtil.getEvent(e);
        var target;
        if(evt.target){
            target=evt.target;
        }else {
            target=evt.srcElement;
        }
        return target;
    },
    stopPropagation:function(e){  //停止冒泡
        var evt=EventUtil.getEvent(e);
        if(evt.stopPropagation) {
            evt.stopPropagation();
        }else {
            evt.cancelBubble=true;
        }
    },
    preventDefault:function(e){   //阻止默认行为的发生
        var evt=EventUtil.getEvent(e);
        if(evt.preventDefault){
            evt.preventDefault();
        }else {
            e.returnValue=false;
        }
    }
}
