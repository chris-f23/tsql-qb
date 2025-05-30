import { describe, it, expect } from "@jest/globals";
import { DataType } from "./data-types";

describe("Módulo data-types", () => {
  describe("Tipos de datos numericos exactos", () => {
    it("Debe crear el tipo de dato TINYINT", () => {
      const statement = DataType.TINYINT().build();
      expect(statement).toBe("[TINYINT]");
    });

    it("Debe crear el tipo de dato SMALLINT", () => {
      const statement = DataType.SMALLINT().build();
      expect(statement).toBe("[SMALLINT]");
    });

    it("Debe crear el tipo de dato INT", () => {
      const statement = DataType.INT().build();
      expect(statement).toBe("[INT]");
    });

    it("Debe crear el tipo de dato BIGINT", () => {
      const statement = DataType.BIGINT().build();
      expect(statement).toBe("[BIGINT]");
    });

    it("Debe crear el tipo de dato BIT", () => {
      const statement = DataType.BIT().build();
      expect(statement).toBe("[BIT]");
    });

    it("Debe crear el tipo de dato NUMERIC con sus valores por defecto", () => {
      const statement = DataType.NUMERIC().build();
      expect(statement).toBe("[NUMERIC](18, 0)");
    });

    it("Debe lanzar un error al crear el tipo de dato NUMERIC con escala mayor a la precision", () => {
      expect(() => DataType.NUMERIC(1, 2)).toThrow();
    });

    it("Debe lanzar un error al crear el tipo de dato NUMERIC con precisión menor a la mínima", () => {
      expect(() => DataType.NUMERIC(0, 0)).toThrow();
    });

    it("Debe lanzar un error al crear el tipo de dato NUMERIC con precisión mayor a la máxima", () => {
      expect(() => DataType.NUMERIC(39, 0)).toThrow();
    });

    it("Debe lanzar un error al crear el tipo de dato NUMERIC con escala menor a la mínima", () => {
      expect(() => DataType.NUMERIC(1, -1)).toThrow();
    });

    it("Debe crear el tipo de dato DECIMAL con sus valores por defecto", () => {
      const statement = DataType.DECIMAL().build();
      expect(statement).toBe("[DECIMAL](18, 0)");
    });

    it("Debe lanzar un error al crear el tipo de dato DECIMAL con escala mayor a la precision", () => {
      expect(() => DataType.DECIMAL(1, 2)).toThrow();
    });

    it("Debe lanzar un error al crear el tipo de dato DECIMAL con precisión menor a la mínima", () => {
      expect(() => DataType.DECIMAL(0, 0)).toThrow();
    });

    it("Debe lanzar un error al crear el tipo de dato DECIMAL con precisión mayor a la máxima", () => {
      expect(() => DataType.DECIMAL(39, 0)).toThrow();
    });

    it("Debe lanzar un error al crear el tipo de dato DECIMAL con escala menor a la mínima", () => {
      expect(() => DataType.DECIMAL(1, -1)).toThrow();
    });
  });

  describe("Tipos de datos de texto", () => {
    it("Debe crear el tipo de dato VARCHAR(10)", () => {
      const statement = DataType.VARCHAR(10).build();
      expect(statement).toBe("[VARCHAR](10)");
    });

    it("Debe lanzar un error al crear el tipo de dato VARCHAR(-10)", () => {
      expect(() => DataType.VARCHAR(-10)).toThrow();
    });

    it("Debe lanzar un error al crear el tipo de dato VARCHAR(0)", () => {
      expect(() => DataType.VARCHAR(0)).toThrow();
    });
  });
});
