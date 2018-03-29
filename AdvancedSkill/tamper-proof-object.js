/**
 * 防篡改对象
 */

group("不可扩展对象");
/* 1. 不可扩展对象 Object.preventExtensions() */
//正常情况下，任何时候都可以向对象中添加属性和方法。
var person = {name:"Nicholas"};
person.age = 29;

/* 使用 Object.preventExtensions() 方法可以改变这个行为，使得不能再给对象添加属性和方法。 */
Object.preventExtensions(person);
person.job = "Engineer";
log(person.job); //undefined

// 虽然不能添加新成员，但是已有的成员仍然可以修改和删除。
person.name = "Wonder";
log(person.name); //undefined

delete person.name;
log(person.name); //undefined

/* 可以使用 Object.isExtensible() 方法确定对象是否可以扩展。*/
log("isExtensible "+Object.isExtensible(person));
log("isSealed "+Object.isSealed(person));
log("isFrozen "+Object.isFrozen(person));

groupEnd();

group("密封的对象");
/* 2. 密封的对象 Object.seal()  */
//密封对象不可扩展，而且已有成员的 [[Configurable]] 特性将被设置为 false，即：不能删除属性和方法。
//属性值可以修改
var person1 = {name:"Nicholas"};
Object.seal(person1);

// 不能添加新成员，已有的成员可以修改但是不能删除。
person1.age = 29;
log(person1.age); //undefined

person1.name="Wonder";
log(person1.name);

delete person1.name;
log(person1.name); //Nicholas

/* 可以使用 Object.isSealed() 方法确定对象是否被密封了。*/
log("isExtensible "+Object.isExtensible(person1));
log("isSealed "+Object.isSealed(person1));
log("isFrozen "+Object.isFrozen(person1));

groupEnd();
group("冻结的对象");
/* 3. 冻结的对象 Object.freeze() */
//最严格的防篡改级别，冻结的对象既不可扩展，又是密封的，而且对象数据属性的 [[Writable]] 特性会被设置为 false。
//如果定义 [[Set]] 函数，访问器属性仍然是可写的。
var person2 = {name:"Nicholas"};
Object.freeze(person2);

// 不能添加新成员，已有的成员不能修改和删除。
person2.age = 29;
log(person2.age);

delete person2.name;
log(person2.name);

person2.name="Wonder";
log(person2.name);

/* 可以使用 Object.isFrozen() 方法确定对象是否被冻结了。*/
log("isExtensible "+Object.isExtensible(person2));
log("isSealed "+Object.isSealed(person2));
log("isFrozen "+Object.isFrozen(person2));

groupEnd();


