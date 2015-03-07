"use strict";
jsonOdm.util = {
    isArray : function(arrayObject){
        if(!Array.isArray) {
            return Object.prototype.toString.call(arrayObject) === "[object Array]";
        }
        return Array.isArray(arrayObject);
    },
    objectKeys : Object.keys,
    branch : function(object,path){
        function goDown() {
            if(arguments && arguments.length && this){
                var subCollection = this[arguments[0]];
                if(!subCollection) return false;
                return goDown.apply(subCollection,Array.prototype.slice.call( arguments, 1 ));
            }
            return this
        }
        return goDown.apply(object,path);
    }
};

if (!Object.keys) {
    jsonOdm.util.objectKeys = (function() {
        'use strict';
        var hasOwnProperty = Object.prototype.hasOwnProperty,
            hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
            dontEnums = [
                'toString',
                'toLocaleString',
                'valueOf',
                'hasOwnProperty',
                'isPrototypeOf',
                'propertyIsEnumerable',
                'constructor'
            ],
            dontEnumsLength = dontEnums.length;

        return function(obj) {
            if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
                throw new TypeError('Object.keys called on non-object');
            }

            var result = [], prop, i;

            for (prop in obj) {
                if (hasOwnProperty.call(obj, prop)) {
                    result.push(prop);
                }
            }

            if (hasDontEnumBug) {
                for (i = 0; i < dontEnumsLength; i++) {
                    if (hasOwnProperty.call(obj, dontEnums[i])) {
                        result.push(dontEnums[i]);
                    }
                }
            }
            return result;
        };
    }());
}