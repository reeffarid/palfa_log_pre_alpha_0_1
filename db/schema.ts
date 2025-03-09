import { integer, pgTable, varchar, serial, text, numeric, boolean } from "drizzle-orm/pg-core";

//Solo tablas principales, falta verificar integración con llaves foraneas en tablas de leyenda, además de organizar base de datos en función a códigos de geologo e integración parcial de las 3 tablas de datos en distintos esquemas

//Buscar un workaround a los constraints de ingreso de datos en geotecnia y estructural (lado del servidor), por ahora se ha hecho en base al UI (solo del lado del cliente)

//Tabla Structural

//Hole - CONSTRAINT NO SE PUDO IMPLEMENTAR DRIZZLE NO TIENE SOPORTE NATIVO, BUSCAR UN WORKAROUND
export const Hole = pgTable ('Hole',{
    id: serial().notNull().primaryKey().unique(), //id BIGSERIAL PRIMARY KEY,
    Project_id: varchar().notNull(), //Project_id BIGINT NOT NULL, FOREIGN KEY (Project_id) REFERENCES Project(id) ON DELETE CASCADE,
    logged_by: varchar('logged_by',{length: 10}).notNull(), // Logged_by VARCHAR(4) NOT NULL,
    hole_id: varchar('hole_id',{length: 100}).notNull(), // Logged_by VARCHAR(4) NOT NULL,
    Min_1: varchar({length: 10}).notNull(),
    Min_2: varchar({length: 10}).notNull(),
    Min_3: varchar({length: 10}).notNull(),
    depth_from: numeric('depth_from',{precision:20, scale:4}).notNull(), //Depth_from NUMERIC(10,2), CONSTRAINT CHECK (Depth_from >= 0) NO SE PUDO IMPLEMENTAR DRIZZLE NO TIENE SOPORTE NATIVO, BUSCAR UN WORKAROUND,
    alpha: numeric('alpha',{precision:10,scale:4}), //alpha NUMERIC(5,2) CHECK (alpha BETWEEN 0 AND 90),
    beta: numeric('beta', {precision:10,scale:4}), //beta NUMERIC(5,2) CHECK (beta BETWEEN 0 AND 360),
    structure_type: varchar('structure_type',{length: 50}).notNull(), //type_id VARCHAR(50) NOT NULL,
    texture_type: varchar('texture_type', {length: 50}).notNull(), //texture_id VARCHAR(50),FOREIGN KEY (texture_id) REFERENCES Texture(Code),
    Thickness: numeric({precision:20,scale:4}).notNull(), //Thickness NUMERIC(10,2) CHECK (Thickness >= 0),
    Open: varchar({length: 50}).notNull(),// Open BOOLEAN DEFAULT FALSE,
    Roughness_id: varchar({length: 50}).notNull(), // Roughness_id VARCHAR(50), FOREIGN KEY (Roughness_id) REFERENCES Roughness(Code),
    Infill_id: varchar({length: 50}).notNull(), // Infill_id VARCHAR(50), FOREIGN KEY (Infill_id) REFERENCES Infill(Code),
    Infill_thickness_id: varchar({length: 50}).notNull(), // Infill_thickness_id VARCHAR(50), FOREIGN KEY (Infill_thickness_id) REFERENCES Infill_thickness(Code)
    Comentaries: text(), //Comentaries TEXT CHECK (LENGTH(Comentaries) <= 500),
});


//Tabla Relogueo

export const Relogging = pgTable ('Relogging',{
    id: serial().notNull().primaryKey().unique(), //id BIGSERIAL PRIMARY KEY,
    Project_id: varchar().notNull(), //Project_id BIGINT NOT NULL, FOREIGN KEY (Project_id) REFERENCES Project(id) ON DELETE CASCADE,
    Hole_ID: varchar({length: 100}).notNull(), // Logged_by VARCHAR(4) NOT NULL,
    Depth_From: numeric({precision:20, scale:6}).notNull(),
    Depth_To: numeric({precision:20, scale:6}).notNull(),
    Lithology: varchar({length: 100}).notNull(),
    Qz_Vt: numeric({precision:20, scale:6}).notNull(),
    Qz_Alt: numeric({precision:20, scale:6}).notNull(),
    Qz_Sulphides: numeric({precision:20, scale:6}).notNull(),
    Qz_Bleaching: numeric({precision:20, scale:6}).notNull(),
    Qz_Carbonates: numeric({precision:20, scale:6}).notNull(),
    Qz_Limonites: numeric({precision:20, scale:6}).notNull(),
    As: numeric({precision:20, scale:6}).notNull(),
    Py: numeric({precision:20, scale:6}).notNull(),
    Sp: numeric({precision:20, scale:6}).notNull(),
    Cpy: numeric({precision:20, scale:6}).notNull(),
    Po: numeric({precision:20, scale:6}).notNull(),
    Undiff: numeric({precision:20, scale:6}).notNull(),
    Bleaching_Cly: numeric({precision:20, scale:6}).notNull(),
    Bleaching_Ser: numeric({precision:20, scale:6}).notNull(),
    Bleaching_Alb: numeric({precision:20, scale:6}).notNull(),
    Silification: numeric({precision:20, scale:6}).notNull(),
    Qz_Po_Ac_Al:numeric({precision:20, scale:6}).notNull(),
    Qz_Py_As_Se:numeric({precision:20, scale:6}).notNull(),
    Py_As_Se:numeric({precision:20, scale:6}).notNull(),
    Qz_Su:numeric({precision:20, scale:6}).notNull(),
    Ca: numeric({precision:20, scale:6}).notNull(),
    Qz_Ca:numeric({precision:20, scale:6}).notNull(),
    Sulf:numeric({precision:20, scale:6}).notNull(),
    Qz_undiff: numeric({precision:20, scale:6}).notNull(),
    Bt: numeric({precision:20, scale:6}).notNull(),
    Comments: text(), //Comentaries TEXT CHECK (LENGTH(Comentaries) <= 500),
});

//Tabla Geotecnia

export const Geotechnical = pgTable ('Geotechnical',{
    id: serial().notNull().primaryKey().unique(), //id BIGSERIAL PRIMARY KEY,
    Project_id: integer().notNull(), //Project_id BIGINT NOT NULL, FOREIGN KEY (Project_id) REFERENCES Project(id) ON DELETE CASCADE,
    Hole_ID: varchar({length: 100}).notNull(), // Logged_by VARCHAR(4) NOT NULL,
    Logged_by: varchar({length: 100}).notNull(), // Logged_by VARCHAR(4) NOT NULL,
    Core_Diameter: varchar({length: 100}).notNull(), // Logged_by VARCHAR(4) NOT NULL,
    Depth_From: numeric({precision:20, scale:6}).notNull(),
    Depth_To: numeric({precision:20, scale:6}).notNull(),
    Length: numeric({precision:20, scale:6}).notNull(),
    C_over_L: numeric({precision:20, scale:6}).notNull(),
    Lithology: varchar({length: 100}).notNull(),
    Weathering: varchar({length: 100}).notNull(),
    Natural_Break_Count: numeric({precision:20, scale:6}).notNull(),
    Broken_Zone_Count: numeric({precision:20, scale:6}).notNull(),
    Core: numeric({precision:20, scale:6}).notNull(),
    RQD_Count: numeric({precision:20, scale:6}).notNull(),
    Discontinuity: varchar({length: 100}).notNull(),
    Joint_Set: numeric({precision:20, scale:6}).notNull(),
    Roughness: numeric({precision:20, scale:6}).notNull(),
    Joint_Surface_Host: numeric({precision:20, scale:6}).notNull(),
    Infill_id: varchar({length: 50}).notNull(), // Infill_id VARCHAR(50), FOREIGN KEY (Infill_id) REFERENCES Infill(Code),
    Infill_thickness_id: varchar({length: 50}).notNull(), // Infill_thickness_id VARCHAR(50), FOREIGN KEY (Infill_thickness_id) REFERENCES Infill_thickness(Code)
    QSI: varchar({length: 50}).notNull(),
    FF: numeric({precision:20, scale:6}).notNull(),
    Comments: text(), //Comentaries TEXT CHECK (LENGTH(Comentaries) <= 500),
});