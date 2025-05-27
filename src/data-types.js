export class DataType {
  /** @private @type {string} */
  _name = "";

  /** @private @type {number|null}*/
  _length = null;

  /** @private @type {boolean} */
  _nullable = true;

  /** @private */
  constructor() {}

  notNull() {
    this._nullable = false;
  }

  /**
   * @return {string}
   */
  build() {
    let result = `[${this._name}]`;

    if (this._length) {
      result += `(${this._length})`;
    }

    if (this._nullable === false) {
      result += " NOT NULL";
    }

    return result;
  }

  static INTEGER() {
    const t = new DataType();
    t._name = "INTEGER";
    return t;
  }

  /**
   * @param {number} length
   */
  static VARCHAR(length) {
    const t = new DataType();
    t._name = "VARCHAR";
    t._length = length;

    return t;
  }
}
