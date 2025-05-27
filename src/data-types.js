export class DataType {
  /** @private @type {string} */
  _name = "";

  /** @private @type {number|null}*/
  _length = null;

  /** @private @type {boolean} */
  _nullable = true;

  /**
   * @private
   * @param {string} name
   * @param {number|null} length
   *
   */
  constructor(name, length = null) {
    if (length && length <= 0)
      throw new Error("La longitud debe ser mayor a 0.");
    this._name = name;
    this._length = length;
  }

  notNull() {
    this._nullable = false;
    return this;
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
    return new DataType("INTEGER");
  }

  /**
   * @param {number} length
   */
  static VARCHAR(length) {
    return new DataType("VARCHAR", length);
  }
}
