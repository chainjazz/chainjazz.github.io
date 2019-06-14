DDMenuItem = function(label, url) {
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
};

DDMenuList = function(rootelement, itemarray) {
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
};

DDMenu = function() {
	DDMenu.baseConstructor.call(this);
};

DDMenu.prototype = {
	build: function() {
		
	}
}

// APPLY INHERITANCE
Extender.subclass(DDMenuItem, XBBaseClass);
Extender.subclass(DDMenuList, XBBaseClass);
Extender.subclass(DDMenu, XBBaseClass);

// MAIN MAIN MAIN MAIN MAIN
var ddmenuitems = Array( 
	 new DDMenuItem("item0", "./")
	,new DDMenuItem("item1", "./")
	,new DDMenuItem("item2", "./")
	,new DDMenuItem("item3", "./")
	,new DDMenuItem("item4", "./")
	,new DDMenuItem("item5", "./")
	,new DDMenuItem("item6", "./")
	,new DDMenuItem("item7", "./")
	,new DDMenuItem("item8", "./")
	,new DDMenuItem("item9", "./")
	//,new DDMenuItem("item", "./")
);

var ddmenuhier = Array(
	ddmenuitems[0],
	new DDMenuList( ddmenuitems[1], Array(
		ddmenuitems[2],
		ddmenuitems[3])
	),
	ddmenuitems[4],
	new DDMenuList( ddmenuitems[5], Array(
		ddmenuitems[6],
		new DDMenuList( ddmenuitems[7], Array(
			ddmenuitems[8])
		), 
		ddmenuitems[9])		
	)	
);

var ddmenustr = 0;

var ddmenuroot = document.getElementById("navstrip");
var ddmenu = new DDMenuList( ddmenuroot, ddmenuhier );

ddmenu.menulist.setAttribute("class", "cssddmenu");
ddmenuroot.appendChild( ddmenu.menulist );

// "thenavstrip"
