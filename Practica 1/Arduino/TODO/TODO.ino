#include <Wire.h>
#include "MAX30105.h"
#include "spo2_algorithm.h"

/* LOGIN */
boolean logueado = false;
char entrada = 'f';
/* END LOGIN */

/* TEMPERATURA */
#define sensorTemperatura 0
float entradaTemp, celsiusTemp;
/* END TEMPERATURA */

/* OXIGENO Y RITMO CARDIACO */
MAX30105 particleSensor;

#define MAX_BRIGHTNESS 255

uint32_t irBuffer[100];  // infrared LED sensor data
uint32_t redBuffer[100]; // red LED sensor data

int32_t bufferLength;
int32_t spo2;
int8_t validSPO2;
int32_t heartRate;
int8_t validHeartRate;
/* END OXIGENO Y RITMO CARDIACO */

void setup()
{
  Serial.begin(9600); // Serial.begin(115200);

  //inicializacionSensor();
}

void loop()
{
  /*
    No sabía si era necesario un login
    o solamente el menu porque igual hasta que no este
    dentro de la app no puede mandar a pedir las mediciones  
  */
  delay(1000);
  entrada = Serial.read();

  // Mandar una v de autenticación
  if (entrada = 'v')
  {
    logueado = true;
  }

  // logueado = true; //DESCOMENTAR para probar
  while (logueado)
  {
    Serial.println("LOGUEADO");

    while (Serial.available())
    { //COMENTAR PARA PROBAR

      //while (true)
      //{ //DESCOMENTAR PARA PROBAR
      delay(10);
      entrada = Serial.read(); //COMENTAR PARA PROBAR
      entrada = 'B';           //CAMBIAR LETRA PARA PROBAR

      // A -> Lectura de oxigeno y pulsaciones
      // B -> Lectura de temperatura *Si no es en tiempo real*
      // C -> Cerrar Sesion
      if (entrada == 'A')
      {
        OxigenoPulsaciones();
      }
      else if (entrada == 'B')
      {
        medirTemperatura();
      }
      else if (entrada == 'c')
      {
        logueado = false;
        break;
      }
      //medirTemperatura(); *Si es en tiempo real*
    }
  }
}

void OxigenoPulsaciones()
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

  while (1)
  {
    for (byte i = 25; i < 100; i++)
    {
      redBuffer[i - 25] = redBuffer[i];
      irBuffer[i - 25] = irBuffer[i];
    }

    for (byte i = 75; i < 100; i++)
    {
      while (particleSensor.available() == false) //do we have new data?
        particleSensor.check();                   //Check the sensor for new data

      redBuffer[i] = particleSensor.getRed();
      irBuffer[i] = particleSensor.getIR();
      particleSensor.nextSample(); //We're finished with this sample so move to next sample
    }

    maxim_heart_rate_and_oxygen_saturation(irBuffer, bufferLength, redBuffer, &spo2, &validSPO2, &heartRate, &validHeartRate);

    Serial.print(F("HR="));
    Serial.print(heartRate, DEC);

    Serial.print(F(", HRvalid="));
    Serial.print(validHeartRate, DEC);

    Serial.print(F(", SPO2="));
    Serial.print(spo2, DEC);

    Serial.print(F(", SPO2Valid="));
    Serial.println(validSPO2, DEC);
  }
}

void inicializacionSensor()
{
  if (!particleSensor.begin(Wire, I2C_SPEED_FAST))
  {
    Serial.println(F("MAX30105 was not found. Please check wiring/power."));
    while (1)
      ;
  }

  Serial.println(F("Attach sensor to finger with rubber band. Press any key to start conversion"));
  while (Serial.available() == 0)
    ;
  Serial.read();

  particleSensor.setup(60, 4, 2, 100, 411, 4096);
}

void medirTemperatura()
{
  Serial.begin(9600);
  entradaTemp = analogRead(sensorTemperatura);
  celsiusTemp = (5 * entradaTemp * 100) / 1024;
  Serial.println(celsiusTemp);
  delay(2000);
}
