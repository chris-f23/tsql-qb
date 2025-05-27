import { describe, it, expect } from "@jest/globals";
import { createTable } from "./create-table";
import { DataType } from "./data-types";

describe("Módulo create-table", () => {
  it("Debe crear la tabla Persona, con sus columnas siendo un id, nombre, apellido paterno, apellido materno y rut.", () => {
    const statement = createTable("Persona", {
      Id: DataType.INTEGER(),
      Nombre: DataType.VARCHAR(20),
      ApellidoPaterno: DataType.VARCHAR(50),
      ApellidoMaterno: DataType.VARCHAR(50),
      RUT: DataType.VARCHAR(10),
    }).build();

    expect(statement).toBe(
      "CREATE TABLE [Persona] (" +
        "[Id] [INTEGER], " +
        "[Nombre] [VARCHAR](20), " +
        "[ApellidoPaterno] [VARCHAR](50), " +
        "[ApellidoMaterno] [VARCHAR](50), " +
        "[RUT] [VARCHAR](10)" +
        ");"
    );
  });

  it("Debe crear la tabla Persona y definir la columna id como PRIMARY KEY.", () => {
    const statement = createTable("Persona", {
      Id: DataType.INTEGER(),
      Nombre: DataType.VARCHAR(20),
      ApellidoPaterno: DataType.VARCHAR(50),
      ApellidoMaterno: DataType.VARCHAR(50),
      RUT: DataType.VARCHAR(10),
    })
      .addPrimaryKeyConstraint("PK_Persona", ["Id"])
      .build();

    expect(statement).toBe(
      "CREATE TABLE [Persona] (" +
        "[Id] [INTEGER], " +
        "[Nombre] [VARCHAR](20), " +
        "[ApellidoPaterno] [VARCHAR](50), " +
        "[ApellidoMaterno] [VARCHAR](50), " +
        "[RUT] [VARCHAR](10), " +
        "CONSTRAINT [PK_Persona] PRIMARY KEY ([Id])" +
        ");"
    );
  });

  it("Debe crear la tabla Persona y definir una restricción UNIQUE sobre la columna RUT.", () => {
    const statement = createTable("Persona", {
      Id: DataType.INTEGER(),
      Nombre: DataType.VARCHAR(20),
      ApellidoPaterno: DataType.VARCHAR(50),
      ApellidoMaterno: DataType.VARCHAR(50),
      RUT: DataType.VARCHAR(10),
    })
      .addUniqueConstraint("UQ_Persona_RUT", ["RUT"])
      .build();

    expect(statement).toBe(
      "CREATE TABLE [Persona] (" +
        "[Id] [INTEGER], " +
        "[Nombre] [VARCHAR](20), " +
        "[ApellidoPaterno] [VARCHAR](50), " +
        "[ApellidoMaterno] [VARCHAR](50), " +
        "[RUT] [VARCHAR](10), " +
        "CONSTRAINT [UQ_Persona_RUT] UNIQUE ([RUT])" +
        ");"
    );
  });

  it("Debe crear la tabla Persona y definir una restricción UNIQUE sobre las columnas nombre y apellido.", () => {
    const statement = createTable("Persona", {
      Id: DataType.INTEGER(),
      Nombre: DataType.VARCHAR(20),
      ApellidoPaterno: DataType.VARCHAR(50),
      ApellidoMaterno: DataType.VARCHAR(50),
      RUT: DataType.VARCHAR(10),
    })
      .addUniqueConstraint("UQ_Persona_RUT_Nombre", ["RUT", "Nombre"])
      .build();

    expect(statement).toBe(
      "CREATE TABLE [Persona] (" +
        "[Id] [INTEGER], " +
        "[Nombre] [VARCHAR](20), " +
        "[ApellidoPaterno] [VARCHAR](50), " +
        "[ApellidoMaterno] [VARCHAR](50), " +
        "[RUT] [VARCHAR](10), " +
        "CONSTRAINT [UQ_Persona_RUT_Nombre] UNIQUE ([RUT], [Nombre])" +
        ");"
    );
  });
});
