/// <reference path="../reference.ts" />

class User extends EntityModel {
  constructor(id: string, public name: string, public email: Email) {
    super(id)
  }
}
