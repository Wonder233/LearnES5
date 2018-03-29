
/*EventUtil.addListener(document,"mousemove",function(e){
    var myDiv = document.getElementById("myDiv");
    myDiv.style.left = e.clientX +"px";
    myDiv.style.top = e.clientY +"px";
});*/

var DragDrop = function () {
    var dragging = null,
        diffX = 0,
        diffY = 0;
    function handleEvent(e){
        e = EventUtil.getEvent(e);
        var target = EventUtil.getTarget(e);

        switch (e.type){
            case "mousedown":
                if(target.className.indexOf("draggale") > -1){
                    console.log(target,e);
                    dragging = target;
                    diffX = e.clientX - target.offsetLeft;
                    diffY = e.clientY - target.offsetTop;
                }
                break;
            case "mousemove":
                if(dragging !== null){
                    log("e.clientX - diffX",e.clientX - diffX,"e.clientY - diffY",e.clientY - diffY)
                    var point = {
                        x:e.clientX - diffX,
                        y:e.clientY - diffY
                    };
                    if (point.x >= 0 && point.x <= 600 - dragging.clientWidth) {
                        dragging.style.left = (e.clientX - diffX) + "px";
                    }
                    if (point.y >= 0 && point.y <= 600 - dragging.clientHeight) {
                        dragging.style.top = (e.clientY - diffY) + "px";
                    }
                }
                break;
            case "mouseup":
                dragging = null;
                break;
        }
    };

    return{
        enable: function () {
            EventUtil.addListener(document,"mousemove",handleEvent);
            EventUtil.addListener(document,"mousedown",handleEvent);
            EventUtil.addListener(document,"mouseup",handleEvent);
        },
        disable: function () {
            EventUtil.removeListener(document,"mousemove",handleEvent);
            EventUtil.removeListener(document,"mousedown",handleEvent);
            EventUtil.removeListener(document,"mouseup",handleEvent);
        }
    }
}();
DragDrop.enable()