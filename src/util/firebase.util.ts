require("dotenv").config;
import admin from "firebase-admin";

const config = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n") ?? "",
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};
const app = admin.initializeApp({
  credential: admin.credential.cert(config),
});

const createUser = async (email: string, password: string, uid: string) => {
  try{
    const user = await app.auth().createUser({
      email,
      password,

      uid,
    });
    return user;
    
  } catch(err) {
    console.log(err)
    
    throw err;
  }
 
};

const verifyToken = async (token: string) => {
  return await app.auth().verifyIdToken(token);
};

export { createUser, verifyToken };
