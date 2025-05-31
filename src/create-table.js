import { Column } from "./column";

/**
 * @template {Record<string, Column>} T
 * @param {string} tableName
 * @param {T} columnDefinition
 */
export function createTable(tableName, columnDefinition) {
  const columns = columnDefinition;

  /** @type {UniqueConstraint<T>[]} */
  const uniqueConstraints = [];

  /** @type {PrimaryKeyConstraint<T>|null} */
  let primaryKeyConstraint = null;

  const allConstraintNames = Object.entries(columns)
    .map(([_name, props]) => props.getAllConstraintNames())
    .reduce((acc, curr) => {
      return [...acc, ...curr];
    });

  function validateNonRepeatingConstraintNames() {
    if (new Set(allConstraintNames).size !== allConstraintNames.length) {
      throw new Error(
        "Se encontró una restricción duplicada en la definición de la tabla."
      );
    }
  }

  validateNonRepeatingConstraintNames();

  if (
    Object.entries(columns).filter(([_name, props]) => props.isPrimaryKey())
      .length > 1
  ) {
    throw new Error(
      "Se encontró más de una restricción PRIMARY KEY en la definición de la tabla."
    );
  }

  return {
    /**
     * @param {string} constraintName
     * @param {(keyof T)[]} columnSelection
     */
    addUniqueConstraint(constraintName, columnSelection) {
      if (new Set(columnSelection).size !== columnSelection.length) {
        throw new Error(
          "Se encontró una columna repetida en la definición de la restricción UNIQUE."
        );
      }

      allConstraintNames.push(constraintName);
      validateNonRepeatingConstraintNames();

      uniqueConstraints.push({
        name: constraintName,
        columns: columnSelection,
      });
      return this;
    },

    /**
     * @param {string} constraintName
     * @param {(keyof T)[]} columnSelection
     * @returns
     */
    addPrimaryKeyConstraint(constraintName, columnSelection) {
      if (new Set(columnSelection).size !== columnSelection.length) {
        throw new Error(
          "Se encontró una columna repetida en la definición de la restricción PRIMARY KEY."
        );
      }

      if (primaryKeyConstraint !== null) {
        throw new Error("Solo puede haber una clave primaria en una tabla.");
      }

      const pkFoundInColumns = Object.entries(columns).find(
        ([colName, col]) => col.isPrimaryKey()
      );

      if (pkFoundInColumns !== undefined) {
        throw new Error(
          `La columna ${pkFoundInColumns[0]} ya tiene una restricción PRIMARY KEY.`
        );
      }

      allConstraintNames.push(constraintName);
      validateNonRepeatingConstraintNames();

      primaryKeyConstraint = {
        name: constraintName,
        columns: columnSelection,
      };

      return this;
    },

    /**
     * @return {string}
     */
    build() {
      const tableContent = [];

      const columnsAsString = Object.entries(columns)
        .map(([name, column]) => {
          return `[${name}] ${column.build()}`;
        })
        .join(", ");

      tableContent.push(columnsAsString);

      if (primaryKeyConstraint) {
        const primaryKeyConstraintAsString = primaryKeyConstraint
          ? `CONSTRAINT [${
              primaryKeyConstraint.name
            }] PRIMARY KEY (${primaryKeyConstraint.columns
              .map((columnName) => `[${String(columnName)}]`)
              .join(", ")})`
          : "";

        tableContent.push(primaryKeyConstraintAsString);
      }

      if (uniqueConstraints.length > 0) {
        const uniqueConstraintsAsString = uniqueConstraints.map(
          ({ name, columns }) => {
            return `CONSTRAINT [${name}] UNIQUE (${columns
              .map((columnName) => `[${String(columnName)}]`)
              .join(", ")})`;
          }
        );
        tableContent.push(uniqueConstraintsAsString);
      }

      return `CREATE TABLE [${tableName}] (` + tableContent.join(", ") + ");";
    },
  };
}
