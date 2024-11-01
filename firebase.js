const admin = require('firebase-admin');
const serviceAccount = require('../public/credential.json'); // Path to your service account key

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://insanedc-ce9da-default-rtdb.asia-southeast1.firebasedatabase.app' // Replace with your database URL
});

const db = admin.database();

module.exports = db;
