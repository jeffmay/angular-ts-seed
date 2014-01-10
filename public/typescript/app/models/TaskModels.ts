/// <reference path="../reference.ts" />

class Task extends EntityModel {
  constructor(
    public id: string,
    public description: string,
    public completed: boolean = false
  ) {
    super(id);
  }
}
