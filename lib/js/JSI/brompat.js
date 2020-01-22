// browser compatibility abstraction library

var XBBaseClass = JSClass.Extends(Object, function() {
    XBBaseClass.baseConstructor.call(this);
    var me = this;
});


XBBaseClass.prototype.getElementText = function(element) {
    return element.textContent || element.innerText;
};

XBBaseClass.prototype.setElementText = function(element, text) {
    var itemtext = document.createTextNode(text);
    element.appendChild(itemtext);
};



