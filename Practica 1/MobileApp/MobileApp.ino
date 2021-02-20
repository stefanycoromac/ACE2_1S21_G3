/* Temperatura */
#define sensorTemperatura 0
float entradaTemp, celsiusTemp;
String temp = "°C";
/* END Temperatura */

/* Oxigeno y Latidos */
String oxigeno;
float oxigenoValor = 90;
String latidos;
float latidosValor = 80;
/* END  Oxigeno y Latidos */

/* Login */
const int loginLed = 13;
char entrada = 'f';
boolean logueado = false;
/* END Login */

void setup() {
  Serial.begin(9600);
  pinMode(loginLed, OUTPUT);
}

void loop() {
  verificarLogin();

  while (logueado) {
    medirTemperatura();
    medirOxigenoPulso();
    verificarLogin();
  }
}

void medirTemperatura()
{
  entradaTemp = analogRead(sensorTemperatura);
  celsiusTemp = (5 * entradaTemp * 100) / 1024;
  temp = (String) celsiusTemp + " °C";
  Serial.println(temp);
  delay(100);
}

void medirOxigenoPulso() {
  latidosValor = latidosValor +1;
  latidos = "L;" + (String) latidosValor;
  Serial.println(latidos);
  delay(500);
  oxigenoValor = oxigenoValor + 2;
  oxigeno = "O;" + (String) oxigenoValor;
  Serial.println(oxigeno);
  delay(500);
}

void verificarLogin() {
  entrada = Serial.read();
  if (entrada == 'v') {
    logueado = true;
    digitalWrite(loginLed, HIGH);
  }
  if (entrada == 'f') {
    logueado = false;
    digitalWrite(loginLed, LOW);
  }
}
