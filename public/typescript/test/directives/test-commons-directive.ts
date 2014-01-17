/// <reference path="../reference.ts" />

declare module ng {

  interface DateFilter {
    (date: Date, format: string): string
  }
}

describe("myAppVersion directive", () => {
  var element: ng.IAugmentedJQuery
  var scope: any

  beforeEach(angular.mock.module(modules.main.name))
  beforeEach(inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService) => {
    element = angular.element('<my-app-version/>')
    scope = $rootScope.$new()
    $compile(element)(scope)
    scope.$digest()
  }))

  it("should replace the HTML node with the correct version", inject((version: string) => {
    expect(element.text()).toBe(version)
  }))
})


describe("myCurrentTime directive", () => {
  var $compile: ng.ICompileService
  var $scope: any
  var element: ng.IAugmentedJQuery
  var now = new Date()

  beforeEach(angular.mock.module(modules.main.name))
  beforeEach(inject(($rootScope: ng.IRootScopeService, _$compile_: ng.ICompileService) => {
    $compile = _$compile_
    $scope = $rootScope.$new()
  }))

  function compileDirective(template: string = '<my-current-time/>', scope: any = $scope) {
    element = angular.element(template)
    $compile(element)(scope)
    scope.$digest()
  }

  it("should show the current time (+/- 1 second)", () => {
    compileDirective()
    expect(($scope.currentTime).getTime() / 1000).toBeCloseTo(now.getTime() / 1000, 1)
  })

  it("should set the correct interval", inject(($interval: ng.IIntervalService) => {
    compileDirective('<my-current-time interval="10000"/>')
    expect(($scope.currentTime).getTime() / 1000).toBeCloseTo(now.getTime() / 1000, 1)
    $interval.flush(9000)
    // should not have changed
    expect(($scope.currentTime).getTime() / 1000).toBeCloseTo(now.getTime() / 1000, 1)
    $interval.flush(2000)
    // should have changed
    // TODO: Use angular async for testing this
  }))

  it("should stop the timer after being destroyed", () => {
    compileDirective()
    expect($scope.promiseUpdate).toBeDefined()
    element.remove()
    // TODO: Use angular async for testing
  })

  it("should draw the timer in the specified format", inject((dateFilter: ng.DateFilter) => {
    compileDirective('<my-current-time format="M/d/yy"/>')
    expect(element.text()).toBe(dateFilter(now, "M/d/yy"))
  }))

  it("should redraw if the format is updated", inject((dateFilter: ng.DateFilter) => {
    $scope.foo = 'M/d/yy'
    compileDirective('<my-current-time format="{{ foo }}"/>')
    expect(element.text()).toBe(dateFilter(now, "M/d/yy"))
    $scope.foo = 'yy/M/d'
    $scope.$digest()
    expect(element.text()).toBe(dateFilter(now, "yy/M/d"))
  }))
})