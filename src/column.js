import { DataType } from "./data-types";

export class Column {
  /** @private @type {DataType} */
  _type;

  /** @private @type {boolean|null} */
  _nullable = null;

  /** @private @type {InlineColumnConstraint|null} */
  _pk = null;

  /** @private @type {InlineColumnConstraint|null} */
  _uq = null;

  /** @private @type {(InlineColumnConstraint & { value: string })|null} */
  _df = null;

  /** @private @type {{ seed: number, increment: number } | null} */
  _identity = null;

  /**
   * @private
   * @param {DataType} type
   */
  constructor(type) {
    this._type = type;
  }

  asNotNull() {
    this._nullable = false;
    return this;
  }

  asNull() {
    this._nullable = true;
    return this;
  }

  /**
   * @param {number} seed
   * @param {number} increment
   */
  asIdentity(seed = 1, increment = 1) {
    if (this._identity !== null) {
      throw new Error(
        "La propiedad IDENTITY ya fue definida para esta columna."
      );
    }

    this._identity = { seed, increment };
    return this;
  }

  /**
   * @param {string} [constraintName]
   * @returns
   */
  asPrimaryKey(constraintName = undefined) {
    if (this._pk !== null) {
      throw new Error(
        "La restricción PRIMARY KEY ya fue definida para esta columna."
      );
    }

    this._pk = {
      type: "PRIMARY_KEY",
      name: constraintName,
    };

    return this;
  }

  /**
   * @param {string} [constraintName]
   */
  asUnique(constraintName = undefined) {
    if (this._uq !== null) {
      throw new Error(
        "La restricción UNIQUE ya fue definida para esta columna."
      );
    }

    this._uq = {
      type: "UNIQUE",
      name: constraintName,
    };

    return this;
  }

  /**
   * @param {string} [constraintName]
   * @param {string} value
   */
  withDefault(value, constraintName) {
    if (this._df !== null) {
      throw new Error(
        "La restricción DEFAULT ya fue definida para esta columna."
      );
    }

    this._df = {
      type: "DEFAULT",
      name: constraintName,
      value: value,
    };

    return this;
  }

  build() {
    let props = "";

    if (this._nullable === true) {
      props += " NULL";
    } else if (this._nullable === false) {
      props += " NOT NULL";
    }

    if (this._df !== null) {
      if (this._df.name) {
        props += ` CONSTRAINT [${this._df.name}]`;
      }
      props += ` DEFAULT ${this._df.value}`;
    }

    if (this._identity !== null) {
      props += ` IDENTITY(${this._identity.seed}, ${this._identity.increment})`;
    }

    if (this._uq !== null) {
      if (this._uq.name) {
        props += ` CONSTRAINT [${this._uq.name}]`;
      }
      props += " UNIQUE";
    }

    if (this._pk !== null) {
      if (this._pk.name) {
        props += ` CONSTRAINT [${this._pk.name}]`;
      }
      props += " PRIMARY KEY";
    }

    return `${this._type.build()}${props}`;
  }

  isPrimaryKey() {
    return this._pk !== null;
  }

  getAllConstraintNames() {
    return [this._pk, this._uq, this._df]
      .filter((c) => c !== null)
      .map((c) => c.name)
      .filter(n => n !== undefined);
  }

  /**
   * @param {DataType} type
   */
  static fromType(type) {
    return new Column(type);
  }
}
