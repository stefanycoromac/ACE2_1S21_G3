const int BTPWR = 12;
/*#include <SoftwareSerial.h>
  SoftwareSerial hc06(18, 19);*/
/* Temperatura */
#define sensorTemperatura 0
float entradaTemp, celsiusTemp;
String temp;
/* END Temperatura */

/* Oxigeno y Latidos */
String oxigeno;
float oxigenoValor = 80;
String latidos;
float latidosValor = 75;
/* END  Oxigeno y Latidos */

/* Login */
const int loginLed = 13;
char entrada = 'f';
boolean logueado = false;
/* END Login */

void setup() {
  pinMode(BTPWR,OUTPUT);
  digitalWrite(BTPWR,HIGH);
  Serial.begin(9600);
  //hc06.begin(9600);
  pinMode(loginLed, OUTPUT);
}

void loop() {
  verificarLogin();
  if (logueado) {
    medirTemperatura();
    medirOxigenoPulso();
  }
}

void medirTemperatura()
{
  entradaTemp = analogRead(sensorTemperatura);
  celsiusTemp = (5 * entradaTemp * 100) / 1024;
  temp = "T;" + (String) celsiusTemp;
  enviarDatos(temp);
  delay(1000);
}

void medirOxigenoPulso() {
  latidosValor = latidosValor + 1;
  latidos = "L;" + (String) latidosValor;
  enviarDatos(latidos);
  delay(500);
  oxigenoValor = oxigenoValor + 1;
  oxigeno = "O;" + (String) oxigenoValor;
  enviarDatos(oxigeno);
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

void enviarDatos(String cadena) {
  Serial.print(cadena);
  /*for (char x : cadena) {
    Serial.println(x);
    }*/
}
