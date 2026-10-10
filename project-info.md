# Real-Time IoT Environmental Monitoring & Automation System
# https://musa-ahammed.github.io/esp32-dashboard/
Stack: ESP32 (C++) · MQTT/HiveMQ Cloud · Render · Node.js · UptimeRobot · Firebase Realtime DB · Chart.js· Git

Designed and deployed an end-to-end, bidirectional IoT telemetry and automation ecosystem for real-time air quality monitoring and automated emergency infrastructure response (simulated for an ATM node environment).

The project features a high-frequency data pipeline that streams sensor data to a cloud database while allowing low-latency remote hardware control via an interactive web dashboard. Implemented modern cloud engineering strategies to maintain 24/7 service uptime on micro-tier infrastructure.

Key Features & Architecture
Edge Hardware Layer: Programmed an ESP32 microcontroller in C++ to sample environmental gas levels and establish a secure, encrypted TLS 1.2 connection to the cloud broker.

Data Transport & Middleware: Utilized MQTT (via HiveMQ Cloud) over port 8883 for lightweight data ingestion. Developed a Node.js backend bridge hosted on Render to subscribe to MQTT streams, format telemetry payloads, and handle database transactions.

Cloud Database & Operations: Integrated Firebase Realtime Database for persistent storage, optimizing database performance through custom indices (.indexOn: ["timestamp"]). Configured automated HTTP keep-alive pings (UptimeRobot) to bypass server inactivity spin-down rules, ensuring continuous availability.

Frontend Control Matrix: Engineered a responsive, dark-mode web dashboard utilizing Chart.js for real-time and historical analytics (Time-Travel queries for "Last 1 Hour" and "Yesterday"). Integrated a web-audio notification matrix and low-latency digital switch paths for remote mechanical actuation (relays/actuators).

Technical Stack
Hardware/Firmware: ESP32, C++, Arduino IDE, PubSubClient, ArduinoJson, TLS 1.2

Backend & Cloud: Node.js, MQTT (HiveMQ Cloud), Firebase Realtime Database, Render

Frontend: HTML5, CSS3 (Modern Flexbox/Grid), JavaScript (ES6+), Chart.js, Web Audio API

DevOps/Monitoring: UptimeRobot, Git/GitHub


<img width="1536" height="1024" alt="ESP32--MQTT-HiveMQ---Render-Uptime-Robot--Firebase-Website-architected-industrial-project" src="https://github.com/user-attachments/assets/b598a153-0cb3-4e42-a213-075b358319b3" />

<img width="1546" height="851" alt="website" src="https://github.com/user-attachments/assets/d3847903-e8c9-4eca-9d58-b3ac297853a4" />

<img width="1890" height="904" alt="uptimerobot" src="https://github.com/user-attachments/assets/f496cf97-3c49-4cdc-bfcf-a1d08cfca742" />

<img width="1516" height="1028" alt="renderlog" src="https://github.com/user-attachments/assets/d84a563e-1a99-4d36-8aa9-1057a4563f26" />

<img width="1491" height="996" alt="mqtthivemq" src="https://github.com/user-attachments/assets/0e742dac-78ff-4dd3-83dd-a6273fa14047" />

<img width="1527" height="1039" alt="firebaserealtimedatabse" src="https://github.com/user-attachments/assets/5a990776-c4f7-4949-93b4-fb2a5048f055" />

<img width="1920" height="1080" alt="arduinoserialmonitor" src="https://github.com/user-attachments/assets/1a46bd59-dfb8-4fa3-aa75-c4b0b665f31e" />


**Architecture-1**
<img width="1275" height="752" alt="Architecture1" src="https://github.com/user-attachments/assets/2c81b44d-f828-4ea9-b2ad-0031cb5b1e8e" />


**Architecture-1**
<img width="1895" height="822" alt="architecture2" src="https://github.com/user-attachments/assets/2c3cd6b1-b97f-4749-9130-dfbafaf3b6f4" />



