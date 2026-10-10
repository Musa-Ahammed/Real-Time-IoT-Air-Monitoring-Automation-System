# Data and dashboard

[Back to the project overview](../README.md)

## Data flow

The ESP32 publishes an integer as text on `Bank/Gulshan/Gas`. It comes directly from `analogRead(34)`; no concentration conversion or calibration is applied.

| File | Database path | Reading field | Compatibility |
| --- | --- | --- | --- |
| [index.js](../firmware/index.js) | `sensor_logs` | `gas_value` | Matches the dashboard format. |
| [bridge.js](../firmware/bridge.js) | `gas_readings` | `value` | Uses a different database and format. |
| [index.html](../firmware/index.html) | Reads `sensor_logs` | Reads `gas_value` | Must point to the same database as `index.js`. |

Both bridges add `timestamp` using `Date.now()`: milliseconds since the Unix epoch when the bridge receives the message, not a device measurement timestamp. In `index.js`, input that cannot be parsed as an integer is stored as text; the dashboard expects numeric readings.

## Dashboard views

- **Real-time:** subscribes to the last 25 database records.
- **Last 1 Hour:** fetches records from the preceding hour when selected.
- **Yesterday:** fetches the previous calendar day's records using the browser's local time.

The average and record count describe the displayed data. In real-time mode, the peak retains the highest value seen since entering that mode, even after it leaves the 25-record window.

## Display limits

The page uses raw-value bands below 300, from 300 to below 600, and 600 or above. These are hard-coded UI thresholds, not calibrated gas limits. The CO₂, PPM, and safety labels in the page are not supported by a conversion in the supplied code.

The optional sound runs only for high readings in real-time mode. An empty result clears the chart and count but can leave the previous value and status visible. The page has no explicit stale-data indicator, so a displayed status does not confirm current sensor connectivity.
