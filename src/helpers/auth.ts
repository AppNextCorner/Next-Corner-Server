const firebase = require("../util/firebase.util");

async function decodeIDToken(req: any, res: any, next: any) {
    console.log("Token Request", req.token);
    if (req.token) {
      try {
        const decodedToken = await firebase.verifyToken(req.token);
        req["currentUser"] = decodedToken;
        next();
      } catch (err) {
        console.log(err);
      }
    }
  } 
export {}
module.exports = decodeIDToken