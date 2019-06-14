Extender = {};

Extender.subclass = function(sub,base) {
	Inheritance = function() {};
	
	Inheritance.prototype = base.prototype;
	sub.prototype = new Inheritance();
	sub.prototype.constructor = sub;
	sub.baseConstructor = base;
	sub.superClass = base.prototype;
};
