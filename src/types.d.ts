type UniqueConstraint<TTableColumns> = {
  name: string;
  columns: (keyof TTableColumns)[];
};

type PrimaryKeyConstraint<TTableColumns> = {
  name: string;
  columns: (keyof TTableColumns)[];
};

type ForeignKeyConstraint<TTableColumns> = {
  name: string;
  columns: (keyof TTableColumns)[];
  referencedTable: string;
  referencedColumns: string[];
};

type DefaultConstraint<TTableColumns> = {
  name: string;
  columns: (keyof TTableColumns)[];
  value: string;
};

type InlineColumnConstraint = {
  name?: string;
  type: "UNIQUE" | "PRIMARY_KEY" | "DEFAULT";
};

type DataTypeName =
  | "INTEGER"
  | "VARCHAR"
  | "TINYINT"
  | "SMALLINT"
  | "INT"
  | "BIGINT"
  | "BIT"
  | "NUMERIC"
  | "DECIMAL"
  | "DATE"
  | "DATETIME"
  | "FLOAT"
  | "REAL";
