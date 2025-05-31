import { describe, it, expect } from "@jest/globals";
import { createTable } from "./create-table";
import { DataType } from "./data-types";
import { Column } from "./column";

function crearTablaPersona() {
  return createTable("Persona", {
    Id: Column.fromType(DataType.INT()),
    Nombre: Column.fromType(DataType.VARCHAR(20)),
    ApellidoPaterno: Column.fromType(DataType.VARCHAR(50)),
    ApellidoMaterno: Column.fromType(DataType.VARCHAR(50)),
    RUT: Column.fromType(DataType.VARCHAR(10)),
  });
}

describe("Create Table", () => {
  it("Debe crear la tabla Persona, con sus columnas id, nombre, apellido paterno, apellido materno y RUT", () => {
    const statement = crearTablaPersona().build();

    expect(statement).toBe(
      "CREATE TABLE [Persona] (" +
        "[Id] [INT], " +
        "[Nombre] [VARCHAR](20), " +
        "[ApellidoPaterno] [VARCHAR](50), " +
        "[ApellidoMaterno] [VARCHAR](50), " +
        "[RUT] [VARCHAR](10)" +
        ");"
    );
  });

  it("Debe crear la tabla Persona y definir la columna id como PRIMARY KEY", () => {
    const statement = crearTablaPersona()
      .addPrimaryKeyConstraint("PK_Persona", ["Id"])
      .build();

    expect(statement).toBe(
      "CREATE TABLE [Persona] (" +
        "[Id] [INT], " +
        "[Nombre] [VARCHAR](20), " +
        "[ApellidoPaterno] [VARCHAR](50), " +
        "[ApellidoMaterno] [VARCHAR](50), " +
        "[RUT] [VARCHAR](10), " +
        "CONSTRAINT [PK_Persona] PRIMARY KEY ([Id])" +
        ");"
    );
  });

  it("Debe crear la tabla Persona y definir una restricción UNIQUE sobre la columna RUT", () => {
    const statement = crearTablaPersona()
      .addUniqueConstraint("UQ_Persona_RUT", ["RUT"])
      .build();

    expect(statement).toBe(
      "CREATE TABLE [Persona] (" +
        "[Id] [INT], " +
        "[Nombre] [VARCHAR](20), " +
        "[ApellidoPaterno] [VARCHAR](50), " +
        "[ApellidoMaterno] [VARCHAR](50), " +
        "[RUT] [VARCHAR](10), " +
        "CONSTRAINT [UQ_Persona_RUT] UNIQUE ([RUT])" +
        ");"
    );
  });

  it("Debe crear la tabla Persona y definir una restricción UNIQUE sobre las columnas nombre y apellido", () => {
    const statement = crearTablaPersona()
      .addUniqueConstraint("UQ_Persona_RUT_Nombre", ["RUT", "Nombre"])
      .build();

    expect(statement).toBe(
      "CREATE TABLE [Persona] (" +
        "[Id] [INT], " +
        "[Nombre] [VARCHAR](20), " +
        "[ApellidoPaterno] [VARCHAR](50), " +
        "[ApellidoMaterno] [VARCHAR](50), " +
        "[RUT] [VARCHAR](10), " +
        "CONSTRAINT [UQ_Persona_RUT_Nombre] UNIQUE ([RUT], [Nombre])" +
        ");"
    );
  });

  it("Debe crear la tabla Persona y definir la columna RUT como NOT NULL", () => {
    const statement = createTable("Persona", {
      Id: Column.fromType(DataType.INT()),
      Nombre: Column.fromType(DataType.VARCHAR(20)),
      ApellidoPaterno: Column.fromType(DataType.VARCHAR(50)),
      ApellidoMaterno: Column.fromType(DataType.VARCHAR(50)),
      RUT: Column.fromType(DataType.VARCHAR(10)).asNotNull(),
    }).build();

    expect(statement).toBe(
      "CREATE TABLE [Persona] (" +
        "[Id] [INT], " +
        "[Nombre] [VARCHAR](20), " +
        "[ApellidoPaterno] [VARCHAR](50), " +
        "[ApellidoMaterno] [VARCHAR](50), " +
        "[RUT] [VARCHAR](10) NOT NULL" +
        ");"
    );
  });

  it("Debe crear la tabla Persona y definir la columna Id como NOT NULL, IDENTITY y PRIMARY KEY", () => {
    const statement = createTable("Persona", {
      Id: Column.fromType(DataType.INT())
        .asNotNull()
        .asIdentity()
        .asPrimaryKey(),
      Nombre: Column.fromType(DataType.VARCHAR(20)),
      ApellidoPaterno: Column.fromType(DataType.VARCHAR(50)),
      ApellidoMaterno: Column.fromType(DataType.VARCHAR(50)),
      RUT: Column.fromType(DataType.VARCHAR(10)),
    }).build();

    expect(statement).toBe(
      "CREATE TABLE [Persona] (" +
        "[Id] [INT] NOT NULL IDENTITY(1, 1) PRIMARY KEY, " +
        "[Nombre] [VARCHAR](20), " +
        "[ApellidoPaterno] [VARCHAR](50), " +
        "[ApellidoMaterno] [VARCHAR](50), " +
        "[RUT] [VARCHAR](10)" +
        ");"
    );
  });

  it("Debe lanzar un error al crear la tabla Persona y definir una restricción UNIQUE sobre una columna repetida", () => {
    expect(() =>
      createTable("Persona", {
        Id: Column.fromType(DataType.INT()),
        Nombre: Column.fromType(DataType.VARCHAR(20)),
        ApellidoPaterno: Column.fromType(DataType.VARCHAR(50)),
        ApellidoMaterno: Column.fromType(DataType.VARCHAR(50)),
        RUT: Column.fromType(DataType.VARCHAR(10)),
      })
        .addUniqueConstraint("UQ_Persona_RUT", ["RUT", "RUT"])
        .build()
    ).toThrow();
  });

  it("Debe lanzar un error al crear la tabla Persona y definir una restricción PRIMARY KEY sobre una columna repetida", () => {
    expect(() =>
      createTable("Persona", {
        Id: Column.fromType(DataType.INT()),
        Nombre: Column.fromType(DataType.VARCHAR(20)),
        ApellidoPaterno: Column.fromType(DataType.VARCHAR(50)),
        ApellidoMaterno: Column.fromType(DataType.VARCHAR(50)),
        RUT: Column.fromType(DataType.VARCHAR(10)),
      })
        .addPrimaryKeyConstraint("PK_Persona_Id", ["Id", "Id"])
        .build()
    ).toThrow();
  });

  it("Debe lanzar un error al crear la tabla Persona, definir la columna Id como PRIMARY KEY y luego definir una restricción PRIMARY KEY sobre la columna Id", () => {
    expect(() => {
      createTable("Persona", {
        Id: Column.fromType(DataType.INT()).asPrimaryKey(),
        Nombre: Column.fromType(DataType.VARCHAR(20)),
        ApellidoPaterno: Column.fromType(DataType.VARCHAR(50)),
        ApellidoMaterno: Column.fromType(DataType.VARCHAR(50)),
        RUT: Column.fromType(DataType.VARCHAR(10)),
      })
        .addPrimaryKeyConstraint("PK_Persona_Id", ["Id"])
        .build();
    }).toThrow();

    expect(() => {
      createTable("Persona", {
        Id: Column.fromType(DataType.INT()).asPrimaryKey("PK_Persona_Id_123"),
        Nombre: Column.fromType(DataType.VARCHAR(20)),
        ApellidoPaterno: Column.fromType(DataType.VARCHAR(50)),
        ApellidoMaterno: Column.fromType(DataType.VARCHAR(50)),
        RUT: Column.fromType(DataType.VARCHAR(10)),
      })
        .addPrimaryKeyConstraint("PK_Persona_Id", ["Id"])
        .build();
    }).toThrow();
  });

  it("Debe lanzar un error al crear la tabla Persona y definir 2 restricciones con mismo nombre", () => {
    expect(() => {
      createTable("Persona", {
        Id: Column.fromType(DataType.INT()),
        Nombre: Column.fromType(DataType.VARCHAR(20)),
        ApellidoPaterno: Column.fromType(DataType.VARCHAR(50)),
        ApellidoMaterno: Column.fromType(DataType.VARCHAR(50)),
        RUT: Column.fromType(DataType.VARCHAR(10)),
      })
        .addUniqueConstraint("UQ_Persona_RUT", ["RUT"])
        .addUniqueConstraint("UQ_Persona_RUT", ["ApellidoPaterno"])
        .build();
    }).toThrow();

    expect(() => {
      createTable("Persona", {
        Id: Column.fromType(DataType.INT()).asPrimaryKey("UQ_Persona_RUT"),
        Nombre: Column.fromType(DataType.VARCHAR(20)),
        ApellidoPaterno: Column.fromType(DataType.VARCHAR(50)),
        ApellidoMaterno: Column.fromType(DataType.VARCHAR(50)),
        RUT: Column.fromType(DataType.VARCHAR(10)),
      })
        .addUniqueConstraint("UQ_Persona_RUT", ["ApellidoPaterno"])
        .build();
    }).toThrow();

    expect(() => {
      createTable("Persona", {
        Id: Column.fromType(DataType.INT()),
        Nombre: Column.fromType(DataType.VARCHAR(20)),
        ApellidoPaterno: Column.fromType(DataType.VARCHAR(50)),
        ApellidoMaterno: Column.fromType(DataType.VARCHAR(50)),
        RUT: Column.fromType(DataType.VARCHAR(10)),
      })
        .addPrimaryKeyConstraint("UQ_Persona_RUT", ["RUT"])
        .addUniqueConstraint("UQ_Persona_RUT", ["ApellidoPaterno"])
        .build();
    }).toThrow();

    expect(() => {
      createTable("Persona", {
        Id: Column.fromType(DataType.INT()),
        Nombre: Column.fromType(DataType.VARCHAR(20)),
        ApellidoPaterno: Column.fromType(DataType.VARCHAR(50)),
        ApellidoMaterno: Column.fromType(DataType.VARCHAR(50)),
        RUT: Column.fromType(DataType.VARCHAR(10)).asUnique("UQ_Persona_RUT"),
      })
        .addUniqueConstraint("UQ_Persona_RUT", ["RUT"])
        .build();
    }).toThrow();
  });
});
