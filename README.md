# SlinkyConnect

**SlinkyConnect** is a companion mobile app for **Slinky**, a stress‑detecting stuffed animal sloth. Using a Galvanic Skin Response (GSR) sensor and Bluetooth Low Energy (BLE), Slinky streams your real‑time stress data to your phone. Monitor stress levels, view historical trends, and activate soothing haptic feedback—all in one place.

---

## Features

- **Real‑time Monitoring**  
  • Start/stop stress detection at the tap of a button  
  • Live updates of a stress level graph via BLE

- **Historical Analysis**  
  • Weekly, monthly, and yearly views of average stress  
  • Color‑coded bar charts by stress‑level thresholds (Low/Medium/High)  
  • Summary cards: avg. stress, total sessions, total time

- **Profile & Settings**  
  • View and edit profile (picture, member info)   
  • Secure sign‑in / sign‑up with Firebase Authentication

- **Soothing Vibrations**  
  • Enable vibrations within Slinky when stress spikes  
  • Calibrate your baseline variance levels to personalize detection

---

## 🚀 Getting Started

Follow these steps to run the app locally:

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Expo Go app](https://expo.dev/client) (install on your iOS/Android device)

### 1. Clone the repo  
```bash
git clone https://github.com/sandyzng105/slinky.git
cd slinky
```
### 2. Install Dependencies
```bash
npm install
```
### 3. Start the development server
```bash
npx expo start
```
### 3. Scan the QR code from the terminal with your camera to load the app in Expo Go

---

# Slinky Bluetooth Stress Monitor

An Arduino-based system that monitors Galvanic Skin Response (GSR) to detect stress levels and communicates via Bluetooth with a companion mobile app. When stress is detected, the system triggers vibration motors in a wearable "Slinky" device.

## Features
- **GSR Stress Detection**: Measures skin conductance via analog sensor
- **Bluetooth (BLE) Communication**: Sends real-time data to a mobile app
- **Vibration Feedback**: Activates motors when stress is detected
- **Baseline Calibration**: Auto-calibrates to the user's normal levels

## Hardware Setup
### Components Needed
- Seeeduino Board
- Grove BLE v1 Bluetooth module
- Grove GSR sensor
- Vibration motors
- Battery

### Software
- Arduino IDE
- Serial Monitor App


## Software Configuration
### Arduino Code
The main code (`bluetoothAppConnect.ino`) handles:
1. BLE module initialization
2. GSR baseline calibration (10-second process)
3. Continuous stress monitoring
4. Vibration motor control
5. Bluetooth data transmission

Key Functions:
```arduino
void setup() {
  // Initializes BLE with commands:
  // AT+CLEAR, AT+ROLE0, AT+NAMESlinky
  // Performs 10-second GSR baseline calibration
}

void loop() {
  // 1. Checks BLE for incoming data
  // 2. Reads GSR sensor every 200ms
  // 3. Calculates variance from baseline
  // 4. Triggers motors if variance > 100
  // 5. Sends variance data via BLE
}
```

## Mobile App Connection
### Pair the Device
- Look for "Slinky" in your Bluetooth settings
### Data Format
- Incoming: Variance:[value] (stress level)

### Calibration Process
- Place the Slinky around your neck
- The system automatically runs 10-second calibration
- Baseline value is stored in userBaseline
- Subsequent readings compare to this baseline


