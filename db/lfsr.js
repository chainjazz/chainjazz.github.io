//// LSLFSR - Line feedback shift register class
var LSLFSR = JSClass.Extends(Object, function(t) {
    LSLFSR.baseConstructor.call(this, t);

    // value
    this.register = new Array(); 

    // taps that get xored
    this.taps = new Array();

    // initialize tap array (taps can be achieved with bitshifting as well)
    this.ntob(t, this.taps);    
});

// init state for LFSR (equivalent to seeding the PRG)
LSLFSR.prototype.init = function(i_seed) {
    // isprazni nisku (u slucaju da radimo re-init)
    this.register = new Array();

    // postavi pocetnu vrednost LFSR registra na i_seed
    this.ntob(i_seed, this.register);
};

// linear function that gets performed per clock cycle (override when inheriting)
LSLFSR.prototype.cycle = function(n) {
    // TODO: napraviti biblioteku cycle funkcija
    var xorreg = this.register[this.taps[0]];

    // for each cycle
    for (var x = 0; x < n; x++) {	
	for (var i = 0; i < this.register.length; i++) {
	    for (var j = 1; j < this.taps.length; j++) {
		if (i == j && this.taps[j] == 1) {
		    // XOR taps
		    xorreg = xorreg ^ this.register[i];	    
		}
	    }
	}

	// shift-push (right shift) the LFSR
	this.register.shift();
	this.register.push(xorreg);
    } // n times
};

// number-to-binary-string
//  (should be part of class BigNumber or MyNumber; extended from Number?)
LSLFSR.prototype.ntob = function(i_n, o_reg) {
    for (var i = 1; i < i_n; i *= 2) {
	if ( (i_n & i) == i )
	    o_reg.push(1);
	else
	    o_reg.push(0);
    }    
}; // DEBUG (mainly - see if we actually need this fn, e.g. for BigNumber)

// binary-string-to-number
LSLFSR.prototype.bton = function() {
    var o_val = 0;
    var n_val = 1;
    
    for (var j = 1; j < this.register.length; j++) {
	n_val *= 2;	
	o_val += (n_val) * this.register[j];
    }

    o_val += this.register[0];

    return o_val;
}; // DEBUG (mainly - see if we actually need this fn, e.g. for BigNumber)
