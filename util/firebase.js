
require('dotenv').config
const admin = require('firebase-admin')

const  config = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL
}
const app = admin.initializeApp(
 {
    credential: admin.credential.cert(config)
 }
)
 
const createUser = async(email, password, uid)=>{
    return await app.auth().createUser({
        email,
        password,
        uid
    })
}

const verifyToken = async(token) => {
    return await app.auth().verifyIdToken(token);
}

module.exports = {
    createUser,
    verifyToken
}