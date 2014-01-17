/// <reference path="../reference.ts" />

class Email extends Model {

  static validate(address: string): boolean {
    return address != ""
  }

  constructor(address: string) {
    super()
    assert(Email.validate(address), "Invalid format for email address.")
  }
}
