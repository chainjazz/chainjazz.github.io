var LeTable = JSClass.Extends(XBBaseClass, function(defaultStyle) {
    LeTable.baseConstructor.call(this, defaultStyle);

    this.root = document.body;    
    this.table = document.createElement("TABLE");
    this.table.style.cssText = defaultStyle;
    this.lastrow = null;
});

LeTable.prototype.push_row = function (immediateStyle) {
    var newrow = document.createElement("TR");

    newrow.style.cssText = "\
" + immediateStyle;

    this.lastrow = this.table.appendChild(newrow);
};

LeTable.prototype.push_val = function (v, immediateStyle) {
    var newcell = document.createElement("TD");

    newcell.style.cssText = "\
border: 1px black solid;\
padding: .3em;" + immediateStyle;
    
    this.setElementText(newcell, v);
    this.lastrow.appendChild(newcell);
};

LeTable.prototype.dominstant = function() {

    
    if (this.root) {	
	this.root.appendChild(this.table);
    }
};

// remove table rows on new "query"
LeTable.prototype.domclear = function() {
    while (this.table.firstChild) {
	this.table.removeChild(this.table.firstChild);
    }
};


var LeForm = JSClass.Extends(XBBaseClass, function(defaultStyle) {
    LeForm.baseConstructor.call(this);
    var me = this;
    
    this.root = document.body;
    
    this.form = document.createElement("FORM");
    this.form.style.cssText = defaultStyle;
    this.i_crib = document.createElement("INPUT");
    this.i_crib.setAttribute("type", "text");
    
    
    this.i_exec = document.createElement("INPUT");
    this.i_exec.setAttribute("type", "button");
    this.i_exec.setAttribute("value", "XOR search");
    this.i_exec.setAttribute("default", "true");
    this.param1 = this.getElementText(this.i_crib); 
    
});

LeForm.prototype.dominstant = function() {
    if (this.root) {

	this.form.appendChild(this.i_crib);
	this.form.appendChild(this.i_exec);
	this.root.appendChild(this.form);	
    }
};

// TODO: implementirati polinome u obliku klasa
var Prostor = new DPProbability(new Array(0,1), 8);
var lintest = new RCSifrat(Prostor, Prostor, Prostor);
var otphack = new LinijskiSifrat(Prostor, Prostor, Prostor);
var cryptoanalyse = null; //callback function to be
var f = new LeForm("\
margin: 1em;");
var t = new LeTable("\
border-collapse: collapse;\
font-family:monospace;\
font-size: 1em;");

var ciphertexts = new Array(
    "315c4eeaa8b5f8aaf9174145bf43e1784b8fa00dc71d885a804e5ee9fa40b16349c146fb778cdf2d3aff021dfff5b403b510d0d0455468aeb98622b137dae857553ccd8883a7bc37520e06e515d22c954eba5025b8cc57ee59418ce7dc6bc41556bdb36bbca3e8774301fbcaa3b83b220809560987815f65286764703de0f3d524400a19b159610b11ef3e",
    "234c02ecbbfbafa3ed18510abd11fa724fcda2018a1a8342cf064bbde548b12b07df44ba7191d9606ef4081ffde5ad46a5069d9f7f543bedb9c861bf29c7e205132eda9382b0bc2c5c4b45f919cf3a9f1cb74151f6d551f4480c82b2cb24cc5b028aa76eb7b4ab24171ab3cdadb8356f",
    "32510ba9a7b2bba9b8005d43a304b5714cc0bb0c8a34884dd91304b8ad40b62b07df44ba6e9d8a2368e51d04e0e7b207b70b9b8261112bacb6c866a232dfe257527dc29398f5f3251a0d47e503c66e935de81230b59b7afb5f41afa8d661cb",
    "32510ba9aab2a8a4fd06414fb517b5605cc0aa0dc91a8908c2064ba8ad5ea06a029056f47a8ad3306ef5021eafe1ac01a81197847a5c68a1b78769a37bc8f4575432c198ccb4ef63590256e305cd3a9544ee4160ead45aef520489e7da7d835402bca670bda8eb775200b8dabbba246b130f040d8ec6447e2c767f3d30ed81ea2e4c1404e1315a1010e7229be6636aaa",
    "3f561ba9adb4b6ebec54424ba317b564418fac0dd35f8c08d31a1fe9e24fe56808c213f17c81d9607cee021dafe1e001b21ade877a5e68bea88d61b93ac5ee0d562e8e9582f5ef375f0a4ae20ed86e935de81230b59b73fb4302cd95d770c65b40aaa065f2a5e33a5a0bb5dcaba43722130f042f8ec85b7c2070",
    "32510bfbacfbb9befd54415da243e1695ecabd58c519cd4bd2061bbde24eb76a19d84aba34d8de287be84d07e7e9a30ee714979c7e1123a8bd9822a33ecaf512472e8e8f8db3f9635c1949e640c621854eba0d79eccf52ff111284b4cc61d11902aebc66f2b2e436434eacc0aba938220b084800c2ca4e693522643573b2c4ce35050b0cf774201f0fe52ac9f26d71b6cf61a711cc229f77ace7aa88a2f19983122b11be87a59c355d25f8e4",
    "32510bfbacfbb9befd54415da243e1695ecabd58c519cd4bd90f1fa6ea5ba47b01c909ba7696cf606ef40c04afe1ac0aa8148dd066592ded9f8774b529c7ea125d298e8883f5e9305f4b44f915cb2bd05af51373fd9b4af511039fa2d96f83414aaaf261bda2e97b170fb5cce2a53e675c154c0d9681596934777e2275b381ce2e40582afe67650b13e72287ff2270abcf73bb028932836fbdecfecee0a3b894473c1bbeb6b4913a536ce4f9b13f1efff71ea313c8661dd9a4ce",
    "315c4eeaa8b5f8bffd11155ea506b56041c6a00c8a08854dd21a4bbde54ce56801d943ba708b8a3574f40c00fff9e00fa1439fd0654327a3bfc860b92f89ee04132ecb9298f5fd2d5e4b45e40ecc3b9d59e9417df7c95bba410e9aa2ca24c5474da2f276baa3ac325918b2daada43d6712150441c2e04f6565517f317da9d3",
    "271946f9bbb2aeadec111841a81abc300ecaa01bd8069d5cc91005e9fe4aad6e04d513e96d99de2569bc5e50eeeca709b50a8a987f4264edb6896fb537d0a716132ddc938fb0f836480e06ed0fcd6e9759f40462f9cf57f4564186a2c1778f1543efa270bda5e933421cbe88a4a52222190f471e9bd15f652b653b7071aec59a2705081ffe72651d08f822c9ed6d76e48b63ab15d0208573a7eef027",
    "466d06ece998b7a2fb1d464fed2ced7641ddaa3cc31c9941cf110abbf409ed39598005b3399ccfafb61d0315fca0a314be138a9f32503bedac8067f03adbf3575c3b8edc9ba7f537530541ab0f9f3cd04ff50d66f1d559ba520e89a2cb2a83"

);
var ciphertext = "32510ba9babebbbefd001547a810e67149caee11d945cd7fc81a05e9f85aac650e9052ba6a8cd8257bf14d13e6f0a803b54fde9e77472dbff89d71b57bddef121336cb85ccb8f3315f4b52e301d16e9f52f904";
var m2 = "Hello World";
var m1 = "the program";

var fk = " ";
var c1 = "";
var c2 = ""
var thekey = "supersecret";
var d = "";

for (var i = 0; i < m1.length; i++) {
    lintest.k = thekey.charCodeAt(i % thekey.length);
    var ct1 = (lintest.E(m1.charCodeAt(i)));
    // for two time pad attack:
    var ct2 = (lintest.E(m2.charCodeAt(i)));

    c1 += (ct1 < 0x10 ? "0" : "") + ct1.toString(16);
    c2 += (ct2 < 0x10 ? "0" : "") + ct2.toString(16);
}

// coerce to letters (roughly)
var parseText_printable = function(v) {
    return (isNaN(v)) ? "" :
	v < 0x20 ? "" :
	v > 0x60+26 ? "" :	    
	String.fromCharCode(v);
};

// Programmatic example (XORing the two cipher texts)
var print_graphic_ctxor = function(c1, c2, i_troffset, i_xoroffset, cw, t) {
    var d = "";
    var ct1hex = "";
    var ct2hex = "";
    var ct2str = "";
    var ct1str = "";
    var ct1val = 0;
    var ct2val = 0;
    var xorval = 0;
    var xorstr = "";
    var xorhex = "";
    var pred = "";
    var containsSpace = false;
    var cribword = otphack.atoha(cw);
    
    var xor = 0;

    // XOR two ciphertext and save result
    for (var i = 0; i < c1.length; i+=2) {
	otphack.k = otphack.hatohn(c2, i % c2.length);
	xor = ((otphack.E(otphack.hatohn(c1, i)) % 256));

	// toString(16) omits leading zeros (parentheses!!)
	pred += otphack.hntoha(xor);
    }

    // XOR with guess word ("cribword")
    for (var i = 0; i < cribword.length; i+=2) {
	otphack.k = otphack.hatohn(cribword, ((i)) );
	// slide cribword under XOR char by char
	xor = ((otphack.E(otphack.hatohn(pred, (i + i_xoroffset) % pred.length)) % 256));

	if (containsSpace == false)
	    containsSpace = xor > 0x40 && xor < 0x60+26 ? false : true;
	
	d += xor > 0x40 && xor < 0x60+26 ? otphack.hntoha(xor) : xor == 0x20 ? "20" : "FF";
    }    
    
    //t.push_row("background-color: #FFFFEE");
    //t.push_row();
    //t.push_row("background-color: #FFFFEE");
    //t.push_row();
    if (i_troffset >= t.table.children.length)
	t.push_row("background-color: #AAFFAA");
    //t.push_row("border-bottom: 2px black solid");

    t.push_val("..", "background-color: #FFFF44");
    // print a table comparison of ciphertexts and XOR op
    for (var i = 0; i < cribword.length; i+=2) {
	ct1val = otphack.hatohn(c1,i) + 0x0;
	ct2val = otphack.hatohn(c2,i) + 0x0;
	xorval = otphack.hatohn(d,i) + 0x0;
	
	// add leading zero for toString(16),  omit nonprintable chars and NaNs
	/* t.lastrow = t.table.children[i_troffset + 0];
	t.push_val(parseText_printable(ct1val), "");

	t.lastrow = t.table.children[i_troffset + 1];
	t.push_val(otphack.hntoha(ct1val) , "");	

	t.lastrow = t.table.children[i_troffset + 2];
	t.push_val(parseText_printable(ct2val), "");

	t.lastrow = t.table.children[i_troffset + 3];
	t.push_val(otphack.hntoha(ct2val), "");	 */

	t.lastrow = t.table.children[i_troffset + 0];

	switch(xorval) {
	case ct2val: // xor == ct2 (ct1 = 0)
	    t.push_val( "", "background-color: #AAFFFF"); 
	    break;
	case 0: // ct1 = ct2
	    t.push_val(" ", "background-color: #FFFFAA");
	    break;
	case 0x20:
	    t.push_val(" ", "background-color: #99AA99; border-width: 0px; margin-width: 1px");
	    break;
	case 0xFF:
	    t.push_val(" ", "background-color: #112211; border-width: 0px; margin-width: 1px");
	    break;
	default:
	    t.push_val( parseText_printable(xorval), "border-width: 0px; margin-width: 1px"); 
	    break;
	}


	
	/* t.lastrow = t.table.children[i_troffset + 5];
	t.push_val(otphack.hntoha(xorval), ""); */
    }
    
    return d;
};

f.i_exec.onclick = function() {
    var z = 0;    
    var cumulativeCT = ciphertexts[0];

    t.domclear();
    
    for (var j = 0; j < ciphertexts.length - 1; j++) {
	z = 0;
	
	for (var i = 0; i < 1; i++) {
	    cumulativeCT = print_graphic_ctxor(ciphertexts[j],
					       ciphertexts[j+1],
					       z++*1,
					       i*2,
					       f.i_crib.value,
					       t);
	    //print_graphic_ctxor(c1, c2, z++*1, i*2);
	}
	// t.push_val(j + "", "");
    }

    return 0;
};

f.dominstant();
t.dominstant();




