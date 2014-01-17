/// <reference path="../reference.ts" />

class Model {}

/**
 * An entity is a model object that represents a model that needs to be tracked.
 *
 * The id and created date can never change.
 */
class EntityModel extends Model {
  constructor(private _id: string, private _created: Date = new Date()) {
    super()
  }

  get id() {
    return this._id
  }

  get created() {
    return this._created
  }
}
