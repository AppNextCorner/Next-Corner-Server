
require('dotenv').config
const admin = require('firebase-admin')

const  config = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') ?? "",
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL
}
const app = admin.initializeApp(
 {
    credential: admin.credential.cert(config)
 }
)
 
const createUser = async(email: string, password: string, uid: string)=>{
    return await app.auth().createUser({
        email,
        password,
        uid
    })
}

const verifyToken = async(token: string) => {
    return await app.auth().verifyIdToken(token);
}

export {}
module.exports = {
    createUser,
    verifyToken
}