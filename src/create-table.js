import { DataType } from "./data-types";

/**
 * @param {string} name
 */
export function createTable(name) {
  /** @type {{ name: string, type: DataType }[]} */
  const columns = [];

  return {
    /**
     * @param {string} name
     * @param {DataType} type
     */
    addColumn(name, type) {
      columns.push({
        name,
        type,
      });
      return this;
    },

    /**
     * @return {string}
     */
    build() {
      return `CREATE TABLE [${name}] ( ${columns
        .map((c) => `[${c.name}] ${c.type.build()}`)
        .join(", ")} );`;
    },
  };
}
