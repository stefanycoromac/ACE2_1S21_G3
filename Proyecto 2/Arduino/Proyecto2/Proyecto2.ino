const int BTPWR = 12;

char entrada = 'f';
boolean iniciar = false;

#include <MPU9250_asukiaaa.h>

MPU9250_asukiaaa mySensor;

float aY = 0.00, aYPrevio = 0.00;
int pasos = 0, pasosAux = 0;

const int BuzzPin =  11;

#define sensorTemperatura 0
float entradaTemp, celsiusTemp;

#include <Wire.h>
#include "MAX30105.h"
#include "spo2_algorithm.h"

MAX30105 particleSensor;

#define MAX_BRIGHTNESS 255
const int MAXPWR = 5;

uint32_t irBuffer[100];
uint32_t redBuffer[100];
int32_t bufferLength;

int32_t spo2;
int8_t validSPO2;

int32_t heartRate;
int8_t validHeartRate;

float oxigenoValor = 0;

float latidosValor = 0;

void setup()
{
  Serial.begin(9600);

  pinMode(MAXPWR, OUTPUT);
  digitalWrite(MAXPWR, LOW);

  pinMode(BuzzPin, OUTPUT);
  digitalWrite(BuzzPin, HIGH);

#ifdef _ESP32_HAL_I2C_H_
  Wire.begin(SDA_PIN, SCL_PIN);
  mySensor.setWire(&Wire);
#endif
  mySensor.beginAccel();

  pinMode(BTPWR, OUTPUT);
  digitalWrite(BTPWR, HIGH);
}

void loop()
{
  verificar();

  if (iniciar)
  {
    realizarMediciones();
  }
}

void verificar()
{
  entrada = Serial.read();

  if (entrada == 'v')
  {
    iniciar = true;
  }

  if (entrada == 'f')
  {
    buzzer();
    iniciar = false;
  }
}

void buzzer() {
  digitalWrite(BuzzPin, LOW);
  delay(3000);
  digitalWrite(BuzzPin, HIGH);
  pasos = 0;
  aYPrevio = 0.00;
}

void enviarDatos(String cadena)
{
  Serial.begin(9600);
  Serial.print(cadena);
  delay(1000);
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

  while (iniciar)
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
        heartRate = heartRate - (heartRate * 0.3);
      }
      enviarDatos("L;" + (String)heartRate);
    }

    if (validSPO2 == 1)
    {
      enviarDatos("O;" + (String)spo2);
    }

    medirTemperatura();
    contarPasos();
    calcularCalorias();
    verificar();
  }

  digitalWrite(MAXPWR, LOW);
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

void medirTemperatura()
{
  entradaTemp = analogRead(sensorTemperatura);
  celsiusTemp = (5 * entradaTemp * 100) / 1024;

  if (celsiusTemp > 0)
  {
    enviarDatos("T;" + (String)celsiusTemp);
  }
}

void contarPasos()
{
  if (mySensor.accelUpdate() == 0) {
    aY = mySensor.accelY();

    if (aY >= 0.30 && aY <= 0.75) {
      if (aYPrevio >= 0.80 && aYPrevio <= 0.98) {
        pasos = pasos + 1;
      }
      aYPrevio = aY;
    } else if (aY >= 0.80 && aY <= 0.98) {
      if (aYPrevio >= 0.30 && aYPrevio <= 0.75) {
        pasos = pasos + 1;
      }
      aYPrevio = aY;
    }
    enviarDatos("P;" + String(5));
  }
}

void calcularCalorias() {
  enviarDatos("C;" + String(6));
}
