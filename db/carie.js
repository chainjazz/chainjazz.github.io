// Multi-precision (big-number) prototype
// Classes beginning with "MP"

var MPBit = JSClass.Extends(Object, function(b) {
    this.b = b;
});

MPBit.prototype.op_add = function(c) {
    var carry = 0;
    
    return carry;
};

var MPNibble = JSClass.Extends(Object, function(b1, b2, b3, b4) {
    this.bits = new Array(b1,
			  b2,
			  b3,
			  b4);
    this.bitptr = 0;
    this.carry = 0;
});

MPNibble.prototype.op_add = function(d) {
    this.bitptr = 0;
    this.carry = 0;
    
    for (var i = 0; i < this.bits.length; i++) {
	this.op_inc(i, (d - 1) * 2);
    }
};

MPNibble.prototype.op_val = function() {
    var v = this.bits[0];
    
    for (var i=1, j=2; i < this.bits.length; i++, j*=2) {
	v += this.bits[i] * j;
    }

    return v;
};

MPNibble.prototype.op_inc = function(i,max) {
    // console.log(this.toString() + this.bitptr + "," + max);
    
    if (this.bitptr < max ) {
	this.bits[i] += 1; // add one
	this.bits[i] += this.carry; // add carry
	this.carry = this.bits[i] > 1 ? 1 : 0; // set new carry
	this.bits[i] %= 2; // normalize bit	    
	this.bitptr++;

	if (this.carry == 0)
	    for (var j = 0; j < i + 1; j++)
		this.op_inc(j, max);
    }

};

MPNibble.prototype.toString = function() {
    var bitc = "";
    
    for (var i = this.bits.length; i > 0; i--)
	bitc += this.bits[i-1].toString() + " ";

    return bitc;	
};

var MPNumber = JSClass.Extends(Object, function() {
    this.dits = new Array(new MPNibble(0,0,0,0));
    this.ditptr = 0;
});

MPNumber.prototype.op_add = function(mpnumber) {
    
    if (this.ditptr < 5) {
	this.dits[this.ditptr].op_add(9);    
	
	if (this.dits[this.ditptr].carry) {
	    //console.log("OVERFLOW " );
	    this.dits.push(new MPNibble(0,0,0,0));
	    this.ditptr++;
	    this.op_add(mpnumber);
	}
    }
};

MPNumber.prototype.toString = function() {
    var vchr = "";
    
    for (var i = this.dits.length; i > 0; i--) {
	vchr += this.dits[i-1].op_val().toString();
    }

    return vchr;
};
