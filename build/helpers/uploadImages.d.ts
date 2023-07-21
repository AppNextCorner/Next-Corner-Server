import { Response } from "express";
declare const imageHelper: (res: Response, req: any, model: any, name?: string) => Promise<void>;
export { imageHelper };
