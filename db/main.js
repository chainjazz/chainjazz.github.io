// require(s); JSI static method
JSI.ImportModules(
    new Array(
	"../lib/js/JSI/oowrapp.js",
	"../lib/js/JSI/brompat.js",	
	"./carie.js", // BigNumber; to become library
	"./amp.js",   // arithmetic modulo primes
	"./dp.js",    // *** discrete probability ***
	"./huygens.js", // value of chances; expected value; division of stake
	"./lfsr.js", // linear feed shift register
	"./sifrat.js",// cipher BASE CLASS; introduces KMC, E,D (abstracts)
	"./sifrat_zamenski.js", //...
	"./sifrat_vernam.js", //... introduces D = E(k,c), XOR
	"./sifrat_linijski.js", //... introduces G(k)
	"./sifrat_rc4.js", //... introduces generic PRG algorithm (insecure)
	"./sifrat_css.js", //... introduces LFSR PRG algorithm (insecure)
	"./ut_sifrat_all.js", // unit test (sifrat_*)
	"./haker.js"  // cryptanalysis lib	
    )
);

// main entry point
var jsiMain = function() {

    var pq = new PrimePair(53,59);
    var i = 1,j = 0;
    var g = 3;
    var dynamicRange = 18428729675200069632;
    var bign1 = new MPNumber();
    var bign2 = new MPNumber();
    var zs = new ZamenskiSifrat();
    var vs = new VernamovSifrat();
    var m = "WHATANICEDAYTODAY";
    var c = "";
    var A = new DPEvent(new Array(0,1), 8, 0x03);
    var B = new DPEvent(new Array(0,1), 8, 0xC0);
    var r = new DPVar(new Array(0,1), 8, new Array());
    var MonoDealDeck = new Array(
	 1, 2, 3, 4, 5, 6, 7, 8, 9,10, // Props
	11,13,14,15,16,17,18, // PropsX
	19,20,21,22,23,24,25,26,27,28, //Acts
	29,30,31,32,33,34, // Rents
	35,36,37,38,39,40 // Money
    );

    var MonoDealOutput = new Array(
	1, 1, // PROPS brown + 1
	2, 2, 2, // PROPS cyan + 2
	3, 3, // PROPS utility + 1
	4, 4, 4, // PROPS pink + 2*
	5, 5, 5, 5, // PROPS stations + 3
	6, 6, 6, // PROPS orange + 2*
	7, 7, 7, // PROPS red + 2*
	8, 8, 8, // PROPS yellow + 2*
	9, 9, 9, // PROPS green + 2
	10,10, // PROPS blue + 1

	11,11, //XPROPS joker
	12,    //XPROPS bc
	13,13, //XPROPS po
	14,    //XPROPS utility
	15,15, //XPROPS ry
	16,    //XPROPS cb
	17,    //XPROPS bg
	18,    //XPROPS gb

	19,19,    //ACTS doublerent
	20,20,20,20,20,20,20,20,20,20, //ACTS passgo
	21,21,21, //ACTS birthday
	22,22,22, //ACTS house
	23,23,23, //ACTS debt
	24,24,24, //ACTS forced
	25,25,25, //ACTS sly
	26,26,    //ACTS hotel
	27,27,27, //ACTS NO!
	28,28,    //ACTS breaker
	
	29,29,    //RENTS cb
	30,30,    //RENTS po
	31,31,    //RENTS utility/station
	32,32,    //RENTS ry
	33,33,    //RENTS gb
	34,34,34, //RENTS XX

	35,35,35,35,35,35, //$1
	36,36,36,36,36,    //$2
	37,37,37,          //$3
	38,38,38,          //$4
	39,39,             //$5
	40                 //$10
    );


    var MDP = new DPVar(MonoDealDeck,1,1,MonoDealOutput);
    var bpcounter = 0;
    var birthdayParadox = new Array();

    // Monopoly Deal (independent test)

    console.log("[MD] base probability is " + MDP.P(2));

    
    // probability check
    console.log("U{0,1} ^8, A{Vx€U, lsb2(x)=11}, A (0x" + A.mask.toString(2) + "): Pr[A] = " + A.Pr());

    // union bound
    console.log("BOUNDS\nIntersection A n B (" + B.mask.toString(2) + ") is " +
		(A.Pr() * B.Pr()) + 
		"\nUnion A u B (" + B.mask.toString(2) + ") is " +
		( (A.Pr() + B.Pr()) - (A.Pr() * B.Pr())  ) + 
		"\n(if intersection is 0, union = Pr(A) + Pr(B)"
	       );

    // independence
    console.log("Independence(A, B) (" + (A.mask | B.mask).toString(2) + ") = " + A.isIndependentOf(B) );

    // birthday paradox
    while (bpcounter < r.nelements) {
	r.v = Math.round(Math.random() * r.nelements);
	
	for (var j = 0; j < bpcounter; j++)
	    if (r.v == birthdayParadox[j]) {	    
		console.log("Double at " + bpcounter);
		bpcounter = r.nelements;
	    }
	
	birthdayParadox.push(r.v);
	bpcounter++;
    };
    
    // console.log("pq " + pq);
    // console.log("Zp " + pq.next_Z().toString());
    
    j = g;

    while (i < 1 ) {
	/* console.log("j=" + j.toExponential(32) +
	 *	    (j > Math.pow(2,52) ? " (TOO BIG)" : " ") +
	 *	    (j*g % j == 0 ? "" : " - ERROR")
	 *	   );
	 */
	j = j * g;	
	i++;
    }

    bign1.op_add(bign2);
    //bign1.op_add(bign2);

    // console.log("BIG NUMBER = " + bign1.toString());
    // console.log("KEY      " + zs.keystring);
    // console.log("PLAIN    " + m);
    // console.log("CIPHER   " + zs.E(m)); // štampaj ciphertext
    // console.log("DECIPHER " + zs.D(zs.E(m))); // štampaj deÅ¡ifrovan ciphertext (provera simetrije)
    // console.log("CONSTCHK " + zs.checkConst(m));
    // console.log("Vernam E " + vs.E(m));

};
