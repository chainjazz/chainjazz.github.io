var Huygens = JSClass.Extends(DPVar, function(U,n,mask,output_set,ng,nmap) {
    Huygens.baseConstructor.call(this, U,n,mask,output_set);

    this.conditions = new DPVar(U,1,1,output_set);
    this.x = this.conditions.expect();
    this.k = nmap.length; // length of array with gamester names
    this.a = this.conditions.vset ? this.conditions.vset[0] : null;

    this.gss = new Array();
    this.gs = 0;
    this.stake = this.gs;
    this.stakeFavor = 0; // current gamester favourite
    this.gssn = nmap;
    this.r = ng * this.k; // total number of games

    for (var i = 0; i < this.k; i++) { // populate gamester array
	this.gss.push(0);
    }    
});

Huygens.prototype.reduceFraction = function(a,b) {
    if (a % 2 == 0 && b % 2 == 0)
	this.reduceFraction(a/2, b/2);
    else
	return b;
    
};

Huygens.prototype.isRational = function(ri) {
    var integer = Math.floor(ri);
    var fraction = ri - integer;

    for (var i = 1; i < 8; i++) {
	if ( (i / fraction) % 2 == 0)
	    return Math.round(i / fraction);
    }

    return 1;
};

Huygens.prototype.initStakes = function() {
    //    this.gs = 0;
    var stake = 0;
    
    stake = this.x;
    
    for (var i = 0; i < this.k; i++)
	this.gs += stake;
};

Huygens.prototype.divideStakes = function() {
    var p = 0, q = 0;
    var divisor = 0;
    var dividend = 0;
    var ratk = 0;

    this.stakeFavor = this.gss[0] > this.gss[1] ? 0 : 1;
    
    p = Math.round(this.r / this.k) - Math.min(this.gss[0], this.gss[1]); // 1 - min = max
    q = Math.round(this.r / this.k) - Math.max(this.gss[0], this.gss[1]); // 1 - max = min


    if (p == 0 || q == 0)
	return false;
    else if (q == 1) {
	dividend = 0;
	ratk = 1;	
    }
    else {
	dividend = (p/q);
	ratk = this.isRational(p - (dividend));
    }
    
    divisor = Math.round(Math.pow(2, p));

    // 1_1    
    // 1-2    3- (   0) /  4 = 0.75     =              3 /  4
    // 1-3    7- (   0) /  8 = 0.875    =              7 /  8
    // 1-4   15- (   0) / 16 = 0.9375   =             15 / 16
    // 1-5   31- (   0) / 32 = 0.96875  =             31 / 32
    // 2_2       
    // 2-3    7- ( 1.5) /  8 = 0.6875   =  5.5 /  8 = 11 / 16
    // 2-4   15- (   2) / 16 = 0.8125   =             13 / 16
    // 2-5   31- ( 2.5) / 32 = 0.890625 = 28.5 / 32 = 57 / 64
    // 3_3
    // 3-4   15- ( 1.3) / 16 = 0.85625  = 13.7 / 16 = Irrational
    // 3-5   31- ( 1.6) / 32 = 0.91875  = 29.4 / 32 = Irrational
    // 4_4
    // 4-5   31- (1.25) / 32 = 0.9296875=29.75 / 32 = 119/128
    
    this.stake = p == q ? 0.5 : // if tie, fix to .5, else
	( ( (divisor-1)  - (dividend) ) / (divisor) );

    console.log( q + (p == q ? "_" : "-") + p + ", odds " +
		Math.round(this.stake * divisor * ratk) + " to " +
		Math.round(divisor * ratk - (this.stake * divisor * ratk)) + " in favor of " +
		( p == q ? "_tie_" : this.gssn[this.stakeFavor] )
	       );
    
    return true;
};

Huygens.prototype.playGame = function(stopat) {
    var i = 0;
    var singleOutcome = 0;

    do {
	singleOutcome = 0;
	
	for (var k = 0; k < this.k; k++) {
	    singleOutcome = Math.round(Math.random() * 1);
	    this.gss[k] += singleOutcome;	    
	    
	    if (singleOutcome)
		break;
	    else if (k == this.k - 1) { // if outcome still 0 at last gamester...
		this.gss[k] += 1; // ... force a positive outcome
	    }
	}
	
	i++;
    } while (this.divideStakes() && i < stopat);

    this.divideStakes();
    
    return i;
};

var rounds = 0;
var winPrize = 0;
var gsStake = 0;
var game = new Huygens(new Array(0,1), // universe of possibilities
		       1,1,
		       new Array(0,500), // random X values
		       5,
		       new Array("Rastko", // gamester names
				 "Mirna")
		      );

console.log("\n\n\n------------\n\n\n");
console.log("IGRA ZAPOČETA.");

game.initStakes();
rounds = game.playGame(1000);

gsStake = game.gs / game.k;
winPrize = Math.round(game.gs * game.stake);

console.log("POBEDNIK ODREĐEN POSLE " + (rounds) + " RUNDI.\n" +
	    "Pobednik dobija " + winPrize + ", gubitnik " + (game.gs - winPrize) +
	    " (+-" + Math.round(((winPrize - gsStake) / gsStake) * 100) + "%)");
console.log("\n\n\n------------\n\n\n");


