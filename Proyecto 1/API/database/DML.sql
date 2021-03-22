/* USUARIOS */
INSERT INTO USUARIO (NOMBRE, APELLIDO, EDAD, GENERO, 
    PESO, ESTATURA, TIPO, NICKNAME, CONTRASENIA) 
    VALUES ('Dan', 'Reynolds', 33, 1, 170.00, 
        1.95, 0, 'dare', '1234');
    
INSERT INTO USUARIO (NOMBRE, APELLIDO, EDAD, GENERO, 
        PESO, ESTATURA, TIPO, NICKNAME, CONTRASENIA) 
    VALUES ('Damien', 'Rice', 47, 1, 150.00, 
        1.80, 0, 'dari', '1234');

INSERT INTO USUARIO (NOMBRE, APELLIDO, EDAD, GENERO, 
        PESO, ESTATURA, TIPO, NICKNAME, CONTRASENIA) 
    VALUES ('Avril', 'Lavigne', 36 , 0, 110.23, 
        1.57, 0, 'avla', '1234');

INSERT INTO USUARIO (NOMBRE, APELLIDO, EDAD, GENERO, 
        PESO, ESTATURA, TIPO, NICKNAME, CONTRASENIA) 
    VALUES ('Robert', 'Lewandowski', 32, 1, 176.37, 
        1.84, 0, 'rolew', '1234');

INSERT INTO USUARIO (NOMBRE, APELLIDO, EDAD, GENERO, 
        PESO, ESTATURA, TIPO, NICKNAME, CONTRASENIA) 
    VALUES ('Jurgen', 'Klopp', 53, 1, 182.98, 
        1.91, 1, 'jukl', '1234');

INSERT INTO USUARIO (NOMBRE, APELLIDO, EDAD, GENERO, 
        PESO, ESTATURA, TIPO, NICKNAME, CONTRASENIA) 
    VALUES ('Alex', 'Morgan', 31, 0, 136.68, 
        1.70, 1, 'almo', '1234');

/* COACH */
INSERT INTO COACH (IDATLETA, IDENTRENADOR) VALUES (1, 5);
INSERT INTO COACH (IDATLETA, IDENTRENADOR) VALUES (2, 5);
INSERT INTO COACH (IDATLETA, IDENTRENADOR) VALUES (4, 5);
INSERT INTO COACH (IDATLETA, IDENTRENADOR) VALUES (3, 6);

/* RITMO CARDIACO*/

INSERT INTO RITMOCARDIACO (idRitmo, medicion, idUsuario) VALUES (1, 0, 1); 
INSERT INTO RITMOCARDIACO (idRitmo, medicion, idUsuario) VALUES (2, 0, 2);
INSERT INTO RITMOCARDIACO (idRitmo, medicion, idUsuario) VALUES (3, 0, 3);
INSERT INTO RITMOCARDIACO (idRitmo, medicion, idUsuario) VALUES (4, 0, 4);
INSERT INTO RITMOCARDIACO (idRitmo, medicion, idUsuario) VALUES (5, 0, 5);

INSERT INTO RITMOCARDIACO (idRitmo, medicion, idUsuario) VALUES (6, 0, 1);
INSERT INTO RITMOCARDIACO (idRitmo, medicion, idUsuario) VALUES (7, 0, 2);
INSERT INTO RITMOCARDIACO (idRitmo, medicion, idUsuario) VALUES (8, 0, 3);
INSERT INTO RITMOCARDIACO (idRitmo, medicion, idUsuario) VALUES (9, 0, 4);
INSERT INTO RITMOCARDIACO (idRitmo, medicion, idUsuario) VALUES (10, 0, 5);

INSERT INTO RITMOCARDIACO (idRitmo, medicion, idUsuario) VALUES (11, 0, 1);
INSERT INTO RITMOCARDIACO (idRitmo, medicion, idUsuario) VALUES (12, 0, 2);
INSERT INTO RITMOCARDIACO (idRitmo, medicion, idUsuario) VALUES (13, 0, 3);
INSERT INTO RITMOCARDIACO (idRitmo, medicion, idUsuario) VALUES (14, 0, 4);
INSERT INTO RITMOCARDIACO (idRitmo, medicion, idUsuario) VALUES (15, 0, 5);

INSERT INTO RITMOCARDIACO (idRitmo, medicion, idUsuario) VALUES (16, 0, 1);
INSERT INTO RITMOCARDIACO (idRitmo, medicion, idUsuario) VALUES (17, 0, 2);
INSERT INTO RITMOCARDIACO (idRitmo, medicion, idUsuario) VALUES (18, 0, 3);
INSERT INTO RITMOCARDIACO (idRitmo, medicion, idUsuario) VALUES (19, 0, 4);
INSERT INTO RITMOCARDIACO (idRitmo, medicion, idUsuario) VALUES (20, 0, 5);


/* DETALLE RITMO CARDIACO */ 
INSERT INTO DETALLERITMO (medicion, idRitmo) VALUES (94, 1);
INSERT INTO DETALLERITMO (medicion, idRitmo) VALUES (89, 1); 
INSERT INTO DETALLERITMO (medicion, idRitmo) VALUES (76, 1); 
INSERT INTO DETALLERITMO (medicion, idRitmo) VALUES (84, 1); 
INSERT INTO DETALLERITMO (medicion, idRitmo) VALUES (78, 1);

INSERT INTO DETALLERITMO (medicion, idRitmo) VALUES (73, 2); 
INSERT INTO DETALLERITMO (medicion, idRitmo) VALUES (99, 2); 
INSERT INTO DETALLERITMO (medicion, idRitmo) VALUES (76, 2); 
INSERT INTO DETALLERITMO (medicion, idRitmo) VALUES (88, 2); 
INSERT INTO DETALLERITMO (medicion, idRitmo) VALUES (78, 2); 

INSERT INTO DETALLERITMO (medicion, idRitmo) VALUES (89, 3);
INSERT INTO DETALLERITMO (medicion, idRitmo) VALUES (70, 3); 
INSERT INTO DETALLERITMO (medicion, idRitmo) VALUES (74, 3); 
INSERT INTO DETALLERITMO (medicion, idRitmo) VALUES (69, 3); 
INSERT INTO DETALLERITMO (medicion, idRitmo) VALUES (94, 3); 

INSERT INTO DETALLERITMO (medicion, idRitmo) VALUES (65, 4); 
INSERT INTO DETALLERITMO (medicion, idRitmo) VALUES (70, 4); 
INSERT INTO DETALLERITMO (medicion, idRitmo) VALUES (74, 4); 
INSERT INTO DETALLERITMO (medicion, idRitmo) VALUES (69, 4); 
INSERT INTO DETALLERITMO (medicion, idRitmo) VALUES (94, 4); 

INSERT INTO DETALLERITMO (medicion, idRitmo) VALUES (65, 5);
INSERT INTO DETALLERITMO (medicion, idRitmo) VALUES (70, 5); 
INSERT INTO DETALLERITMO (medicion, idRitmo) VALUES (74, 5); 
INSERT INTO DETALLERITMO (medicion, idRitmo) VALUES (69, 5); 
INSERT INTO DETALLERITMO (medicion, idRitmo) VALUES (94, 5); 

INSERT INTO DETALLERITMO (medicion, idRitmo) VALUES (65, 6);
INSERT INTO DETALLERITMO (medicion, idRitmo) VALUES (70, 6); 
INSERT INTO DETALLERITMO (medicion, idRitmo) VALUES (74, 6); 
INSERT INTO DETALLERITMO (medicion, idRitmo) VALUES (69, 6); 
INSERT INTO DETALLERITMO (medicion, idRitmo) VALUES (94, 6); 

INSERT INTO DETALLERITMO (medicion, idRitmo) VALUES (65, 7);
INSERT INTO DETALLERITMO (medicion, idRitmo) VALUES (70, 7); 
INSERT INTO DETALLERITMO (medicion, idRitmo) VALUES (74, 7); 
INSERT INTO DETALLERITMO (medicion, idRitmo) VALUES (69, 7); 
INSERT INTO DETALLERITMO (medicion, idRitmo) VALUES (94, 7); 

INSERT INTO DETALLERITMO (medicion, idRitmo) VALUES (91, 8); 
INSERT INTO DETALLERITMO (medicion, idRitmo) VALUES (84, 8); 
INSERT INTO DETALLERITMO (medicion, idRitmo) VALUES (71, 8); 
INSERT INTO DETALLERITMO (medicion, idRitmo) VALUES (79, 8); 
INSERT INTO DETALLERITMO (medicion, idRitmo) VALUES (82, 8); 

INSERT INTO DETALLERITMO (medicion, idRitmo) VALUES (65, 9); 
INSERT INTO DETALLERITMO (medicion, idRitmo) VALUES (66, 9); 
INSERT INTO DETALLERITMO (medicion, idRitmo) VALUES (70, 9); 
INSERT INTO DETALLERITMO (medicion, idRitmo) VALUES (63, 9); 
INSERT INTO DETALLERITMO (medicion, idRitmo) VALUES (63, 9); 

INSERT INTO DETALLERITMO (medicion, idRitmo) VALUES (83, 10); 
INSERT INTO DETALLERITMO (medicion, idRitmo) VALUES (90, 10); 
INSERT INTO DETALLERITMO (medicion, idRitmo) VALUES (69, 10); 
INSERT INTO DETALLERITMO (medicion, idRitmo) VALUES (97, 10); 
INSERT INTO DETALLERITMO (medicion, idRitmo) VALUES (92, 10); 

INSERT INTO DETALLERITMO (medicion, idRitmo) VALUES (93, 11); 
INSERT INTO DETALLERITMO (medicion, idRitmo) VALUES (76, 11); 
INSERT INTO DETALLERITMO (medicion, idRitmo) VALUES (74, 11); 
INSERT INTO DETALLERITMO (medicion, idRitmo) VALUES (62, 11); 
INSERT INTO DETALLERITMO (medicion, idRitmo) VALUES (75, 11); 

INSERT INTO DETALLERITMO (medicion, idRitmo) VALUES (92, 12); 
INSERT INTO DETALLERITMO (medicion, idRitmo) VALUES (96, 12); 
INSERT INTO DETALLERITMO (medicion, idRitmo) VALUES (102, 12); 
INSERT INTO DETALLERITMO (medicion, idRitmo) VALUES (72, 12); 
INSERT INTO DETALLERITMO (medicion, idRitmo) VALUES (77, 12); 
 
/* OXIGENO */ 
INSERT INTO OXIGENO (idOxigeno, idUsuario) VALUES (1, 1); 
INSERT INTO OXIGENO (idOxigeno, idUsuario) VALUES (2, 2); 
INSERT INTO OXIGENO (idOxigeno, idUsuario) VALUES (3, 3);
INSERT INTO OXIGENO (idOxigeno, idUsuario) VALUES (4, 4);
INSERT INTO OXIGENO (idOxigeno, idUsuario) VALUES (5, 5);
INSERT INTO OXIGENO (idOxigeno, idUsuario) VALUES (6, 6);
INSERT INTO OXIGENO (idOxigeno, idUsuario) VALUES (7, 1);
INSERT INTO OXIGENO (idOxigeno, idUsuario) VALUES (8, 2);
INSERT INTO OXIGENO (idOxigeno, idUsuario) VALUES (9, 3);
INSERT INTO OXIGENO (idOxigeno, idUsuario) VALUES (10, 4);
INSERT INTO OXIGENO (idOxigeno, idUsuario) VALUES (11, 5);
INSERT INTO OXIGENO (idOxigeno, idUsuario) VALUES (12, 6);

/* DETALLE OXIGENO */ 
INSERT INTO DETALLEOXIGENO (medicion, idOxigeno)VALUES (97, 1);
INSERT INTO DETALLEOXIGENO (medicion, idOxigeno)VALUES (44, 1);
INSERT INTO DETALLEOXIGENO (medicion, idOxigeno)VALUES (80, 1);
INSERT INTO DETALLEOXIGENO (medicion, idOxigeno)VALUES (95, 1);
INSERT INTO DETALLEOXIGENO (medicion, idOxigeno)VALUES (95, 1);

INSERT INTO DETALLEOXIGENO (medicion, idOxigeno)VALUES (97, 2);
INSERT INTO DETALLEOXIGENO (medicion, idOxigeno)VALUES (91, 2);
INSERT INTO DETALLEOXIGENO (medicion, idOxigeno)VALUES (81, 2);
INSERT INTO DETALLEOXIGENO (medicion, idOxigeno)VALUES (96, 2);
INSERT INTO DETALLEOXIGENO (medicion, idOxigeno)VALUES (98, 2);

INSERT INTO DETALLEOXIGENO (medicion, idOxigeno)VALUES (83, 3);
INSERT INTO DETALLEOXIGENO (medicion, idOxigeno)VALUES (86, 3);
INSERT INTO DETALLEOXIGENO (medicion, idOxigeno)VALUES (84, 3);
INSERT INTO DETALLEOXIGENO (medicion, idOxigeno)VALUES (74, 3);
INSERT INTO DETALLEOXIGENO (medicion, idOxigeno)VALUES (100, 3);

INSERT INTO DETALLEOXIGENO (medicion, idOxigeno)VALUES (74, 4);
INSERT INTO DETALLEOXIGENO (medicion, idOxigeno)VALUES (82, 4);
INSERT INTO DETALLEOXIGENO (medicion, idOxigeno)VALUES (88, 4);
INSERT INTO DETALLEOXIGENO (medicion, idOxigeno)VALUES (89, 4);
INSERT INTO DETALLEOXIGENO (medicion, idOxigeno)VALUES (80, 4);

INSERT INTO DETALLEOXIGENO (medicion, idOxigeno)VALUES (62, 5);
INSERT INTO DETALLEOXIGENO (medicion, idOxigeno)VALUES (76, 5);
INSERT INTO DETALLEOXIGENO (medicion, idOxigeno)VALUES (89, 5);
INSERT INTO DETALLEOXIGENO (medicion, idOxigeno)VALUES (42, 5);
INSERT INTO DETALLEOXIGENO (medicion, idOxigeno)VALUES (40, 5);

INSERT INTO DETALLEOXIGENO (medicion, idOxigeno)VALUES (45, 6);
INSERT INTO DETALLEOXIGENO (medicion, idOxigeno)VALUES (96, 6);
INSERT INTO DETALLEOXIGENO (medicion, idOxigeno)VALUES (52, 6);
INSERT INTO DETALLEOXIGENO (medicion, idOxigeno)VALUES (84, 6);
INSERT INTO DETALLEOXIGENO (medicion, idOxigeno)VALUES (90, 6);

INSERT INTO DETALLEOXIGENO (medicion, idOxigeno)VALUES (74, 7);
INSERT INTO DETALLEOXIGENO (medicion, idOxigeno)VALUES (86, 7);
INSERT INTO DETALLEOXIGENO (medicion, idOxigeno)VALUES (94, 7);
INSERT INTO DETALLEOXIGENO (medicion, idOxigeno)VALUES (82, 7);
INSERT INTO DETALLEOXIGENO (medicion, idOxigeno)VALUES (80, 7);

INSERT INTO DETALLEOXIGENO (medicion, idOxigeno)VALUES (65, 8);
INSERT INTO DETALLEOXIGENO (medicion, idOxigeno)VALUES (95, 8);
INSERT INTO DETALLEOXIGENO (medicion, idOxigeno)VALUES (91, 8);
INSERT INTO DETALLEOXIGENO (medicion, idOxigeno)VALUES (86, 8);
INSERT INTO DETALLEOXIGENO (medicion, idOxigeno)VALUES (73, 8);

INSERT INTO DETALLEOXIGENO (medicion, idOxigeno)VALUES (93, 9);
INSERT INTO DETALLEOXIGENO (medicion, idOxigeno)VALUES (86, 9);
INSERT INTO DETALLEOXIGENO (medicion, idOxigeno)VALUES (83, 9);
INSERT INTO DETALLEOXIGENO (medicion, idOxigeno)VALUES (75, 9);
INSERT INTO DETALLEOXIGENO (medicion, idOxigeno)VALUES (68, 9);

INSERT INTO DETALLEOXIGENO (medicion, idOxigeno)VALUES (88, 10);
INSERT INTO DETALLEOXIGENO (medicion, idOxigeno)VALUES (73, 10);
INSERT INTO DETALLEOXIGENO (medicion, idOxigeno)VALUES (69, 10);
INSERT INTO DETALLEOXIGENO (medicion, idOxigeno)VALUES (91, 10);
INSERT INTO DETALLEOXIGENO (medicion, idOxigeno)VALUES (90, 10);

INSERT INTO DETALLEOXIGENO (medicion, idOxigeno)VALUES (85, 11);
INSERT INTO DETALLEOXIGENO (medicion, idOxigeno)VALUES (87, 11);
INSERT INTO DETALLEOXIGENO (medicion, idOxigeno)VALUES (52, 11);
INSERT INTO DETALLEOXIGENO (medicion, idOxigeno)VALUES (61, 11);
INSERT INTO DETALLEOXIGENO (medicion, idOxigeno)VALUES (79, 11);

INSERT INTO DETALLEOXIGENO (medicion, idOxigeno)VALUES (84, 12);
INSERT INTO DETALLEOXIGENO (medicion, idOxigeno)VALUES (82, 12);
INSERT INTO DETALLEOXIGENO (medicion, idOxigeno)VALUES (94, 12);
INSERT INTO DETALLEOXIGENO (medicion, idOxigeno)VALUES (65, 12);
INSERT INTO DETALLEOXIGENO (medicion, idOxigeno)VALUES (76, 12);

/*TEMPERATURA */ 

INSERT INTO TEMPERATURA (idTemperatura, idUsuario) VALUES (1, 1); 
INSERT INTO TEMPERATURA (idTemperatura, idUsuario) VALUES (2, 2); 
INSERT INTO TEMPERATURA (idTemperatura, idUsuario) VALUES (3, 3); 
INSERT INTO TEMPERATURA (idTemperatura, idUsuario) VALUES (4, 4); 
INSERT INTO TEMPERATURA (idTemperatura, idUsuario) VALUES (5, 5); 
INSERT INTO TEMPERATURA (idTemperatura, idUsuario) VALUES (6, 6); 
INSERT INTO TEMPERATURA (idTemperatura, idUsuario) VALUES (7, 1); 
INSERT INTO TEMPERATURA (idTemperatura, idUsuario) VALUES (8, 2); 
INSERT INTO TEMPERATURA (idTemperatura, idUsuario) VALUES (9, 3); 
INSERT INTO TEMPERATURA (idTemperatura, idUsuario) VALUES (10, 4); 
INSERT INTO TEMPERATURA (idTemperatura, idUsuario) VALUES (11, 5); 
INSERT INTO TEMPERATURA (idTemperatura, idUsuario) VALUES (12, 6);  

/* DETALLE TEMPERATURA */ 

INSERT INTO DETALLETEMPERATURA (medicion, idTemperatura) VALUES (34.66, 1); 
INSERT INTO DETALLETEMPERATURA (medicion, idTemperatura) VALUES (38.68, 1); 
INSERT INTO DETALLETEMPERATURA (medicion, idTemperatura) VALUES (34.91, 1); 
INSERT INTO DETALLETEMPERATURA (medicion, idTemperatura) VALUES (38.71, 1); 
INSERT INTO DETALLETEMPERATURA (medicion, idTemperatura) VALUES (33.21, 1); 

INSERT INTO DETALLETEMPERATURA (medicion, idTemperatura) VALUES (33.93, 2); 
INSERT INTO DETALLETEMPERATURA (medicion, idTemperatura) VALUES (39.85, 2); 
INSERT INTO DETALLETEMPERATURA (medicion, idTemperatura) VALUES (37.85, 2); 
INSERT INTO DETALLETEMPERATURA (medicion, idTemperatura) VALUES (39.78, 2); 
INSERT INTO DETALLETEMPERATURA (medicion, idTemperatura) VALUES (36.43, 2); 

INSERT INTO DETALLETEMPERATURA (medicion, idTemperatura) VALUES (36.67, 3); 
INSERT INTO DETALLETEMPERATURA (medicion, idTemperatura) VALUES (37.52, 3); 
INSERT INTO DETALLETEMPERATURA (medicion, idTemperatura) VALUES (33.30, 3); 
INSERT INTO DETALLETEMPERATURA (medicion, idTemperatura) VALUES (34.52, 3); 
INSERT INTO DETALLETEMPERATURA (medicion, idTemperatura) VALUES (35.42, 3); 

INSERT INTO DETALLETEMPERATURA (medicion, idTemperatura) VALUES (35.74, 4); 
INSERT INTO DETALLETEMPERATURA (medicion, idTemperatura) VALUES (35.62, 4); 
INSERT INTO DETALLETEMPERATURA (medicion, idTemperatura) VALUES (34.05, 4); 
INSERT INTO DETALLETEMPERATURA (medicion, idTemperatura) VALUES (37.48, 4); 
INSERT INTO DETALLETEMPERATURA (medicion, idTemperatura) VALUES (34.56, 4); 

INSERT INTO DETALLETEMPERATURA (medicion, idTemperatura) VALUES (39.45, 5); 
INSERT INTO DETALLETEMPERATURA (medicion, idTemperatura) VALUES (37.42, 5); 
INSERT INTO DETALLETEMPERATURA (medicion, idTemperatura) VALUES (36.93, 5); 
INSERT INTO DETALLETEMPERATURA (medicion, idTemperatura) VALUES (38.52, 5); 
INSERT INTO DETALLETEMPERATURA (medicion, idTemperatura) VALUES (41.52, 5); 

INSERT INTO DETALLETEMPERATURA (medicion, idTemperatura) VALUES (40.00, 6); 
INSERT INTO DETALLETEMPERATURA (medicion, idTemperatura) VALUES (39.23, 6); 
INSERT INTO DETALLETEMPERATURA (medicion, idTemperatura) VALUES (38.52, 6); 
INSERT INTO DETALLETEMPERATURA (medicion, idTemperatura) VALUES (34.66, 6); 
INSERT INTO DETALLETEMPERATURA (medicion, idTemperatura) VALUES (32.64, 6); 

INSERT INTO DETALLETEMPERATURA (medicion, idTemperatura) VALUES (35.62, 7); 
INSERT INTO DETALLETEMPERATURA (medicion, idTemperatura) VALUES (36.42, 7); 
INSERT INTO DETALLETEMPERATURA (medicion, idTemperatura) VALUES (37.69, 7); 
INSERT INTO DETALLETEMPERATURA (medicion, idTemperatura) VALUES (38.12, 7); 
INSERT INTO DETALLETEMPERATURA (medicion, idTemperatura) VALUES (34.52, 7); 

INSERT INTO DETALLETEMPERATURA (medicion, idTemperatura) VALUES (34.15, 8); 
INSERT INTO DETALLETEMPERATURA (medicion, idTemperatura) VALUES (36.52, 8); 
INSERT INTO DETALLETEMPERATURA (medicion, idTemperatura) VALUES (37.49, 8); 
INSERT INTO DETALLETEMPERATURA (medicion, idTemperatura) VALUES (35.26, 8); 
INSERT INTO DETALLETEMPERATURA (medicion, idTemperatura) VALUES (36.13, 8); 

INSERT INTO DETALLETEMPERATURA (medicion, idTemperatura) VALUES (36.28, 9); 
INSERT INTO DETALLETEMPERATURA (medicion, idTemperatura) VALUES (33.88, 9); 
INSERT INTO DETALLETEMPERATURA (medicion, idTemperatura) VALUES (37.89, 9); 
INSERT INTO DETALLETEMPERATURA (medicion, idTemperatura) VALUES (33.98, 9); 
INSERT INTO DETALLETEMPERATURA (medicion, idTemperatura) VALUES (34.78, 9); 

INSERT INTO DETALLETEMPERATURA (medicion, idTemperatura) VALUES (38.02, 10); 
INSERT INTO DETALLETEMPERATURA (medicion, idTemperatura) VALUES (32.74, 10); 
INSERT INTO DETALLETEMPERATURA (medicion, idTemperatura) VALUES (38.63, 10); 
INSERT INTO DETALLETEMPERATURA (medicion, idTemperatura) VALUES (32.98, 10); 
INSERT INTO DETALLETEMPERATURA (medicion, idTemperatura) VALUES (35.04, 10); 

INSERT INTO DETALLETEMPERATURA (medicion, idTemperatura) VALUES (34.91, 11); 
INSERT INTO DETALLETEMPERATURA (medicion, idTemperatura) VALUES (36.56, 11); 
INSERT INTO DETALLETEMPERATURA (medicion, idTemperatura) VALUES (32.83, 11); 
INSERT INTO DETALLETEMPERATURA (medicion, idTemperatura) VALUES (34.93, 11); 
INSERT INTO DETALLETEMPERATURA (medicion, idTemperatura) VALUES (38.04, 11); 

INSERT INTO DETALLETEMPERATURA (medicion, idTemperatura) VALUES (36.65, 12); 
INSERT INTO DETALLETEMPERATURA (medicion, idTemperatura) VALUES (38.66, 12); 
INSERT INTO DETALLETEMPERATURA (medicion, idTemperatura) VALUES (39.37, 12); 
INSERT INTO DETALLETEMPERATURA (medicion, idTemperatura) VALUES (35.73, 12); 
INSERT INTO DETALLETEMPERATURA (medicion, idTemperatura) VALUES (36.75, 12); 


SELECT * FROM USUARIO; 
SELECT * FROM COACH; 
SELECT * FROM RITMOCARDIACO ORDER BY idritmo ASC; 
SELECT * FROM DETALLERITMO WHERE idRitmo = 1;
SELECT * FROM OXIGENO ORDER BY idoxigeno ASC; 
SELECT * FROM DETALLEOXIGENO; 
SELECT * FROM TEMPERATURA;
SELECT * FROM DETALLETEMPERATURA; 

SELECT dr.idritmo, dr.iddetalleritmo, dr.medicion 
FROM detalleritmo dr, (
  SELECT rc.idritmo, rc.medicion, 
    u.nombre, u.apellido 
  FROM RitmoCardiaco rc, Usuario u 
  WHERE rc.idusuario = 1
  ORDER BY rc.idritmo DESC 
  FETCH NEXT 1 ROWS ONLY
) a 
WHERE dr.idritmo = a.idritmo
ORDER BY dr.iddetalleritmo ASC; 

SELECT do.idoxigeno, do.iddetalleoxigeno, do.medicion
FROM detalleoxigeno do, 
    (   
        SELECT  o.idoxigeno FROM Oxigeno o, usuario u 
        WHERE o.idusuario = 1 
        ORDER BY o.idoxigeno DESC 
        FETCH NEXT 1 ROWS ONLY
    ) a
WHERE do.idoxigeno = a.idoxigeno
ORDER BY do.iddetalleoxigeno ASC;


/* Total de Repeticiones por Test de un Usuario*/ 
SELECT t.idTest, t.fechaInicio, t.estado, COUNT(r.idRepeticion) AS TotalRepeticiones
FROM TEST t, REPETICION r
WHERE t.idUsuario = 3 AND t.idTest = r.idTest
GROUP BY t.idTest, t.fechaInicio, t.estado
ORDER BY t.fechaInicio;


/* Reporte de Repeticiones por Semana */ 