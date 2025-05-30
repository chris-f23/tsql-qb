export class DataType {
  /** @private @type {DataTypeName} */
  _name;

  /** @private @type {number|null}*/
  _length = null;

  /** @private @type {number|null} */
  _precision = null;

  /** @private @type {number|null} */
  _scale = null;

  /**
   * @private
   * @param {DataTypeName} name
   * @param {number|null} length
   * @param {number|null} precision
   * @param {number|null} scale
   */
  constructor(name, length = null, precision = null, scale = null) {
    if (length !== null && length <= 0)
      throw new Error("La longitud debe ser mayor a 0.");

    if (
      (precision === null && scale !== null) ||
      (precision !== null && scale === null)
    ) {
      throw new Error(
        "La escala y la precision deben ser proporcionadas juntas."
      );
    }

    if (precision !== null && scale !== null) {
      if (precision < 1)
        throw new Error("La precision debe ser mayor o igual a 1.");

      if (precision > 38)
        throw new Error("La precision debe ser menor o igual a 38.");

      if (scale < 0) throw new Error("La escala debe ser mayor o igual a 0.");

      if (scale > precision)
        throw new Error("La escala debe ser menor o igual a la precision.");
    }

    this._precision = precision;
    this._scale = scale;

    this._name = name;
    this._length = length;
  }

  /**
   * @return {string}
   */
  build() {
    let result = `[${this._name}]`;

    if (this._length !== null) {
      result += `(${this._length})`;
    }

    if (this._precision !== null && this._scale !== null) {
      result += `(${this._precision}, ${this._scale})`;
    }

    return result;
  }

  /**
   * Crea un tipo de dato VARCHAR del largo indicado.
   * @param {number} length
   */
  static VARCHAR(length) {
    return new DataType("VARCHAR", length);
  }

  /**
   * Crea un tipo de dato TINYINT.
   */
  static TINYINT() {
    return new DataType("TINYINT");
  }

  /**
   * Crea un tipo de dato SMALLINT.
   */
  static SMALLINT() {
    return new DataType("SMALLINT");
  }

  /**
   * Crea un tipo de dato INT (INTEGER).
   */
  static INT() {
    return new DataType("INT");
  }

  /**
   * Crea un tipo de dato BIGINT.
   */
  static BIGINT() {
    return new DataType("BIGINT");
  }

  /**
   * Crea un tipo de dato BIT.
   */
  static BIT() {
    return new DataType("BIT");
  }

  /**
   * Crea un tipo de dato NUMERIC (identico a DECIMAL).
   * @param {number} precision
   * @param {number} scale
   */
  static NUMERIC(precision = 18, scale = 0) {
    return new DataType("NUMERIC", null, precision, scale);
  }

  /**
   * Crea un tipo de dato DECIMAL (identico a NUMERIC).
   * @param {number} precision
   * @param {number} scale
   */
  static DECIMAL(precision = 18, scale = 0) {
    return new DataType("DECIMAL", null, precision, scale);
  }
}
