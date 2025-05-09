#include <SoftwareSerial.h>

// #define RxD 2
// #define TxD 3

SoftwareSerial BLE(2, 3);

const int GSR = A0;
int sensorValue = 0;
int gsr_average = 0;
int MoPin1 = 4;
//int MoPin2 = 3;
int MoPin3 = 8;
int MoPin4 = 7;
int MoPin5 = 6;
int MoPin6 = 5;
int numLoops = 0;
int userBaseline = 0;

String receivedData = ""; // To store the incoming string

static int setupCount = 0;


// //for calculating vibration interval
// unsigned long previousMillis = 0;
// const long interval = 5000;
// const int betweenReadings = 500;


void setup() {

  Serial.begin(9600);

  //setupCount++;
  //Serial.println("Setup run count: " + String(setupCount));

  // Start BLE communication
  BLE.begin(9600);
  Serial.println("Initializing BLE Module...");
  BLE.println("Initializing BLE Module...");

  BLE.print("AT+CLEAR"); //clear all previous setting
  BLE.print("AT+ROLE0"); //set the bluetooth name as a slaver
  BLE.print("AT+SAVE1");  //don't save the connect information
  BLE.println("AT+NAMESlinky");

  // BLE Setup commands
  // BLE.print("AT+CLEAR"); //clear all previous setting
  // delay(100);
  // BLE.println("AT+ROLE0");  // Set BLE as peripheral
  // delay(100);
  // BLE.println("AT+IMME1"); // Enable manual connection mode
  //delay(100);
  // BLE.println("AT+NAME=MyDevice"); // Set the BLE device name
  //BLE.println("AT+NAME?");
  delay(100);

  while (BLE.available()) {
    char c = BLE.read(); // Read the response
    Serial.println(c);  // Print the response to Serial Monitor
  }
  BLE.flush(); // Clear BLE's internal buffer

  BLE.println("AT+START"); // Start advertising
  delay(100);
  
  Serial.println("BLE Module Ready. Waiting for connection...");
  
  pinMode(MoPin1,OUTPUT);
  //pinMode(MoPin2,OUTPUT);
  pinMode(MoPin3,OUTPUT);
  //pinMode(MoPin4,OUTPUT);
  //pinMode(MoPin5,OUTPUT);
  //pinMode(MoPin6,OUTPUT);


  Serial.println("Starting 10 second baseline calibration. Please place Slinky around neck.");
  BLE.println("Starting 10 second baseline calibration. Please place Slinky around neck.");
  // delay(100);

  long sum = 0;
  for (int i=0; i < 50; i++) {
    sensorValue = analogRead(GSR);
    sum += sensorValue;
    delay(200);
  }
  Serial.println("Finished 10 second baseline calibration...");
  BLE.println("Finished 10 second baseline calibration...");


  userBaseline = sum/50;
}


void loop() {

  // Receive data from the Bluetooth module
  if (BLE.available()) {
    char receivedChar;
    while (BLE.available()) {
      receivedChar = BLE.read();   // Read one character at a time
      if (receivedChar == '\n') { // End of the string
        break;
      }
      receivedData += receivedChar; // Append to the string
    }

    if (receivedData.length() > 0) {
      Serial.println("Received from BLE: " + receivedData); // Print the complete string
      receivedData = ""; // Clear the buffer for the next string
    }
  }

  // Send data from the Serial Monitor to the Bluetooth module
  String sendData = "";
  while (Serial.available()) {
    char sendChar = Serial.read(); // Read one character at a time
    if (sendChar == '\n') { // End of the string
      break;
    }
    sendData += sendChar; // Append to the string
  }

  if (sendData.length() > 0) {
    BLE.println(sendData); // Send the complete string
    Serial.println("Sent to BLE: " + sendData); // Optional feedback to the Serial Monitor
    delay(100);
  }

  long sum=0;
  for (int i=0; i < 20; i++) {
    sensorValue = analogRead(GSR);
    sum += sensorValue;
    delay(50);
  }


  gsr_average = sum/20;


  int variance;
  variance = gsr_average - userBaseline;

  // Send GSR value over BLE
  //String data = "GSR:" + String(variance) + "\n";
  //BLE.print(data);


  if (abs(variance) > 100) {
    digitalWrite(MoPin1, HIGH);
    //digitalWrite(MoPin2, HIGH);
    digitalWrite(MoPin3, HIGH);
    //digitalWrite(MoPin4, HIGH);
    //digitalWrite(MoPin5, HIGH);
    //digitalWrite(MoPin6, HIGH);
    String data = "Variance:" + String(variance) + "\n";
    BLE.print(data);
    delay(200);
    //delay(5);
  }
    else if (abs(variance) <= 100) {
    digitalWrite(MoPin1, LOW);
    //digitalWrite(MoPin2, LOW);
    digitalWrite(MoPin3, LOW);
    //digitalWrite(MoPin4, LOW);
    //digitalWrite(MoPin5, LOW);
    //digitalWrite(MoPin6, LOW);
    String data = "Variance:" + String(variance) + "\n";
    BLE.print(data);
    delay(100);
    //delay(5);
  }

  String data = "Variance:" + String(variance) + "\n";
  BLE.print(data);
  delay(200);


  // unsigned long currentMillis = millis();
  // int varience;
  // long sum=0;
  // for(int i=0;i<20;i++) {          //Average the 10 measurements to remove the glitch
  //     sensorValue=analogRead(GSR);
  //     sum += sensorValue;
  //     delay(5);
  //}


  // gsr_average = sum/20;
  // varience = gsr_average - sensorValue;
  // Serial.println("varience is: ");
  // Serial.println(varience, abs(varience));


  // if (abs(varience) >= 5) {
  //   digitalWrite(MoPin, HIGH);
  //   digitalWrite(otherMoPin, HIGH);
  //   previousMillis = currentMillis;
  // }
  // if ((currentMillis - previousMillis >= interval)) {
  //   digitalWrite(MoPin, LOW);
  //   digitalWrite(otherMoPin, LOW);
  //   delay(5);
  // }
  // else if (abs(varience) < 5) {
  //   digitalWrite(MoPin, LOW);
  //   digitalWrite(otherMoPin, LOW);
  //   delay(5);
  // }


  // Serial.print("sensorValue:");
  // Serial.println(sensorValue);
  Serial.print("variance:");
  Serial.println(variance);
  // Serial.println("gsr average:");
  // Serial.println(gsr_average);
}
