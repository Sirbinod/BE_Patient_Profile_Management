import { Router } from "express";
import FileController from "../controllers/file.controller";
import Route from "../interfaces/routes.interface";

class FileRoute implements Route {
  public path = "/file_upload";
  public router = Router();
  public fileController = new FileController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, this.fileController.index);
  }
}

export default FileRoute;
