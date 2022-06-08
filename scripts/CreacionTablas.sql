USE Examen
GO

--CREACION DE TABLAS

--TABLA Alumnos
CREATE TABLE AP_Murga_Jose_Alumno(
    IdAlumno		 INT NOT NULL IDENTITY(1,1) PRIMARY KEY ,
    sCodAlu			 CHAR(10),
	sNombrePri		 VARCHAR(50),
	sNombreSec		 VARCHAR(50),
    sApellidoPaterno VARCHAR(50),
    sApellidoMaterno VARCHAR(50),
	dFechaNacimiento DATE,
	sSexo			 CHAR(10),
	bEstado			 BIT
)
GO

--TABLA Cursos
CREATE TABLE AP_Murga_Jose_Curso(
    IdCurso		 INT NOT NULL IDENTITY(1,1) PRIMARY KEY ,
	sNombre		 VARCHAR(50),
	sDescripcion VARCHAR(50),    
    bObligatorio BIT,
	bEstado		 BIT
)
GO

--TABLA Notas
CREATE TABLE AP_Murga_Jose_Notas(
    IdNotas		 INT NOT NULL IDENTITY(1,1) PRIMARY KEY ,
	IdAlumno INT,
	FOREIGN KEY (IdAlumno) REFERENCES AP_Murga_Jose_Alumno(IdAlumno),
	IdCurso  INT,
	FOREIGN KEY (IdCurso) REFERENCES AP_Murga_Jose_Curso(IdCurso),
	nPractica1	 DECIMAL(4,2),
	nPractica2	 DECIMAL(4,2),
	nPractica3	 DECIMAL(4,2),
	nParcial	 DECIMAL(4,2),
	nFinal		 DECIMAL(4,2),
	nPromedioFinal	 DECIMAL(4,2),
	bEstado	BIT
)
GO

