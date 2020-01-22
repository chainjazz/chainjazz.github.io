//// LSCSS - CSS sifrat (kao los primer)
var LSCSS = JSClass.Extends(LinijskiSifrat, function(K, M, C, i_seed) {
    LSCSS.baseConstructor.call(this, K, M, C, i_seed);

    // the key (seed in stream ciphers)
    this.key = new Array(
	new LSLFSR(0x09999),
	new LSLFSR(0x0999999)
    );

    // LFSR carry
    this.c = 0;

    // set key to seed value
    this.key[0].init(0x10000 + (i_seed & 0xFFFF));
    this.key[1].init(0x1000000 + (i_seed & 0xFFFFFF)); // should be in fact 0xFFFFFF0000, req. BigNumber
});

// CSS PRG - nebezbedni primer PRG-a
LSCSS.prototype.G = function() {
    // addition register
    var o_val = 0;

    // cycle LFSRs - e.g. 2 x 8 times
    this.key[0].cycle(8);
    this.key[1].cycle(8);	

    // add registers
    o_val = this.key[0].bton() +
	this.key[1].bton();

    // calculate addition MOD 256 with carry
    this.k = ( (o_val) % 256 + (this.c ) ) % 256;

    // set carry
    this.c = ( (o_val) % 256 > 0 ? 1 : 0 );

    // auxiliary return
    return this.k;
};




// test
var the_state = 0x343132; // key in modern sense (aka PRG seed)
var m = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var c = "";
var d = "";
var i = 0;
var Prostor = new DPProbability(new Array(0,1), 8);
var Kljucevi = new DPProbability(new Array(0,1), 40);
var CSSTest = new LSCSS(Kljucevi, Prostor, Prostor, the_state);
// TODO: napraviti standardnu test klasu za proveru sifrata
// (npr. automatski consistency, secrecy, negligibility, etc.)

do {
    c = "";
    
    for (var n = 0; n < m.length; n++) {	
	// generate real key to this.k 
	CSSTest.G();
	
	// linijski sifrat = OTP + PRG
	c += String.fromCharCode(
	    CSSTest.E(m.charCodeAt(n))
	);
    }
    
    i++;
} while ( CSSTest.key[0].bton() != 0x10000 + ( the_state & 0x0FFFF ) && i < 1);

// reinit PRG
CSSTest.key[0].init(0x10000 + ((the_state) & 0xFFFF));
CSSTest.key[1].init(0x1000000 + ((the_state) & 0xFFFFFF));
CSSTest.c = 0;

for (var n = 0; n < c.length; n++) {
    // ovo je "Stream" (linijski sifrat)
    // TODO: prebaciti u "while" petlju sa markerom kraja
    
    // generate real key to this.k
    CSSTest.G();

    // linijski sifrat = OTP(vernam) + PRG
    d += String.fromCharCode(
	CSSTest.D(c.charCodeAt(n)));
};

console.log(m + "\n" + c + "\n" + d);


// SIMULACIJA RAZBIJANJA CSS SIFRATA

// PSEUDO

//  cist tekst :== poznat prefiks|ostatak teksta
//  napad:
//
//  baziran na opstoj definiciji OTP (vernam-sifrata) gde je
//    kljuc = originaltekst XOR sifrotekst
//    ( kroz komutativnost XOR operatora )
//
//    ali uzevsi u obzir cinjenicu da radimo sa PRGom (generatorom
//   nasumicnih brojeva, tj. "ekpanderom" prostora kljuceva, doduse, neispravnim)
//
//  za sve kombinacije kljuca (u ovom slucaju SAMO DELA SEED-A PRG-A - 17 bita)
//    pseudosifrotekst = poznat prefiks XOR sifrotekst
//    oduzeti pseudosifrotekst od PRG_varijanta(deo kljuca)
//      ako je rezultat jednak PRG_varijanta(deo kljuca) - nasli smo II deo kljuca
//       (NAPOMENA: nejasno objasnjenje - probati sa prostim sekvencama /20+ znakova/)
