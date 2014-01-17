/// <reference path="../reference.ts" />

/* Note:
 *
 * If there is no directives module, TypeScript will complain in the Main module.
 *
 * If you want to remove this module, just replace it with:
 * var directives = {}
 */
module directives {

  export var myAppVersion = (version: string) => {
    return {
      restrict: 'E',
      link: ($scope, element: ng.IRootElementService) => {
        element.text(version)
      },
    }
  }

  export interface MyCurrentTimeScope extends ng.IScope {
    format?: string
    currentTime?: Date
    promiseUpdate?: ng.IPromise<any>
    interval?: number
  }

  export var myCurrentTime = ($interval: ng.IIntervalService, dateFilter: (date: Date, format: string) => string) => {
    return {
      restrict: 'AE',
      link: (scope: MyCurrentTimeScope, element: ng.IRootElementService, attrs: ng.IAttributes) => {

        function updateFormat(format: string): any {
          scope.format = format
          updateTime()
        }

        function updateTime(): any {
          scope.currentTime = new Date()
        }

        scope.$watch('currentTime', () => {
          element.text(dateFilter(scope.currentTime, scope.format))
        })

        attrs.$observe("format", (value?) => updateFormat(value))

        element.on('$destroy', () => {
          $interval.cancel(scope.promiseUpdate)
        })

        // start the UI update process; save the timeoutId for canceling
        scope.promiseUpdate = $interval(() => {
          updateTime() // update DOM
        }, scope.interval)

//        updateFormat(attrs['format'])
      }
    }
  }
}
