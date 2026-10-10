# Setup notes

[Back to the project overview](../README.md)

## ESP32

1. Prepare an Arduino environment with ESP32 board support and `PubSubClient`. The sketch also uses `WiFi` and `WiFiClientSecure`.
2. Place the sketch in a folder named `esp_gas_updated_http_1_MQTT` when preparing it for Arduino.
3. Configure your Wi-Fi and MQTT connection details in the sketch. Use a unique MQTT client ID if running multiple devices.
4. Check the [hardware connections](HARDWARE.md), then upload to the matching ESP32 board and open serial output at **115200 baud**.

The sketch reads GPIO34 and publishes to `Bank/Gulshan/Gas` on MQTT port 8883. Connection failures can delay readings; there is no offline storage in the sketch.

## Node.js bridge

Use [index.js](../firmware/index.js) with the included dashboard. It requires Node.js and the `dotenv`, `mqtt`, and `firebase-admin` packages. No package manifest or pinned dependency versions are supplied.

Set these environment variables, or provide them in a local `.env` file in the bridge's working directory:

| Variable                         | Purpose                                                               |
| -------------------------------- | --------------------------------------------------------------------- |
| `MQTT_BROKER_URL`                | MQTT broker URL, including the intended port.                         |
| `MQTT_USERNAME`, `MQTT_PASSWORD` | Broker credentials.                                                   |
| `FIREBASE_PROJECT_ID`            | Firebase project ID.                                                  |
| `FIREBASE_CLIENT_EMAIL`          | Service-account email.                                                |
| `FIREBASE_PRIVATE_KEY`           | Service-account private key; the code expands literal `\n` sequences. |
| `FIREBASE_DATABASE_URL`          | Realtime Database URL.                                                |
| `PORT`                           | Optional HTTP status port; default is 10000.                          |

After dependencies and configuration are ready, run `node index.js` from `firmware`. Its HTTP endpoint returns a fixed status message; it does not serve the dashboard or verify that data is reaching Firebase.

The alternative [bridge.js](../firmware/bridge.js) expects a local service-account JSON file that is absent. It also uses a different database and record format from the dashboard. See the [data comparison](DATA_AND_DASHBOARD.md).

## Dashboard

Serve `firmware/index.html` through a local or hosted static web server. Match its Firebase configuration to the database used by `index.js`. The page loads Firebase and Chart.js from external CDNs and needs database read access. No user sign-in flow is included.

Verify one published reading reaches `sensor_logs` and appears in the dashboard before testing historical views. No cloud services were contacted during this documentation update.

## Existing configuration issues

The ESP32 sketch and alternative bridge contain embedded credentials. Replace those credentials and keep service-account keys and `.env` files out of shared source. The sketch and both bridges currently disable TLS certificate verification; enable certificate validation before deployment.
