import { NextFunction, Request, Response } from "express";
import { CreateUserDto, UserDto } from "../dtos/users.dto";
import { IUser } from "../interfaces/users.interface";
import userService from "../services/users.service";

class UsersController {
  public userService = new userService();

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllUsersData: IUser[] = await this.userService.findAllUser();
      res.status(200).json({ data: findAllUsersData, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userId: string = req.params.id;

    try {
      const findOneUserData: IUser = await this.userService.findUserById(
        userId
      );
      res.status(200).json({ data: findOneUserData, message: "findOne" });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userData: CreateUserDto = req.body;
    try {
      const createUserData = await this.userService.createUser(userData);
      res
        .status(201)
        .json({ data: createUserData, message: "User Create successfull" });
    } catch (error) {
      next(error);
    }
  };

  public signinUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userData: UserDto = req.body;

    try {
      const signinUserData = await this.userService.signinUser(userData);
      res
        .status(200)
        .json({ data: signinUserData, message: "User Signin sucessfull" });
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
