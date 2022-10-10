import { Router } from "express";
import UsersController from "../controllers/users.controller";
import { CreateUserDto, UserDto } from "../dtos/users.dto";
import Route from "../interfaces/routes.interface";
import validationMiddleware from "../middlewares/validation.middleware";
import validationJsonResponseMiddleware from "../middlewares/validationJsonResponse.middleware";

class UsersRoute implements Route {
  public path = "/users";
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.usersController.getUsers);
    this.router.get(`${this.path}/:id`, this.usersController.getUserById);
    this.router.post(
      `${this.path}/signup`,
      validationJsonResponseMiddleware(CreateUserDto),
      this.usersController.createUser
    );
    this.router.post(
      `${this.path}/signin`,
      validationJsonResponseMiddleware(UserDto),
      this.usersController.signinUser
    );
  }
}

export default UsersRoute;
