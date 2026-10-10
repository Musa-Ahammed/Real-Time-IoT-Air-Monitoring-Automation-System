# Air Monitoring Device

An ESP32-based gas-sensor monitoring project. The device reads an analog sensor, sends readings over Wi-Fi using MQTT, and uses a Node.js bridge to store them in Firebase. A browser dashboard displays recent readings and history.

The firmware sends **raw ADC values**. It does not convert them to CO₂ concentration, ppm, or an air-quality index, despite those labels in the dashboard.

<img width="1536" height="1024" alt="1" src="https://github.com/user-attachments/assets/3fdc69d0-1948-428b-ab55-b06bcaeaac95" />

<img width="1895" height="822" alt="3" src="https://github.com/user-attachments/assets/e667e6c3-e6b4-4029-b044-78ddca70cef0" />

<img width="1546" height="851" alt="2" src="https://github.com/user-attachments/assets/7499537b-58bf-4de7-b63c-2067d86e0ba5" />

## How it works

```text
Gas sensor → ESP32 GPIO34 → MQTT → Node.js bridge → Firebase → Dashboard
```

- The ESP32 attempts to publish a reading about every three seconds while connected.
- `index.js` stores each message with a bridge-receipt timestamp.
- The dashboard offers the latest 25 records, the last hour, and yesterday's readings.
- An optional browser sound accompanies the dashboard's high-reading status. The firmware does not control the pictured LED or buzzer.

## Repository materials

| Material                                        | Location                                                   |
| ----------------------------------------------- | ---------------------------------------------------------- |
| ESP32 sensor firmware                           | [Arduino sketch](firmware/esp_gas_updated_http_1_MQTT.ino) |
| MQTT-to-Firebase bridge for the dashboard       | [index.js](firmware/index.js)                              |
| Alternative bridge with a different data format | [bridge.js](firmware/bridge.js)                            |
| Browser dashboard                               | [index.html](firmware/index.html)                          |
| Circuit schematic                               | [Sch-AM.jpg](Sch-AM.jpg)                                   |
| PCB layout                                      | [PCB-AM.jpg](PCB-AM.jpg)                                   |
| Board preview                                   | [3D-AM.jpg](3D-AM.jpg)                                     |
| Setup and dependencies                          | [Setup notes](docs/SETUP.md)                               |
| Components and connections                      | [Hardware notes](docs/HARDWARE.md)                         |
| Data format and dashboard behavior              | [Data notes](docs/DATA_AND_DASHBOARD.md)                   |

## Hardware preview

![Air monitoring board preview with ESP32, sensor, converter, LED, and buzzer footprints](3D-AM.jpg)

[View the schematic](Sch-AM.jpg) · [View the PCB layout](PCB-AM.jpg)


