import { NextFunction, Response, Request } from "express";
declare const postOrder: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const getOrdersByStoreName: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const getOrdersByUid: (req: Request, res: Response, _next: NextFunction) => Promise<void>;
declare const updateAcceptedStatus: (req: any, res: Response, _next: NextFunction) => Promise<void>;
export { postOrder, getOrdersByStoreName, getOrdersByUid, updateAcceptedStatus };
