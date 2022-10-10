import { v2 as cloudinary } from "cloudinary";
import { NextFunction, Request, Response } from "express";
import Config from "../config";

cloudinary.config({
  cloud_name: Config.cloud_name,
  api_key: Config.cloud_key,
  api_secret: Config.cloud_secret,
});

class FileController {
  public index = (req: Request, res: Response, next: NextFunction) => {
    try {
      const file = req?.files?.file;

      cloudinary.uploader.upload(
        file?.tempFilePath,
        (err: any, result: any) => {
          if (!err) {
            res
              .status(200)
              .json({ data: result.url, message: "File upload successfull" });
          }
          res.status(200).json({ data: err, message: "oppps sorry" });
        }
      );
    } catch (error) {
      next(error);
    }
  };
}

export default FileController;
