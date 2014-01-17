/// <reference path="../reference.ts" />

/* Note:
 *
 * If there is no directives module, TypeScript will complain in the Main module.
 *
 * If you want to remove this module, just replace it with:
 * var directives = {}
 */
module directives {

  export var appVersion = (version: string) =>
    ($scope, elem: ng.IRootElementService) => elem.text(version)

  export var currentTime = () =>
    ($scope: ng.IScope, elem: ng.IRootElementService, attrs: ng.IAttributes) => {
      var format: string = attrs["format"]
      var update = () => {
        elem.text(new Date().toString())
      }
      var currentTimeId = setInterval(update, attrs["interval"] || 1000)
      $scope.$on('$destroy', () => {
        console.log("killing timer")
        clearInterval(currentTimeId)
      })
      update()
    }
}
