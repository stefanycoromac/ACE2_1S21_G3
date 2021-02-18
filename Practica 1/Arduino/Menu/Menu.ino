#define sensorTemperatura 0 //Un pin análogo no se cual 

boolean logueado = false;
char entrada = 'f';
//TEMPERATURA
int entradaTemp, celsiusTemp;
//Oxigeno y Ritmo Cardiaco

void setup() {
  Serial.begin(9600);
}

void loop() {
  /*No sabía si era necesario un login
    o solamente el menu porque igual hasta que no este
    dentro de la app no puede mandar a pedir las mediciones*/
  delay(1000);
  entrada = Serial.read();
  //Mandar una v de autenticación
  if (entrada = 'v') {
    logueado = true;
  }

  while (logueado) {
    while (Serial.available()) {
      delay(10);
      entrada = Serial.read();
      // A -> Lectura de oxigeno y pulsaciones
      // B -> Lectura de temperatura *Si no es en tiempo real*
      // C -> Cerrar Sesion
      if (entrada = 'A') {
        OxigenoPulsaciones();
      } else if (entrada = 'B') {
        medirTemperatura();
      } else if (entrada = 'c') {
        logueado = false;
        break;
      }
      //medirTemperatura(); *Si es en tiempo real*
    }
  }
}

void OxigenoPulsaciones() {
  
}

void medirTemperatura() {
entradaTemp = analogRead(sensorTemperatura);
celsiusTemp = (5*entradaTemp*100)/1024;
Serial.println(celsiusTemp);
delay(1000);
}
