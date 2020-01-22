JSClass = {};

JSClass.Extends = function(baseClass, constructor) {
    Inheritance = function() {};
    
    Inheritance.prototype = baseClass.prototype;
    constructor.prototype = new Inheritance();
    constructor.prototype.constructor = constructor;
    constructor.baseConstructor = baseClass;
    constructor.superClass = baseClass.prototype;

    return constructor;
};



