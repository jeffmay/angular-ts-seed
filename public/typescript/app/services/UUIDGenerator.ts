// <reference path="../reference.ts"/>

interface UUIDGenerator {

  nextId(): string
}

class NodeUUIDGenerator implements UUIDGenerator {

  nextId(): string {
    return uuid.v4();
  }
}
