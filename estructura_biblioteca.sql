/*==============================================================*/
/* Table: Libro                                                 */
/*==============================================================*/
CREATE TABLE Libro 
(
    id                  VARCHAR(8)     NOT NULL,
    titulo              VARCHAR(128)   NOT NULL,
    autor               VARCHAR(64)    NOT NULL,
    genero              VARCHAR(64)    NOT NULL,
    editorial           VARCHAR(64)    NULL,
    fecha_publicacion   DATE           NULL,
    num_paginas         INTEGER        NULL,
    estado              VARCHAR(16)    NOT NULL,
    cantidad            INTEGER        NOT NULL,
    precio              NUMERIC(4,2)   NOT NULL,
    CONSTRAINT PK_libro PRIMARY KEY (id)
);

/*==============================================================*/
/* Table: Prestamo                                              */
/*==============================================================*/
create table Prestamo 
(
   id_prestamo          varchar(8)                     not null,
   id_libro             varchar(8)                     not null,
   id_cliente           varchar(16)                    not null,
   fecha_prestamo       date                           not null,
   fecha_devolucion     date                           null,
   precio               numeric(4,2)                   not null,
   multa                numeric(4,2)                   null,
   observaciones        varchar(256)                   null,
   constraint PK_prestamo primary key (id_prestamo)
);
SELECT * FROM Prestamo

CREATE TABLE usuarios (
    id VARCHAR(64) PRIMARY KEY,
    cedula VARCHAR(50),
    nombre VARCHAR(100),
    apellido VARCHAR(100),
    rol VARCHAR(50),
    contrasenia VARCHAR(100),
    usuario VARCHAR(50),
    telefono VARCHAR(20),
    direccion VARCHAR(255),
    correo VARCHAR(50)
)

INSERT INTO usuarios (id, cedula, nombre, apellido, rol, contrasenia, usuario, telefono, direccion)
VALUES ('l00', '1234567890', 'Juan', 'P�rez', 'Administrador', 'contrase�a123', 'juanperez', '555-1234', 'Calle Principal #123');

SELECT * FROM usuarios