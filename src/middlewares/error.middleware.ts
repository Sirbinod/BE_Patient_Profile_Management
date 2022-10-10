import { Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';
import Logger from "../utils/logger"

function errorMiddleware(error: HttpException, req: Request, res: Response) {

  const status: number = error.status || 500;
  const message: string = error.message || 'Something went wrong';

  Logger.error('[ERROR] ', status, message);

  res.status(status).json({ message });
}

export default errorMiddleware;
