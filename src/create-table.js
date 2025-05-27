import { DataType } from "./data-types";

/**
 * @template {Record<string, DataType>} T
 * @param {string} tableName
 * @param {T} columnDefinition
 */
export function createTable(tableName, columnDefinition) {
  const columns = columnDefinition;

  /** @type {UniqueConstraint<T>[]} */
  const uniqueConstraints = [];

  /** @type {PrimaryKeyConstraint<T>|null} */
  let primaryKeyConstraint = null;

  return {
    /**
     * @param {string} constraintName
     * @param {(keyof T)[]} columnSelection
     */
    addUniqueConstraint(constraintName, columnSelection) {
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
      if (primaryKeyConstraint !== null) {
        throw new Error("Solo puede haber una clave primaria en una tabla.");
      }
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
        .map(([name, type]) => `[${name}] ${type.build()}`)
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
