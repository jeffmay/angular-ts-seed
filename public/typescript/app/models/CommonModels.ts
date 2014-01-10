/// <reference path="../reference.ts" />

class Email extends ViewModel {

  static validate(address: string): boolean {
    return address != ""
  }

  constructor(public address: string) {
    super();
    assert(Email.validate(address), "Invalid format for email address.");
  }
}
