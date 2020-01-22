////
// Zamenski sifrat

var ZamenskiSifrat = JSClass.Extends(Sifrat, function() {
    ZamenskiSifrat.baseConstructor.call(this);
    
    var j = 0;
    var substchar = null;
    var n = null;
    this.k = new Array();
    this.keystring = "";
    this.idseq = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    n = this.idseq.length;

    for (var k = 0; k < n; k++)
	this.k.push(this.idseq.charAt(k));

    for (var i = 0; i <= n - 2; i++) {
	j = i + this.uniform(n-i); // if n > PRG, uniform=random
	substchar = this.k[i];
	this.k[i] = this.k[j];
	this.k[j] = substchar;
	this.keystring += this.k[i];
    }
});

ZamenskiSifrat.prototype.uniform = function(m) {
    return Math.round(Math.random() * (m-1)); // distribution wrapper
};

ZamenskiSifrat.prototype.E = function(m) { 
    var c = "";
    
    for (var i = 0; i < m.length; i++) {
	c += this.keystring.charAt(m.charCodeAt(i) - 65);
    }
    
    return c;
};

ZamenskiSifrat.prototype.D = function(c) { 
    var m = "";

    for (var i = 0; i < c.length; i++) {
	m += this.idseq.charAt(this.keystring.indexOf(c.charAt(i)));
    }

    return m;
};
