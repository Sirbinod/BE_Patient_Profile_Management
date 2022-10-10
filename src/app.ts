import cors from "cors";
import express from "express";
import Routes from "./interfaces/routes.interface";
import Logger from "./utils/logger";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import errorMiddleware from "./middlewares/error.middleware";
import fileUpload from "express-fileupload";
import Config from "./config"
 

class App {
  public app: express.Application;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = Config.port

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeFileUpload();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      Logger.info(`
          ################################################
          🛡️  Server listening on port: ${this.port} 🛡️
          🌐 http://localhost:3000
          ################################################
        `);
    });
  }
  public getServer() {
    return this.app;
  }

  private initializeFileUpload() {
    this.app.use(fileUpload({ useTempFiles: true }));
  }

  private initializeMiddlewares() {
    // Enable Cross Origin Resource Sharing to all origins by default
    this.app.use(cors());

    // Middleware that transforms the raw string of req.body into json
    this.app.use(bodyParser.json());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use("/api", route.router);
    });
  }
  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
  private connectToDatabase() {

    mongoose
      .connect(Config.databaseURL)
      .then((res) => {
        Logger.info("MongoDB connect successfull");
      })
      .catch((err) => {
        Logger.error(
          `Initial Distribution API Database connection error occured -`,
          err
        );
      });
  }
}
export default App;
