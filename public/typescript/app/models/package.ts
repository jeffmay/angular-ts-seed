/// <reference path="../reference.ts" />

interface Model {}

class EntityModel implements Model {
  id: string;
  created: Date;

  constructor(id: string, created?: Date) {
    this.id = id;
    this.created = created || new Date();
  }
}

class ViewModel implements Model {}
