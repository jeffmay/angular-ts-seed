/// <reference path="../reference.ts" />

/**
 * A list of all the modules without any configuration.
 *
 * The focus of this section is to specify the dependency graph between modules.
 *
 * If you always use hard-coded names, then you cannot specify circular dependencies.
 * Angular does not support circular dependencies for a good reason. See:
 * http://misko.hevery.com/2008/08/01/circular-dependency-in-constructors-and-dependency-injection/
 *
 * Example of a circular dependency (arrow means initialized before):
 *
 *         /-> module b -\
 *        |              |-> module d
 *     module c <-------/
 *
 * it's impossible to specify module b or c's dependencies because b depends on c and c depends on b
 * and whichever module you would instantiate first would cause a circular dependency.
 *
 * After the modules dependencies are defined they can be referred to in separate files
 * to lay out all the wiring.
 */
module modules {

  export module services {

    export var common: ng.IModule = angular.module("services.common", [])
  }

  export var main: ng.IModule = angular.module('main', [
    services.common.name,
    'ngRoute',
  ])
}