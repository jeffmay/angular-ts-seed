/// <reference path="../reference.ts" />

/* Note:
 *
 * If there is no directives module, TypeScript will complain in the Main module.
 *
 * If you want to remove this module, just replace it with:
 * var directives = {}
 */
module directives {

  export var version = (version: string) =>
    ($scope, elem: ng.IRootElementService, __) => elem.text(version)
}