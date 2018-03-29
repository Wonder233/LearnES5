
// ʵ��һ�������¡���� clone��
// ���Զ�JavaScript�е�5����Ҫ���������ͣ�����Number��String��Object��Array��Boolean������ֵ���ơ�
/**
 * �����¡
 * ֧�ֻ����������ͼ�����
 * �ݹ鷽��
 */
function clone(obj) {
    var o;
    switch (typeof obj) {
        case "undefined":
            break;
        case "string":
            o = obj + "";
            break;
        case "number":
            o = obj - 0;
            break;
        case "boolean":
            o = obj;
            break;
        case "object": // object ��Ϊ������� ����Object�������飨Array��
            if (obj === null) {
                o = null;
            } else {
                if (Object.prototype.toString.call(obj).slice(8, -1) === "Array") {
                    o = [];
                    for (var i = 0; i < obj.length; i++) {
                        o.push(clone(obj[i]));
                    }
                } else {
                    o = {};
                    for (var k in obj) {
                        o[k] = clone(obj[k]);
                    }
                }
            }
            break;
        default:
            o = obj;
            break;
    }
    return o;
}