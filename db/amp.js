// Arithmetic Modulo Primes
// Crypto prototyping (in accordance with the Crypto I course)
var PrimePair = JSClass.Extends(Object, function(p,q) {
    PrimePair.baseConstructor.call(this,p,q);

    this.p = p;
    this.q = q;

    this.counterZ = 0;
    
});

PrimePair.prototype.next_Z = function() {
    if (this.counterZ == this.p)
	return counterZ = 0; // i.e. p-1
    else
	return this.counterZ++;
};

PrimePair.prototype.eq_Fermat = function(g) {
    return Math.pow(g, this.p - 1) % this.p;
};
