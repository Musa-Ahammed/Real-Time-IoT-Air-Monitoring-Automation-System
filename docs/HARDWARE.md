# Hardware notes

[Back to the project overview](../README.md)

## Included references

| Material | File |
| --- | --- |
| Schematic | [Sch-AM.jpg](../Sch-AM.jpg) |
| PCB layout | [PCB-AM.jpg](../PCB-AM.jpg) |
| Board preview | [3D-AM.jpg](../3D-AM.jpg) |

![Air monitoring circuit schematic](../Sch-AM.jpg)

The schematic labels an ESP32-WROOM-32, an MQ2 gas-sensor module, an adjustable LM2596 converter, an LED, and a buzzer. Confirm these against the actual assembled components.

## Connections and checks

- The sketch reads the sensor's analog output on **GPIO34**. It does not read the digital output.
- The schematic labels the sensor supply as 5 V. Verify that its analog output stays within the ESP32 input limits; do not assume a 5 V-powered module has a suitable output range. The drawing shows no explicit analog voltage divider.
- Check the converter output, polarity, and ESP32 power connection before applying power.
- The LED and buzzer appear in the images but are not driven by the current firmware. The dashboard alarm uses the browser's audio output.
- The PCB image has small labels on a dark background. Use the schematic and full-size image links to inspect connections.

No editable design, manufacturing files, measured voltage checks, or sensor-calibration record is included. The raw readings do not establish gas concentration or identify a particular gas.
