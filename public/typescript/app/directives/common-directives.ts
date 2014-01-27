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
    interval?: number
    stop: () => void
  }

  export var myCurrentTime = ($interval: ng.IIntervalService, dateFilter: (date: Date, format: string) => string) => {
    return {
      restrict: 'AE',
      link: (scope: MyCurrentTimeScope, element: ng.IRootElementService, attrs: ng.IAttributes) => {
        var promiseToUpdate: ng.IPromise<void> = null

        function updateCurrentTime(): void {
          scope.currentTime = new Date()
        }

        function updateInterval(interval: any): void {
          scope.interval = parseFloat(interval)
          // cancel the previous timeoutId
          scope.stop()
          // save the timeoutId for canceling
          promiseToUpdate = $interval(() => {
            updateCurrentTime() // update DOM
          }, scope.interval)
        }

        scope.stop = () => {
          if (promiseToUpdate != null) {
            $interval.cancel(promiseToUpdate)
            promiseToUpdate = null
          }
        }

        scope.$watch('currentTime', () => {
          element.text(dateFilter(scope.currentTime, scope.format))
        })

        attrs.$observe("format", (value?) => {
          scope.format = value
          updateCurrentTime()
        })

        attrs.$observe("interval", (value?) => {
          updateInterval(value)
        })

        element.on('$destroy', function() {
          scope.stop()
        })

        updateInterval(attrs['interval'] || 1000)
      }
    }
  }
}
