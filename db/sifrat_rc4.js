var RCSifrat = JSClass.Extends(LinijskiSifrat, function() {
    RCSifrat.baseConstructor.call(this);
});

RCSifrat.prototype.G = function(i_seed, a,b,p) { // weak PRG, predicatble (TODO: test!)
    var seed = i_seed[0];
    var o_k = 0;

    // e.g, glibc random()
    //  p = 2^^32
    //  a = 1
    //  b = i_seed[i - (p - 1)]
    //  -->
    //  i_seed[i] = (a * i_seed[i-3] + b) % p

    for (var i = 1; i < i_seed.length; i++) {
	i_seed[i] = (a * i_seed[i-1] + b) % p;

	// TODO: output a few bits of i_seed[i] (?!)
	//o_k += i_seed[i]; 
    }

    return o_k;
};
