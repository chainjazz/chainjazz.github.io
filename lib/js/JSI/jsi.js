// JAVASCRIPT PRIMER
//
// := means "CAN BE OF TYPE"
// {...} means "IS A COLLECTION OF / IS A SET OF"
// ----------------------------------------------
// Object {Property, Property, ..., Internal}
// Property {Name, Attribute, Attribute, ...}
// Attribute := Value | Get | Set | Writable | Enumerable | Configurable
// (W)ritable, (E)numerable, (C)onfigurable := Value<Boolean>
// Get, Set := Value<Object | Undefined>
// Value := Undefined | Null | Boolean | String | Object | Reference | List | Completion | PDescriptor | PIdentifier | ELexical | ERecord
// Name := Identifier
// Property := NamedProperty | NamedAccessorProperty | Internal
// Internal {Prototype | Class | Extensible |
//       Get() | GetOwnProperty() | GetProperty() | Put() | CanPut() |
//       HasProperty() | Delete() | DefaultValue() | DefineOwnProperty()}
//
//       NOTE: THESE ARE INTRINSIC BEHAVIORS AND PARAMS, NOT EXPLICIT ATTRIBUTES
//
// NamedAccessorProperty {Name, Get, Set, (W, E, C)}
// NamedProperty {Name, (W, E, C)}
// Object := Builtin | Host | Explicit

// Constructs not defined here deal with:
//    * intrinsic behavior definitions (see spec)
//    * implementation of basic language constructs (fn-operators, operators, control statements, etc.)
//    * lexical mechanisms
//    * built-in objects (since almost everything is an object)
//
//    See spec for more details (this primer was derived from 26.2)
//
// Important final note: JavaScript is a "partial" implementation of an interpreted
// language, which is completed by a "host" implementation, which derives other
// usable constructs from the implementation-only Global builtin object


// js class wrapper for "importing" other js "modules"

JSI = {};

JSI.Bootstrap = function() {
    var me = this;

    document.open();
    document.write("<SCRIPT type=\"text/javascript\" src=\""  + "main.js" + "\"><\/SCRIPT>");
    document.close();
};

// note: this class syntax is not extendable!
JSI.ImportModules = function(modulearray) {
    document.open();
	
    for (var x = 0; x < modulearray.length; x++) {
	document.write("<SCRIPT type=\"text/javascript\" src=\"" + modulearray[x] + "\"><\/SCRIPT>");
    }

    document.write("<SCRIPT type=\"text/javascript\">jsiMain();<\/SCRIPT>");
    document.close();
};

JSI.Bootstrap();



