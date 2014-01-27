/// <reference path="../reference.ts" />

interface DateFilter {
  (date: Date, format: string): string
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
  var $interval: any // mocked ng.IIntervalService
  var $rootScope: ng.IRootScopeService
  var $scope: directives.MyCurrentTimeScope
  var element: ng.IAugmentedJQuery
  var now = new Date()

  beforeEach(angular.mock.module(modules.main.name))
  beforeEach(inject((_$rootScope_, _$compile_, _$interval_) => {
    $compile = _$compile_
    $rootScope = _$rootScope_
    $interval = _$interval_
  }))

  function compileDirective(template: string = '<my-current-time/>') {
    $scope = <any> $rootScope.$new()
    element = angular.element(template)
    $compile(element)($scope)
    $scope.$digest()
  }

  it("should show the current time (+/- 1 second)", () => {
    compileDirective()
    expect(($scope.currentTime).getTime() / 1000).toBeCloseTo(now.getTime() / 1000, 0)
  })

  it("should set the correct interval", () => {
    compileDirective('<my-current-time interval="10000"/>')
    expect(($scope.currentTime).getTime() / 1000).toBeCloseTo(now.getTime() / 1000, 0)
    var previousTime = $scope.currentTime
    $interval.flush(9000)
    // should not have changed
    expect($scope.currentTime).toBe(previousTime)
    $interval.flush(2000)
    // should have changed
    expect($scope.currentTime).toNotBe(previousTime)
    expect(($scope.currentTime).getTime() / 1000).toBeCloseTo(now.getTime() / 1000, 0)
  })

  it("should stop the timer after being destroyed", () => {
    compileDirective()
    spyOn($scope, 'stop').andCallThrough()
    $scope.$apply()
    expect($scope.stop).not.toHaveBeenCalled()
    element.remove()
    expect($scope.stop).toHaveBeenCalled()
  })

  it("should draw the timer in the specified format", inject((dateFilter: DateFilter) => {
    compileDirective('<my-current-time format="M/d/yy"/>')
    expect(element.text()).toBe(dateFilter(now, "M/d/yy"))
  }))

  it("should redraw if the format is updated", inject((dateFilter: DateFilter) => {
    var scope: any = $scope
    compileDirective('<my-current-time format="{{ foo }}"/>')
    scope.foo = 'M/d/yy'
    scope.$digest()
    expect(element.text()).toBe(dateFilter(now, "M/d/yy"))
    scope.foo = 'yy/M/d'
    scope.$digest()
    expect(element.text()).toBe(dateFilter(now, "yy/M/d"))
  }))
})