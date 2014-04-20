// <reference path="../reference.ts"/>

interface EntityIdGenerator {

  nextId(): string
}

class NodeUUIDGenerator implements EntityIdGenerator {

  nextId(): string {
    return uuid.v4()
  }
}
