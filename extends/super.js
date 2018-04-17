/**
 * 用 ES5 模拟 ES6 中的 super关键字
 */

function Animal(){
    this.name = "Animal";
    this.getName = function () {
        console.log("name="+this.name);
    }
}

function Cat(){
    this.name="cat";
    this.getName1 = function () {
        console.log("name="+this.name);
    }
}
Cat.prototype = new Animal();
Cat.prototype.constructor = Cat;
Cat.prototype.__super = Animal;
//或者
//Cat.prototype.__super = Cat.prototype;

Cat.prototype.getName2= function () {
    console.log("name="+this.__super.name);
}

var c = new Cat();
c.getName2();
