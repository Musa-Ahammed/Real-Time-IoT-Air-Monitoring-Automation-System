const mqtt = require("mqtt");
const admin = require("firebase-admin");

// ---------------- FIREBASE SETUP ----------------
// Download service account key from Firebase
const serviceAccount = require("./esp32-gas-monitor-f8320-firebase-adminsdk-fbsvc-a3f493df75.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://esp32-gas-monitor-f8320-default-rtdb.asia-southeast1.firebasedatabase.app/"
});

const db = admin.database();

// ---------------- MQTT SETUP ----------------
const client = mqtt.connect("mqtts://059f425d37204957a94cc705a1b8de13.s1.eu.hivemq.cloud", {
  username: "Mahin",
  password: "123456Aa",
  port: 8883,
  rejectUnauthorized: false
});

client.on("connect", () => {
  console.log("MQTT Connected");
  client.subscribe("Bank/Gulshan/Gas");
});

// ---------------- RECEIVE DATA ----------------
client.on("message", (topic, message) => {
  const value = parseInt(message.toString());

  console.log("Received:", value);

  // Save to Firebase (HISTORY)
  db.ref("gas_readings").push({
    value: value,
    timestamp: Date.now()
  });
});