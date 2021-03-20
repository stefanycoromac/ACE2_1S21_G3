//Sonar cada minuto para contar las repeticiones
/*VCC - 5V
I/O - pin 13
pin GND - GND 
*/

int buzzer = 13;
void setup() {
pinMode(buzzer, OUTPUT);
}
void loop() {
digitalWrite(buzzer, HIGH);
delay(60000);
digitalWrite(buzzer, LOW);
delay(1000);
}
