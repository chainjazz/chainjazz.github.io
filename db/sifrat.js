var Sifrat = JSClass.Extends(Object, function(K, M, C) {
    this.K = K; // prostor ključeva
    this.M = M; // prostor poruka
    this.C = C; // prostor šifro-niske
});

Sifrat.prototype.E = function(i_k, i_m) { // often randomized, polynomial or acceptable time
    return 0; // override
};

Sifrat.prototype.D = function(i_k, i_c) { // always deterministic, polynomial or acceptable time
    return 0; // override
};

Sifrat.prototype._consistency = function(i_k, i_m) {
    if (this.D(i_k, this.E(i_k, i_m)) == i_m)
	return 1;
    else
	return 0;
};

Sifrat.prototype.A = function(i_k, i_m, i_c) { // (A)dversary | (A)ttack | (A)nalysis
	return 0; // override
};






    
