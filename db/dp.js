// discrete probability proto typing

// (crash course by Dan Boneh)


var DPProbability = JSClass.Extends(Object, function(U,n) {
    this.finite_set = U;
    this.nelements = Math.round(Math.pow(this.finite_set.length, n)); // requires big number
    this.exp = n;
});

DPProbability.prototype.distb = function(x) { // distribution definition; uniform by default, overrideable
    return 1 / this.nelements;
};

DPProbability.prototype.P = function(x) {
    return this.distb(x);
};

var DPEvent = JSClass.Extends(DPProbability, function(U,n,mask) {
    DPEvent.baseConstructor.call(this,U,n);
    
    this.mask = mask;
    // this.bound = Math.max(bound, mask);

    this.nselements = function() {
	var mask_counter = 0;
	var mask_bit = 0;
	
	for (var i = 0; i < this.nelements; i++) {
	    mask_bit = 0;	    
	    
	    if ((i & this.mask) == this.mask)
		++mask_counter;	    	    
	};

	return mask_counter;
    };
});

DPEvent.prototype.Pr = function(x) {
    return this.nselements() * this.P(x);
};

DPEvent.prototype.Pr_not = function(x) {
    return 1 - this.Pr(x);
};

DPEvent.prototype.isIndependentOf = function(dpevent) {
    var AA = new DPEvent(this.finite_set, this.exp, this.mask | dpevent.mask);

    if (AA.Pr() == this.Pr() * dpevent.Pr())
	return 1;
    else
	return 0;
};

var DPVar = JSClass.Extends(DPEvent, function(U,n,mask,output_set) {
    DPVar.baseConstructor.call(this,U,n,mask);
    
    this.vset = output_set;
    this.v = output_set ? this.vset[0] : null;
});

DPVar.prototype.expect = function() {
    var r = 0;

    for (var i = 0; i < this.vset.length; i++) {
	r += this.vset[i] * this.P(this.vset[i]);
    };

    return r;
};

var DPBinvar = JSClass.Extends(DPVar, function(U,n,mask,output_set,i) {
    DPBinvar.baseConstructor.call(this,U,n,mask,output_set);

    this.n = i;
});

DPBinvar.prototype.Pr = function(x) {
    return (this.n / x) *
	(Math.pow(this.P(1), x)) *
	(Math.pow((1 - this.P(1)), this.n - x));
};


// STATISTICAL TEST (nacin da se definise "bezbednost" PRG-a)
//
//  statisticki test je (za nase potrebe)
//  funkcija ("A") koja vraca "TRUE" ako je
//    stvarna verovatnoca podskupa x = (otprilike) ocekivanoj (jednolicnoj) verovatnoci
//    tj. Pr(x) - Uniform(x) <= m * sqrt(n), (sto manji moguci broj blizak nuli)
//  a u suprotnom FALSE
//
// S OBZIROM DA CE STATISTICKI TEST ZA PRG DATI "PRIBLIZNE" VREDNOSTI
//  potrebno je da vidimo kolika je razlika VEROVATNOCE STATISTICKOG TESTA ZA G(k)
//  I V.S.T-a ZA r (nasumicni niz)
//
// ovu razliku nazivamo PREDNOSCU ("ADVANTAGE"), i rezultat je izmedju 0 i 1, gde
// rezultat blizi nuli znaci manja prednost, tj. manja predvidivost
//
//   /todo: kodirati/
//
// TE TAKO MOZEMO DEFINISATI "BEZBEDAN" PRG (generator/ekspander nasumicnih brojeva)
// DA JE
//   V "eff" A, ADVprg[A,G] je "neg" (zanemarljivo)
//    ("eff" znaci "efikasni", tj. izracunljivi racunarski)
//
// NAPOMENA: "BEZBEDAN" PRG TAKODJE NIJE DEFINITIVAN, TJ. PRIBLIZAN (mozemo da kazemo
// da za "efikasni" statisticki test "A", PREDNOST u odnosu na PRG je zanemarljiva, ali
// ne mozemo da znamo da je to isto tacno za SVAKI statisticki test ( "P != NP" ) ).//
// Zanemarivsi "igru reci", mozemo da kazemo da je PRG "NEPREDVIDIV" kada "NIJE PREDVIDIV"
// ("nepredvidiv" je negativ, a "nije predvidiv" kontra-pozitiv; negativ ne mozemo dokazati,
// ali kontra-pozitiv mozemo; drugim recima dokaz negativa mora biti apsolutan, dok dokaz
// kontra-pozitiva moze biti samo dovoljno kompleksan, pa tako i negiran)
//
// Ovde najbolje vidimo koncept "zanemarljivosti" i "3"vrednost ("EPSILON"!); cesto cemo
// sretati koncept zanemraljivosti, a u kontekstu jednolicne distribucije verovatnoce,
// zanemarljivost cemo obicno definisati kao 0.5 + EPSILON, za EPSILON <= 1/1000 (vrediti
// napomenuti da je "0.5" vrednost "nula" u verovatnoci)
//
// U PRAKTICNOJ PRIMENI, DOKAZANO JE I DA JE "NEPREDVIDIV" PRG "BEZBEDAN"; naime, ako
// tzv. "predvidjaci sl. bita" (setimo se, Pr[G(k) = x] | i+1) NE MOGU predvideti sl. bit
// (postoje razni algoritmi), onda ni statisticki testovi NEMAJU PREDNOST.
//
//
// 
// == UOPSTENO ==, ovde postavljamo pitanje: da li mozemo uociti RAZLIKU izmedju dve distribucije
// verovatnoce?, ili, simbolicki
//
//   PRG je bezbedan ako { k <-R- K: G(k) } ==== uniform( {0,1}^n )
//
//   (==== znaci priblizno jednako u "polinomijalnom vremenu"), dakle PRG je nevidljiv.


// test

var Bit = new Array(0,1);
var FairDie = new Array(1,2,3,4,5,6);
var FairDeck = new Array();
var rvB = new DPEvent(Bit,1,1);
var BinNP = new DPBinvar(Bit,1,1,new Array(1), 3);
var TA = new DPEvent(FairDie,1,0); // working with bitmasks here,not outcome values
var TB = new DPEvent(FairDie,1,0);
var Three = new DPEvent(Bit,3,0x3);
var Two = new DPEvent(Bit,8,1);
var Five = new DPEvent(Bit,8,5);
var Die = new DPVar(FairDie, 1, 1, new Array(3,3,3));
var Coin = new DPVar(Bit, 1, 1, new Array(1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1));

// distribution functions
var Ber = function(x) {
    if (x == 1)
	return 0.9;
};

for (var i = 0; i < 52; i++) {
    FairDeck.push(i);
};

TB = new DPEvent(FairDeck,1,0);
rvB.distb = Ber;
BinNP.distb = Ber;

// getting a three
console.log("Die(A=3) is " + TA.P(3) + ", " + Three.Pr()  + "(n: " + Three.nelements +
	    ", ns: " + Three.nselements() + ", xxx: " + Three.mask.toString(2) + ")");
// (check)
console.log("Die(A=2) is " + TA.P(2) + " and Die(A=5) is " + TA.P(5));
// getting 2,3 or 5
console.log("Die(A=2,3 or 5) is " + (TA.P(2) + TA.P(3) + TA.P(5)));
// getting a 4 and picking a (insert suit and card) from a standard deck
console.log("Die + one card (A=1,B=1) = " + (TA.P(4) * TB.P(1)));
// Bernoulli test
console.log("Bernoulli (1) = " + rvB.Pr(1) + ", (0) = " + rvB.Pr_not(1));
// Bernoulli example 1
console.log(" BinNP(3/3) = " + BinNP.Pr(3) + // out of 3
	    " BinNP(3/2) = " + BinNP.Pr(2) + // out of 3
	    " BinNP(3/1) = " + BinNP.Pr(1) + // out of 3
	    " BinNP(3/0) = " + BinNP.Pr(0)); // out of 3
// random variable expectation
console.log(" For " +
	    Die.vset.length + " rolls of a die, expectation for a wanted number is to be " +
	    (Die.expect()) + "%");
console.log(" For " +
	    Coin.vset.length + " coin tosses, expectation for heads is to be " +
	    (Coin.expect()) + "%");
