/// <reference path="../reference.ts" />

/**
 * Since there is no directives module, we fake it for TypeScript.
 * You will need to remove this once you have directives in other files.
 */
var directives = {};

// add all directives to Angular.
angular.module("directives", []).directive(directives);
