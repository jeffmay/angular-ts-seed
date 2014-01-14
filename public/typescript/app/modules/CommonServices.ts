/// <reference path="../reference.ts" />

module modules {

  export module services {

    export var common: ng.IModule = angular.module("common.services", []).

      service("$uuid", () => new NodeUUIDGenerator())

  }
}