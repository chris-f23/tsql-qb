import { describe, it, expect } from "@jest/globals";
import { DataType } from "./data-types";

describe("Módulo data-types", () => {
  describe("Tipos de datos numericos aproximados", () => {
    it("Debe crear el tipo de dato REAL", () => {
      expect(DataType.REAL().build()).toBe("[REAL]");
    });

    it("Debe crear el tipo de dato FLOAT con sus valores por defecto", () => {
      expect(DataType.FLOAT().build()).toBe("[FLOAT](53)");
    });

    it("Debe crear el tipo de dato FLOAT con la longitud especificada", () => {
      expect(DataType.FLOAT(24).build()).toBe("[FLOAT](24)");
    });

    it("Debe lanzar un error al crear el tipo de dato FLOAT con una longitud mayor a 53", () => {
      expect(() => DataType.FLOAT(54)).toThrow();
    });

    it("Debe lanzar un error al crear el tipo de dato FLOAT con una longitud menor a 1", () => {
      expect(() => DataType.FLOAT(0)).toThrow();
    });
  });
  describe("Tipos de datos numericos exactos", () => {
    it("Debe crear el tipo de dato TINYINT", () => {
      expect(DataType.TINYINT().build()).toBe("[TINYINT]");
    });

    it("Debe crear el tipo de dato SMALLINT", () => {
      expect(DataType.SMALLINT().build()).toBe("[SMALLINT]");
    });

    it("Debe crear el tipo de dato INT", () => {
      expect(DataType.INT().build()).toBe("[INT]");
    });

    it("Debe crear el tipo de dato BIGINT", () => {
      expect(DataType.BIGINT().build()).toBe("[BIGINT]");
    });

    it("Debe crear el tipo de dato BIT", () => {
      expect(DataType.BIT().build()).toBe("[BIT]");
    });

    it("Debe crear el tipo de dato NUMERIC con sus valores por defecto", () => {
      expect(DataType.NUMERIC().build()).toBe("[NUMERIC](18, 0)");
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
      expect(DataType.DECIMAL().build()).toBe("[DECIMAL](18, 0)");
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
      expect(DataType.VARCHAR(10).build()).toBe("[VARCHAR](10)");
    });

    it("Debe lanzar un error al crear el tipo de dato VARCHAR(-10)", () => {
      expect(() => DataType.VARCHAR(-10)).toThrow();
    });

    it("Debe lanzar un error al crear el tipo de dato VARCHAR(0)", () => {
      expect(() => DataType.VARCHAR(0)).toThrow();
    });
  });

  describe("Tipos de datos fecha", () => {
    it("Debe crear el tipo de dato DATE", () => {
      expect(DataType.DATE().build()).toBe("[DATE]");
    });

    it("Debe crear el tipo de dato DATETIME", () => {
      expect(DataType.DATETIME().build()).toBe("[DATETIME]");
    });
  });
});
