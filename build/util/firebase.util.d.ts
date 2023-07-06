declare const createUser: (email: string, password: string, uid: string) => Promise<import("firebase-admin/lib/auth/user-record").UserRecord>;
declare const verifyToken: (token: string) => Promise<import("firebase-admin/lib/auth/token-verifier").DecodedIdToken>;
export { createUser, verifyToken };
