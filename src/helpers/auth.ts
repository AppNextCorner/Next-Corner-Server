import { verifyToken } from "../util/firebase.util";

async function decodeIDToken(req: any, res: any, next: any) {
  console.log("Token Request", req.token);
  if (req.token) {
    try {
      const decodedToken = await verifyToken(req.token);
      req["currentUser"] = decodedToken;
      next();
    } catch (err) {
      console.log(err);
    }
  }
}
export { decodeIDToken };
