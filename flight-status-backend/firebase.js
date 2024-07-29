// firebase.js
const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.cert("BMIxKdHwQ_MVBIQr9q7-DyoHWyIosl1YvSGfn8fi_o8WKJOTiVqnuo-I9tLJgj-Fs6cLTe5g1q8nZfUZ8CG5VxU")
});

module.exports = admin;
