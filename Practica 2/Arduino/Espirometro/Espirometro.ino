const int BTPWR = 5;
char entrada = 'f';
boolean inicio = false;

volatile int NumPulsos;
int PinSensor = 2;
float factor_conversion = 7.11;
float volumen_inhalado = 0, volumen_exhalado = 0, volumen_real = 0, volumen = 0, prev_volumen = 0, caudal_L_m = 0, prev_caudal_L_m = 0, frecuencia ;
String real, totalE, totalI;
long dt = 0;
long t0 = 0;
boolean exhale = true;

unsigned long previousMillis = 0;
unsigned long currentMillis = 0;
const long interval = 60000;


void setup() {
  Serial.begin(9600);

  pinMode(BTPWR, OUTPUT);
  digitalWrite(BTPWR, HIGH);

  pinMode(13, OUTPUT);
  digitalWrite(13, LOW);

  Serial.begin(9600);
  pinMode(PinSensor, INPUT);
  attachInterrupt(0, ContarPulsos, RISING);
  t0 = millis();
}

void loop() {

  volumen_inhalado = 0;
  volumen_exhalado = 0;
  volumen_real = 0;
  volumen = 0;

  while (inicio) {
    verificarInicio();
    espirometro();
    finalizar();
  }

  verificarInicio();

}

void verificarInicio()
{
  entrada = Serial.read();
  if (entrada == 'v' || entrada == 65)
  {
    previousMillis = millis();
    inicio = true;
    digitalWrite(13, HIGH);

  } else {
    Serial.print(';');
    Serial.print(" ");
  }
}

void espirometro() {
  frecuencia = ObtenerFrecuecia();
  caudal_L_m = frecuencia / factor_conversion;
  dt = millis() - t0;
  t0 = millis();
  volumen = (caudal_L_m / 60) * (dt / 1000);
  if (caudal_L_m == 0 and prev_caudal_L_m > 0) {
    if (exhale) {
      totalE = ";" + (String) volumen_exhalado, 3;
      enviarDatos(totalE);
      Serial.print("\n");
      volumen_exhalado = 0;
    } else {
      totalI = ";" + (String) volumen_inhalado, 3;
      enviarDatos(totalI);
      Serial.print("\n");
      volumen_inhalado = 0;
    }
    exhale = !exhale;

  }
  if (exhale) {
    volumen_real = volumen_real - volumen;
    volumen_exhalado = volumen_exhalado + volumen;
  } else {
    volumen_real = volumen_real + volumen;
    volumen_inhalado = volumen_inhalado + volumen;
  }

  real = ";R;" + (String) volumen_real, 3;
  enviarDatos(real);

  prev_caudal_L_m = caudal_L_m, 3;
}

void ContarPulsos ()
{
  NumPulsos++;
}

int ObtenerFrecuecia()
{
  int frecuencia;
  NumPulsos = 0;
  interrupts();
  delay(1000);
  noInterrupts();
  frecuencia = NumPulsos;
  return frecuencia;
}

void finalizar() {

  currentMillis = millis();

  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;
    inicio = false;
    enviarDatos(";O;");
    digitalWrite(13, LOW);
  }
}

void enviarDatos(String cadena)
{
  Serial.print(cadena);
  delay(500);
}
