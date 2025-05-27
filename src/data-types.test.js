import { describe, it, expect } from "@jest/globals";
import { DataType } from "./data-types";

describe("Módulo data-types", () => {
  it("Debe crear el tipo de dato INTEGER.", () => {
    const statement = DataType.INTEGER().build();
    expect(statement).toBe("[INTEGER]");
  });

  it("Debe crear el tipo de dato VARCHAR(10).", () => {
    const statement = DataType.VARCHAR(10).build();
    expect(statement).toBe("[VARCHAR](10)");
  });

  it("Debe crear el tipo de dato VARCHAR(10) NOT NULL.", () => {
    const statement = DataType.VARCHAR(10).notNull().build();
    expect(statement).toBe("[VARCHAR](10) NOT NULL");
  });

  it("Debe lanzar un error al crear el tipo de dato VARCHAR(-10).", () => {
    expect(() => DataType.VARCHAR(-10)).toThrow();
  });
});
