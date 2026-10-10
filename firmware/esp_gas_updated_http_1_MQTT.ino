#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <PubSubClient.h>

// WiFi (from your code)
const char* ssid = "BRAVO";
const char* password = "goingdark";

// MQTT HiveMQ details
const char* mqtt_server = "059f425d37204957a94cc705a1b8de13.s1.eu.hivemq.cloud";
const int mqtt_port = 8883;

const char* mqtt_user = "Mahin";
const char* mqtt_pass = "123456Aa";

WiFiClientSecure espClient;
PubSubClient client(espClient);

int gasPin = 34;

// ---------------- CONNECT WIFI ----------------
void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.print("Connecting to WiFi: ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nWiFi connected!");
  Serial.print("IP: ");
  Serial.println(WiFi.localIP());
}

// ---------------- MQTT CONNECT ----------------
void reconnect() {
  while (!client.connected()) {
    Serial.print("Connecting to MQTT...");

    if (client.connect("ESP32Client", mqtt_user, mqtt_pass)) {
      Serial.println("connected!");
    } else {
      Serial.print("failed, rc=");
      Serial.println(client.state());
      delay(2000);
    }
  }
}

// ---------------- SETUP ----------------
void setup() {
  Serial.begin(115200);

  pinMode(gasPin, INPUT);
  analogSetPinAttenuation(gasPin, ADC_11db);

  setup_wifi();

  // IMPORTANT for HiveMQ TLS
  espClient.setInsecure();

  client.setServer(mqtt_server, mqtt_port);
}

// ---------------- LOOP ----------------
void loop() {
  if (!client.connected()) {
    reconnect();
  }

  client.loop();

  int gasValue = analogRead(gasPin);

  char msg[10];
  sprintf(msg, "%d", gasValue);

  client.publish("Bank/Gulshan/Gas", msg);

  Serial.print("Gas Value: ");
  Serial.println(msg);

  delay(3000);
}