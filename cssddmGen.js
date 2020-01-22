var DDMenuItem = JSClass.Extends(XBBaseClass, function(label, url) {
	DDMenuItem.baseConstructor.call(this, label, url);

	// CONSTRUCTOR
	this.label = label;
	this.url = url;	
	this.domelement = document.createElement("LI");
	this.anchor = document.createElement("A");
	this.text = document.createTextNode(this.label);
	
	this.setElementText(this.anchor, label);
	this.anchor.href = this.url;	
	
	this.domelement.appendChild(this.anchor);	
});

var DDMenuList = JSClass.Extends(XBBaseClass, function(rootelement, itemarray) {
	DDMenuList.baseConstructor.call(this, rootelement, itemarray);	
	
	// CONSTRUCTOR
	this.root = rootelement;
	this.submenu = itemarray;
	this.domelement = document.createElement("LI");
	this.menulist = document.createElement("UL");
	this.menuitem = document.createElement("A");
	
	this.setElementText(this.menuitem, 
		this.getElementText(this.root.domelement || "")
	);	
	
	this.domelement.setAttribute("class", "nest");	
	
	this.domelement.appendChild(this.menuitem);
	
	for (var i = 0; i < itemarray.length; i++) {
		this.menulist.appendChild(this.submenu[i].domelement);
	}	
		
	this.domelement.appendChild(this.menulist);	
});






// MAIN MAIN MAIN MAIN MAIN

var ddmenuhier = Array(
    new DDMenuItem("Home", "./index.html"),
    new DDMenuList(
	new DDMenuItem("JavaScript apps", "#loopback"),
	new Array(new DDMenuItem("Cryptography studies", "./db/index.html"))
    )	
);

var ddmenustr = 0;

var ddmenuroot = document.getElementById("navstrip");
var ddmenu = new DDMenuList( ddmenuroot, ddmenuhier );

ddmenu.menulist.setAttribute("class", "cssddmenu");
ddmenuroot.appendChild( ddmenu.menulist );

// "thenavstrip"
