/* healthDB */

CREATE TABLE Usuario (
  idUsuario INTEGER GENERATED BY DEFAULT AS IDENTITY,
  nombre VARCHAR2(75) NOT NULL,
  apellido VARCHAR2(75) NOT NULL,
  edad INTEGER NULL,
  genero SMALLINT NULL,
  peso NUMBER(5,2) NULL,
  estatura NUMBER(3,2) NULL,
  tipo SMALLINT DEFAULT 0,
  nickName VARCHAR2(100) NOT NULL,
  contrasenia VARCHAR2(100) NOT NULL,
  PRIMARY KEY (idUsuario)
);

CREATE TABLE Coach (
  idCoach INTEGER GENERATED BY DEFAULT AS IDENTITY,
  idAtleta INTEGER NOT NULL,
  idEntrenador INTEGER NOT NULL,
  PRIMARY KEY (idCoach),
  FOREIGN KEY (idAtleta) REFERENCES Usuario(idUsuario),
  FOREIGN KEY (idEntrenador) REFERENCES Usuario(idUsuario)
);

CREATE TABLE RitmoCardiaco(
  idRitmo INTEGER GENERATED BY DEFAULT AS IDENTITY,
  medicion NUMBER(5,2) DEFAULT 0.00,
  fechaHora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  idUsuario INTEGER NOT NULL,
  PRIMARY KEY (idRitmo),
  FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
);

CREATE TABLE DetalleRitmo(
  idDetalleRitmo INTEGER GENERATED BY DEFAULT AS IDENTITY,
  medicion NUMBER(5,2) NOT NULL,
  idRitmo INTEGER NOT NULL,
  PRIMARY KEY (idDetalleRitmo),
  FOREIGN KEY (idRitmo) REFERENCES RitmoCardiaco(idRitmo)
);

CREATE TABLE Temperatura(
  idTemperatura INTEGER GENERATED BY DEFAULT AS IDENTITY,
  fechaHora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  promedio NUMBER(5,2) DEFAULT 0.00,
  minTemp NUMBER(5,2) DEFAULT 0.00,
  maxTemp NUMBER(5,2) DEFAULT 0.00,
  idUsuario INTEGER NOT NULL,
  PRIMARY KEY (idTemperatura),
  FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario) 
);

CREATE TABLE DetalleTemperatura(
  idDetalleTemperatura INTEGER GENERATED BY DEFAULT AS IDENTITY,
  medicion NUMBER(5,2) NOT NULL,
  idTemperatura INTEGER NOT NULL,
  PRIMARY KEY (idDetalleTemperatura),
  FOREIGN KEY (idTemperatura) REFERENCES Temperatura(idTemperatura)
);

CREATE TABLE Oxigeno(
  idOxigeno INTEGER GENERATED BY DEFAULT AS IDENTITY,
  medicion NUMBER(5,2) DEFAULT 0.00,
  fechaHora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  idUsuario INTEGER NOT NULL,
  PRIMARY KEY (idOxigeno),
  FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
);

CREATE TABLE DetalleOxigeno(
  idDetalleOxigeno INTEGER GENERATED BY DEFAULT AS IDENTITY,
  medicion NUMBER(5,2) NOT NULL,
  idOxigeno INTEGER NOT NULL,
  PRIMARY KEY (idDetalleOxigeno),
  FOREIGN KEY (idOxigeno) REFERENCES Oxigeno(idOxigeno)
);

CREATE TABLE Test(
  idTest INTEGER GENERATED BY DEFAULT AS IDENTITY,
  estado VARCHAR2(75) DEFAULT 'INICIADO',
  fechaInicio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fechaFin TIMESTAMP,
  idUsuario INTEGER NOT NULL,
  PRIMARY KEY (idTest),
  FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
);

CREATE TABLE Repeticion(
  idRepeticion INTEGER GENERATED BY DEFAULT AS IDENTITY,
  numero INTEGER,
  idTest INTEGER NOT NULL,
  PRIMARY KEY (idRepeticion),
  FOREIGN KEY (idTest) REFERENCES Test(idTest)
);

CREATE TABLE Velocidad(
  idVelocidad INTEGER GENERATED BY DEFAULT AS IDENTITY,
  promedio NUMBER(5,2) DEFAULT 0.00,
  minVel NUMBER(5,2) DEFAULT 0.00,
  maxVel NUMBER(5,2) DEFAULT 0.00,
  idRepeticion INTEGER NOT NULL,
  PRIMARY KEY (idVelocidad),
  FOREIGN KEY (idRepeticion) REFERENCES Repeticion(idRepeticion)
);

CREATE TABLE DetalleVelocidad(
  idDetalleVelocidad INTEGER GENERATED BY DEFAULT AS IDENTITY,
  medicion NUMBER(5,2) NOT NULL,
  idVelocidad INTEGER NOT NULL,
  PRIMARY KEY (idDetalleVelocidad),
  FOREIGN KEY (idVelocidad) REFERENCES Velocidad(idVelocidad)
);

CREATE TABLE Distancia(
  idDistancia INTEGER GENERATED BY DEFAULT AS IDENTITY,
  medicion NUMBER(5,2) NOT NULL,
  idRepeticion INTEGER NOT NULL,
  PRIMARY KEY (idDistancia),
  FOREIGN KEY (idRepeticion) REFERENCES Repeticion(idRepeticion)
);

/* TRIGGERS */
CREATE OR REPLACE TRIGGER tg_promedioRitmo
FOR INSERT ON DetalleRitmo
COMPOUND TRIGGER
  v_idRitmo INTEGER;
  v_promedio NUMBER(5,2);

  AFTER EACH ROW IS
  BEGIN
    v_idRitmo := :NEW.idRitmo;
  END AFTER EACH ROW;

  AFTER STATEMENT IS
    BEGIN
      SELECT AVG(dt.medicion) INTO v_promedio FROM DetalleRitmo dt
        WHERE dt.idRitmo = v_idRitmo;

      UPDATE RitmoCardiaco SET medicion = v_promedio 
        WHERE idRitmo = v_idRitmo;
  END AFTER STATEMENT;
END tg_promedioRitmo;

CREATE OR REPLACE TRIGGER tg_minmaxpromTemps
FOR INSERT ON DetalleTemperatura
COMPOUND TRIGGER
  v_idTemperatura INTEGER;
  v_promedio NUMBER(5,2);
  v_min NUMBER(5,2);
  v_max NUMBER(5,2);

  AFTER EACH ROW IS
  BEGIN
    v_idTemperatura := :NEW.idTemperatura;
  END AFTER EACH ROW;

  AFTER STATEMENT IS
    BEGIN
      SELECT AVG(tm.medicion) INTO v_promedio FROM DetalleTemperatura tm
        WHERE tm.idTemperatura = v_idTemperatura;

      SELECT MIN(tm.medicion) INTO v_min FROM DetalleTemperatura tm
        WHERE tm.idTemperatura = v_idTemperatura;

      SELECT MAX(tm.medicion) INTO v_max FROM DetalleTemperatura tm
        WHERE tm.idTemperatura = v_idTemperatura;

      UPDATE Temperatura SET 
          promedio = v_promedio, 
          minTemp = v_min,
          maxTemp = v_max
        WHERE idTemperatura = v_idTemperatura;  
  END AFTER STATEMENT;
END tg_minmaxpromTemps;

CREATE OR REPLACE TRIGGER tg_promedioOxigeno 
FOR INSERT ON DetalleOxigeno
COMPOUND TRIGGER 
    valor_idOxigeno INTEGER;
    promedio NUMBER(5,2);
        
    AFTER EACH ROW IS
    BEGIN
        valor_idOxigeno := :NEW.idOxigeno; 
    END AFTER EACH ROW; 
    
    AFTER STATEMENT IS 
    BEGIN 
        SELECT AVG(deo.medicion)INTO promedio FROM DetalleOxigeno deo
        WHERE deo.idoxigeno = valor_idOxigeno; 
        
        UPDATE Oxigeno SET medicion = promedio
        WHERE idoxigeno = valor_idOxigeno; 
    
    END AFTER STATEMENT; 
END tg_promedioOxigeno;

CREATE OR REPLACE TRIGGER tg_minmaxpromVelocidad
FOR INSERT ON DetalleVelocidad
COMPOUND TRIGGER
  v_idVelocidad INTEGER;
  v_promedio NUMBER(5,2);
  v_min NUMBER(5,2);
  v_max NUMBER(5,2);

  AFTER EACH ROW IS
  BEGIN
    v_idVelocidad := :NEW.idVelocidad;
  END AFTER EACH ROW;

  AFTER STATEMENT IS
    BEGIN
      SELECT AVG(dv.medicion) INTO v_promedio FROM DetalleVelocidad dv
        WHERE dv.idVelocidad = v_idVelocidad;

      SELECT MIN(dv.medicion) INTO v_min FROM DetalleVelocidad dv
        WHERE dv.idVelocidad = v_idVelocidad;

      SELECT MAX(dv.medicion) INTO v_max FROM DetalleVelocidad dv
        WHERE dv.idVelocidad = v_idVelocidad;

      UPDATE Velocidad SET 
          promedio = v_promedio, 
          minVel = v_min,
          maxVel = v_max
        WHERE idVelocidad = v_idVelocidad;  
  END AFTER STATEMENT;
END tg_minmaxpromVelocidad;

/* VIEWS */
CREATE OR REPLACE VIEW coaching AS
  SELECT ch.idEntrenador AS IDCOACH, us.idUsuario AS IDUSUARIO, 
    us.nombre, us.apellido, us.genero, us.edad,
    us.peso, us.estatura FROM Coach ch
  INNER JOIN Usuario us ON (ch.idAtleta = us.idUsuario);

CREATE OR REPLACE VIEW repeticionTest AS
  SELECT ts.idTest, ts.idUsuario, repe.idRepeticion, 
    repe.numero, vel.idVelocidad, vel.promedio, 
    vel.minVel, vel.maxVel, 
    (
      SELECT medicion FROM Distancia
      WHERE idRepeticion = repe.idRepeticion
      ORDER BY idDistancia DESC
      FETCH NEXT 1 ROWS ONLY
    ) AS distancia
  FROM Repeticion repe
  INNER JOIN Velocidad vel ON (repe.idRepeticion = vel.idRepeticion)
  INNER JOIN Test ts ON (repe.idTest = ts.idTest); 