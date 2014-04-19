/// <reference path="../reference.ts" />

module modules {

  export module services {

    export var common: ng.IModule = angular.module("services.common", [])
      .service("uuid", () => new NodeUUIDGenerator())

  }
}