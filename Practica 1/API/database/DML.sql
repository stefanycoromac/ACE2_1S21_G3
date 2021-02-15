/* USUARIOS */

INSERT INTO USUARIO (IDUSUARIO, NOMBRE, APELLIDO, EDAD, GENERO, 
    PESO, ESTATURA, TIPO, NICKNAME, CONTRASENIA) 
    VALUES (1, 'Dan', 'Reynolds', 33, 1, 170.00, 
        1.95, 0, 'dare', '1234');
    
INSERT INTO USUARIO (IDUSUARIO, NOMBRE, APELLIDO, EDAD, GENERO, 
        PESO, ESTATURA, TIPO, NICKNAME, CONTRASENIA) 
    VALUES (2, 'Damien', 'Rice', 47, 1, 150.00, 
        1.80, 0, 'dari', '1234');

INSERT INTO USUARIO (IDUSUARIO, NOMBRE, APELLIDO, EDAD, GENERO, 
        PESO, ESTATURA, TIPO, NICKNAME, CONTRASENIA) 
    VALUES (3, 'Avril', 'Lavigne', 36 , 0, 110.23, 
        1.57, 0, 'avla', '1234');

INSERT INTO USUARIO (IDUSUARIO, NOMBRE, APELLIDO, EDAD, GENERO, 
        PESO, ESTATURA, TIPO, NICKNAME, CONTRASENIA) 
    VALUES (4, 'Robert', 'Lewandowski', 32, 1, 176.37, 
        1.84, 0, 'rolew', '1234');

INSERT INTO USUARIO (IDUSUARIO, NOMBRE, APELLIDO, EDAD, GENERO, 
        PESO, ESTATURA, TIPO, NICKNAME, CONTRASENIA) 
    VALUES (5, 'Jurgen', 'Klopp', 53, 1, 182.98, 
        1.91, 1, 'jukl', '1234');

INSERT INTO USUARIO (IDUSUARIO, NOMBRE, APELLIDO, EDAD, GENERO, 
        PESO, ESTATURA, TIPO, NICKNAME, CONTRASENIA) 
    VALUES (6, 'Alex', 'Morgan', 31, 1, 136.68, 
        1.70, 1, 'almo', '1234');

/* COACH */
INSERT INTO COACH (IDATLETA, IDENTRENADOR) VALUES (1, 5);
INSERT INTO COACH (IDATLETA, IDENTRENADOR) VALUES (2, 5);
INSERT INTO COACH (IDATLETA, IDENTRENADOR) VALUES (4, 5);
INSERT INTO COACH (IDATLETA, IDENTRENADOR) VALUES (3, 6);

SELECT * FROM USUARIO; 
SELECT * FROM COACH; 
SELECT * FROM RITMOCARDIACO; 
SELECT * FROM DETALLERITMO;
SELECT * FROM OXIGENO; 
SELECT * FROM DETALLEOXIGENO; 
SELECT * FROM TEMPERATURA;
SELECT * FROM DETALLETEMPERATURA; 

SELECT dr.idritmo, dr.iddetalleritmo, dr.medicion 
FROM detalleritmo dr, (
  SELECT rc.idritmo, rc.medicion, 
    u.nombre, u.apellido 
  FROM RitmoCardiaco rc, Usuario u 
  WHERE rc.idusuario = '1'
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