/// <reference path="../reference.ts" />

module modules {

  export module services {

    common
      .service("uuid", () => new NodeUUIDGenerator())

  }
}