import { describe, it, expect } from "@jest/globals";
import { Column } from "./column";
import { DataType } from "./data-types";

function crearColumnaInt() {
  return Column.fromType(DataType.INT());
}

describe("Column", () => {
  it("Debe crear una columna de tipo INT", () => {
    expect(crearColumnaInt().build()).toBe("[INT]");
  });

  describe("PRIMARY KEY", () => {
    it("Debe crear una columna de tipo INT y definirla como PRIMARY KEY", () => {
      expect(crearColumnaInt().asPrimaryKey().build()).toBe(
        "[INT] PRIMARY KEY"
      );
    });

    it("Debe crear una columna de tipo INT y definirla como PRIMARY KEY con nombre", () => {
      expect(crearColumnaInt().asPrimaryKey("mi_pk").build()).toBe(
        "[INT] CONSTRAINT [mi_pk] PRIMARY KEY"
      );
    });
  });

  describe("NULL y NOT NULL", () => {
    it("Debe crear una columna de tipo INT y definirla como NULL", () => {
      expect(crearColumnaInt().asNull().build()).toBe("[INT] NULL");
    });

    it("Debe crear una columna de tipo INT y definirla como NOT NULL", () => {
      expect(crearColumnaInt().asNotNull().build()).toBe("[INT] NOT NULL");
    });
  });

  describe("DEFAULT", () => {
    it("Debe crear una columna de tipo INT y definirla con DEFAULT", () => {
      expect(crearColumnaInt().withDefault("1").build()).toBe("[INT] DEFAULT 1");
    });

    it("Debe crear una columna de tipo INT y definirla con DEFAULT con nombre", () => {
      expect(crearColumnaInt().withDefault("1", "mi_default").build()).toBe(
        "[INT] CONSTRAINT [mi_default] DEFAULT 1"
      );
    });
  });

  describe("UNIQUE", () => {
    it("Debe crear una columna de tipo INT y definirla como UNIQUE", () => {
      expect(crearColumnaInt().asUnique().build()).toBe("[INT] UNIQUE");
    });

    it("Debe crear una columna de tipo INT y definirla como UNIQUE con nombre", () => {
      expect(crearColumnaInt().asUnique("mi_uq").build()).toBe(
        "[INT] CONSTRAINT [mi_uq] UNIQUE"
      );
    });
  });
});
