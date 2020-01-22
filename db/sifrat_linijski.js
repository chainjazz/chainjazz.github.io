var LinijskiSifrat = JSClass.Extends(VernamovSifrat, function(K,M,C) { // abstract
    LinijskiSifrat.baseConstructor.call(this, K,M,C);

}); // ekstenzija One Time Pad-a (Linijski = Stream)

// PRG(k) instead of k -> K
LinijskiSifrat.prototype.G = function(i_seed) { // "eff." computable, deterministic
    return 0; // override
};

LinijskiSifrat.prototype.hatohn = function(hexstring, i) {
    return Number("0x" + hexstring[i] + hexstring[i+1]);
};

LinijskiSifrat.prototype.hntoha = function(v) {
    return (v < 0x10 ? "0" : "") + (isNaN(v) ? "  " : v.toString(16))
};

LinijskiSifrat.prototype.atoha = function(a) {
    var ha = "";
    
    for (var i = 0; i < a.length; i++) {
	ha += this.hntoha(a.charCodeAt(i));
    }

    return ha;
};


// primeri

LinijskiSifrat.prototype.A = function(i_i, i_seed) { // "eff." ADVERSARY | ATTACK
    // PREDICTABILITY ATTACK
    
    var i_next = 0;
    var k = 0;

    // note: i_k is now a seed, used to produce the real key
    // and it doesn't satisfy "prefect secrecy", however
    // if PRG(i_k) has "NEGLIGIBLE" predictability, cipher is secure
    
    for (var i = 0; i < i_i; i++) {
	k = this.G(i_seed);
	// OVERRIDE: compute i_next somehow
	i_next = k ^ k; // should be a banal example, but look into it
    }

    if (i_next == this.G(i_k)) // G(k) | i+1
	return 1;    
    else
	return 0;
	
};

// THIS FUNCTION IS NOT VALID - REITERATE
LinijskiSifrat.prototype.is_negligible = function(i_poly, i_n, i_r) {
    if ( i_r >= 1 / Math.pow(i_poly, i_n) ) // requires big number
	return 0;
    else if ( i_r <= 1 / Math.pow(i_poly, i_n) ) // requires big number
	return 1;

    
};
