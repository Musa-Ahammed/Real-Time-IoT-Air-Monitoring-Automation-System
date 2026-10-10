require('dotenv').config();
const mqtt = require('mqtt');
const admin = require('firebase-admin');

// 1. FIREBASE ADMIN SDK INITIALIZATION
const privateKey = process.env.FIREBASE_PRIVATE_KEY 
  ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') 
  : undefined;

admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: privateKey
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URL
});

const db = admin.database();
const sensorRef = db.ref('sensor_logs');

// 2. MQTT BROKER CONNECTION OPTIONS (UPDATED FOR STABILITY)
const mqttOptions = {
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD,
    rejectUnauthorized: false, // Bypasses SSL handshake issues on lightweight cloud runtimes
    
    // --- ANTI-FREEZE CONFIGURATION ---
    keepalive: 15,              // Send a heartbeat ping every 15 seconds to prevent silent drops
    reconnectPeriod: 2000,      // If connection drops, automatically try to reconnect every 2 seconds
    connectTimeout: 30 * 1000,  // Kill stalled connection attempts after 30 seconds
    clean: true                 // Wipe out old ghost sessions on reconnect to avoid duplicates/lag
};

console.log('Connecting to HiveMQ Broker...');
const mqttClient = mqtt.connect(process.env.MQTT_BROKER_URL, mqttOptions);

// 3. MQTT EVENT HANDLERS
mqttClient.on('connect', () => {
    console.log('Connected to MQTT Broker successfully! 🎉');
    
    // Subscribe to your ESP32's data topic
    mqttClient.subscribe('Bank/Gulshan/Gas', (err) => {
        if (!err) {
            console.log('Subscribed to topic: Bank/Gulshan/Gas');
        } else {
            console.error('Subscription error:', err);
        }
    });
});

mqttClient.on('message', async (topic, message) => {
    const rawData = message.toString();
    console.log(`Received data from ${topic}: ${rawData}`);

    // Parse data and attach server-side timestamp
    const gasValue = parseInt(rawData, 10);
    const dataPayload = {
        gas_value: isNaN(gasValue) ? rawData : gasValue,
        timestamp: Date.now()
    };

    try {
        // Push payload straight to Firebase Realtime Database
        await sensorRef.push(dataPayload);
        console.log('Data successfully saved to Firebase! 🔥');
    } catch (error) {
        console.error('Failed to save data to Firebase:', error);
    }
});

// --- AUTOMATED RECOVERY LISTENERS ---
mqttClient.on('close', () => {
    console.log('🔄 MQTT Connection closed. Render will automatically attempt reconnection...');
});

mqttClient.on('offline', () => {
    console.log('📡 Network went offline. Actively waiting to reconnect to HiveMQ...');
});

mqttClient.on('error', (err) => {
    console.error('❌ MQTT Client Error:', err.message || err);
});


// 4. DUMMY HTTP SERVER (Keeps Render Free Tier Web Services Alive)
const http = require('http');
const PORT = process.env.PORT || 10000;

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bridge is running smoothly! 🚀');
}).listen(PORT, () => {
    console.log(`Dummy web server listening on port ${PORT}`);
});
