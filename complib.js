XBBaseClass = function() {
	var me = this;
};


XBBaseClass.prototype = {
		getElementText: function(element) {
			return element.textContent || element.innerText;
		},
		setElementText: function(element, text) {
			var itemtext = document.createTextNode(text);
			element.appendChild(itemtext);
		}
};


