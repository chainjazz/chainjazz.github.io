var SifroHaker = JSClass.Extends(Object, function() {
    this.lang = "en";
    this.idseq = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
});

var SifroHakerZamenski = JSClass.Extends(SifroHaker, function() {
    this.fletters = "ETAOINSHRDLUCMFWYPVBGKJQXZ";    
});

SifroHakerZamenski.prototype.countFLetters = function(i) {
    
};


var SifroHakerVernamov = JSClass.Extends(VernamovSifrat, function () {
    SifroHakerVernamov.baseConstructor.call(this);
});
    
