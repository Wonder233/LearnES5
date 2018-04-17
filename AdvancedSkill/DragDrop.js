var DragDrop = (function() {
  var dragging = null, //存储拖动对象
    diffX = 0,
    diffY = 0;
  function handleEvent(e) {
    e = EventUtil.getEvent(e);
    var target = EventUtil.getTarget(e);

    switch (e.type) {
      case 'mousedown':
        if (target.className.indexOf('draggale') > -1) {
          console.log(target, e);
          dragging = target;
          // 计算鼠标在taget上的偏移
          diffX = e.clientX - target.offsetLeft;
          diffY = e.clientY - target.offsetTop;
        }
        break;
      case 'mousemove':
        if (dragging !== null) {
          log(
            'e.clientX - diffX',
            e.clientX - diffX,
            'e.clientY - diffY',
            e.clientY - diffY
          );
          var point = {
            x: e.clientX - diffX,
            y: e.clientY - diffY
          };
          if (point.x >= 0 && point.x <= 600 - dragging.clientWidth) {
            dragging.style.left = point.x + 'px';
          }
          if (point.y >= 0 && point.y <= 600 - dragging.clientHeight) {
            dragging.style.top = point.y + 'px';
          }
        }
        break;
      case 'mouseup':
        dragging = null;
        break;
    }
  }

  return {
    enable: function() {
      EventUtil.addListener(document, 'mousemove', handleEvent);
      EventUtil.addListener(document, 'mousedown', handleEvent);
      EventUtil.addListener(document, 'mouseup', handleEvent);
    },
    disable: function() {
      EventUtil.removeListener(document, 'mousemove', handleEvent);
      EventUtil.removeListener(document, 'mousedown', handleEvent);
      EventUtil.removeListener(document, 'mouseup', handleEvent);
    }
  };
})();

DragDrop.enable();
