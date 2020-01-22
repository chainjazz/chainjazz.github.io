// Vernamov sifrat ("One time pad") - savrseni neprakticni linijski sifrat
var VernamovSifrat = JSClass.Extends(Sifrat, function(K, M, C) { // prvi "nerazbivi" sifrat
    VernamovSifrat.baseConstructor.call(this, K, M, C);

    this.k = "";
});

VernamovSifrat.prototype.E = function(i_m) {
    return this.k ^ i_m;
};

VernamovSifrat.prototype.D = function(i_c) {
    return this.k ^ i_c;
};


// primeri
// adversary / attack - TYPE: KEYSPACE
VernamovSifrat.prototype.A = function(i_m, i_c) {
    return i_m ^ i_c;
};




// test

var Prostor = new DPProbability(new Array(0,1), 8);
var Kljucevi = new DPProbability(new Array(0,1),7);
var OTP = new VernamovSifrat(Kljucevi, Prostor, Prostor);
var secretKeyCounter = 0;
var minimumSecrecyPr = 1 / OTP.M.nelements;


var TESTPT = "attack at dawn";
var TESTAR = new Array(0x09, 0xe1, 0xc5, 0xf7, 0x0a, 0x65, 0xac, 0x51, 0x94, 0x58, 0xe7, 0xe5, 0x3f, 0x36);
var TPT = "attack at dusk";
var TESTKY = new Array();

var outppp = "";

for (var i = 0; i < TESTAR.length; i++) {
    TESTKY.push(OTP.A(TESTPT.charCodeAt(i), TESTAR[i]));
}

for (var i = 0; i < TPT.length; i++) {
    OTP.k = TESTKY[i];
    outppp += OTP.E(TPT.charCodeAt(i)).toString(16);
    
    console.log(TPT.toString(16) + " "  + outppp.toString(16) + ", " + TESTKY[i]);
}



console.log("\n\n==========\n Vernam");
console.log("\n\n Starting constistency check...");

for (var i = 0; i < OTP.M.nelements; i++) {
    for (var j = 0; j < OTP.K.nelements; j++) {
	if (OTP._consistency(j, i) == 0) {
	    i = OTP.M.nelements;
	    j = OTP.K.nelements;

	    console.log("CONSISTENCY FAIL!");
	}
    }   
}

console.log("\n Consistency check finished.");

// perfect secrecy proof (correct if <= 1 over |M|, Shannon, C.)
for (var m = 0; m < OTP.M.nelements; m++) {
    for (var c = 0; c < OTP.C.nelements; c++) {
	if (OTP.E(m) == c)
	    for (var k = 0; k < OTP.K.nelements; k++) {
		secretKeyCounter += (OTP.A(m,c) == k ? 1 : 0);
	    }	    
    }
}    

secretKeyCounter /= OTP.K.nelements; // probability that Vm,c: E(k,m) = c
console.log(" Perfect secrecy: " + (secretKeyCounter <= minimumSecrecyPr));
// NOTE: PRACTICAL CIPHERS DO NOT HAVE PERFECT SECRECY
