import { NextFunction, Response, Request } from "express";
declare const postOrder: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const getOrdersById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const getOrdersByUid: (req: Request, res: Response, _next: NextFunction) => Promise<void>;
declare const updateAcceptedStatus: (req: any, res: Response, _next: NextFunction) => Promise<void>;
declare const updateStatus: (req: any, res: Response, _next: NextFunction) => Promise<void>;
export { postOrder, getOrdersById, getOrdersByUid, updateAcceptedStatus, updateStatus };
