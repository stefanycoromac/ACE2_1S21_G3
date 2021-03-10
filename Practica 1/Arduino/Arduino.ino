const int BTPWR = 12;

/* Temperatura */
#define sensorTemperatura 0
float entradaTemp, celsiusTemp;
String temp;
/* END Temperatura */

/* Oxigeno y Latidos */
#include <Wire.h>
#include "MAX30105.h"
#include "spo2_algorithm.h"

MAX30105 particleSensor;

#define MAX_BRIGHTNESS 255
const int MAXPWR = 5;

uint32_t irBuffer[100];  // infrared LED sensor data
uint32_t redBuffer[100]; // red LED sensor data
int32_t bufferLength;

int32_t spo2;
int8_t validSPO2;

int32_t heartRate;
int8_t validHeartRate;

String oxigeno;
float oxigenoValor = 0;

String latidos;
float latidosValor = 0;
/* END  Oxigeno y Latidos */

/* Login */
char entrada = 'f';
boolean logueado = false;
/* END Login */

void setup()
{
  Serial.begin(9600);

  pinMode(BTPWR, OUTPUT);
  digitalWrite(BTPWR, HIGH);

  pinMode(MAXPWR, OUTPUT);
  digitalWrite(MAXPWR, LOW);
}

void loop()
{
  verificarLogin();

  if (logueado)
  {
    realizarMediciones();
  }
}

void medirTemperatura()
{
  Serial.begin(9600);

  entradaTemp = analogRead(sensorTemperatura);
  celsiusTemp = (5 * entradaTemp * 100) / 1024;

  if (celsiusTemp > 0)
  {
    temp = "T;" + (String)celsiusTemp;
    enviarDatos(temp);
    delay(1000);
  }
}

void inicializacionSensor()
{
  digitalWrite(MAXPWR, HIGH);

  if (!particleSensor.begin(Wire, I2C_SPEED_FAST))
  {
    while (1)
      ;
  }

  particleSensor.setup(60, 4, 2, 100, 411, 4096);
}

void realizarMediciones()
{
  Serial.begin(115200);

  inicializacionSensor();
  bufferLength = 100;

  for (byte i = 0; i < bufferLength; i++)
  {
    while (particleSensor.available() == false)
      particleSensor.check();

    redBuffer[i] = particleSensor.getRed();
    irBuffer[i] = particleSensor.getIR();
    particleSensor.nextSample();

    Serial.print(F("red="));
    Serial.print(redBuffer[i], DEC);
    Serial.print(F(", ir="));
    Serial.println(irBuffer[i], DEC);
  }
  maxim_heart_rate_and_oxygen_saturation(irBuffer, bufferLength, redBuffer, &spo2, &validSPO2, &heartRate, &validHeartRate);

  while (logueado)
  {
    for (byte i = 25; i < 100; i++)
    {
      redBuffer[i - 25] = redBuffer[i];
      irBuffer[i - 25] = irBuffer[i];
    }

    for (byte i = 75; i < 100; i++)
    {
      while (particleSensor.available() == false)
        particleSensor.check();

      redBuffer[i] = particleSensor.getRed();
      irBuffer[i] = particleSensor.getIR();
      particleSensor.nextSample();
    }

    maxim_heart_rate_and_oxygen_saturation(irBuffer, bufferLength, redBuffer, &spo2, &validSPO2, &heartRate, &validHeartRate);

    if (validHeartRate == 1)
    {
      if (heartRate > 100)
      {
        heartRate = heartRate - (heartRate * 0.2);
      }

      latidos = "L;" + (String)heartRate;
      enviarDatos(latidos);
      delay(1000);
    }

    if (validSPO2 == 1)
    {
      oxigeno = "O;" + (String)spo2;
      enviarDatos(oxigeno);
      delay(1000);
    }

    medirTemperatura();
    delay(1000);
  }
  
  digitalWrite(MAXPWR, LOW);
}

void verificarLogin()
{
  entrada = Serial.read();
  if (entrada == 'v')
  {
    logueado = true;
  }
  
  if (entrada == 'f')
  {
    logueado = false;
  }
}

void enviarDatos(String cadena)
{
  Serial.begin(9600);
  Serial.print(cadena);
}
