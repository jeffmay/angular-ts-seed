/// <reference path="../reference.ts" />

function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw message;
  }
}
