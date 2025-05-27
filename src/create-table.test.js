import { describe, it, expect } from "@jest/globals";
import { createTable } from "./create-table";
import { DataType } from "./data-types";

describe("Create Table", () => {
  it("Should create a simple table.", () => {
    const statement = createTable("Persona")
      .addColumn("Id", DataType.INTEGER())
      .addColumn("Nombre", DataType.VARCHAR(20))
      .addColumn("ApellidoPaterno", DataType.VARCHAR(50))
      .addColumn("ApellidoMaterno", DataType.VARCHAR(50))
      .build();

    expect(statement).toBe(
      "CREATE TABLE [Persona] ( " +
        "[Id] [INTEGER], " +
        "[Nombre] [VARCHAR](20), " +
        "[ApellidoPaterno] [VARCHAR](50), " +
        "[ApellidoMaterno] [VARCHAR](50) " +
        ");"
    );
  });
});
