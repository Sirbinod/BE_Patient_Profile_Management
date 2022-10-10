import { CreateUserDto, UserDto } from "../dtos/users.dto";
import HttpException from "../exceptions/HttpException";
import { IUser } from "../interfaces/users.interface";
import userModel from "../models/users.model";
import Logger from "../utils/logger";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Config from "../config";

class UserService {
  public users = userModel;

  public async findAllUser(): Promise<IUser[]> {
    const users = await this.users.find();
    return users;
  }

  public async findUserById(userId: string): Promise<IUser> {
    const user = await this.users.findById(userId);
    if (user) return user;
    throw new HttpException(409, "You're not user");
  }

  public async createUser(userData: CreateUserDto): Promise<IUser> {
    try {
      const salt = 12;

      if (await this.users.findOne({ email: userData.email })) {
        Logger.info(`Varify email ${userData.email}`);
        throw new HttpException(
          400,
          `User with email ${userData.email} already exists`
        );
      }
      //  Hashing password
      const hashedPassword: string = await new Promise((resolve, reject) => {
        bcrypt.hash(userData.password, salt, function (err, hash) {
          if (err) reject(err);
          resolve(hash);
        });
      });

      const user = await this.users.create({
        ...userData,
        password: hashedPassword,
      });
      Logger.silly("User  create successfull");

      return user;
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  public async signinUser(
    userData: UserDto
  ): Promise<{ user: IUser; token: string }> {
    try {
      const user = await this.users.findOne({ email: userData.email });

      if (!user) {
        Logger.info(`Varify email ${userData.email}`);
        throw new HttpException(400, `User not registered`);
      }
      /**
       * We use verify from bcrypt to prevent 'timing based' attacks
       * Checking password
       */
      let validPassword = await new Promise((resolve, error) => {
        bcrypt.compare(userData.password, user.password, (err, success) => {
          if (err) {
            return error(err);
          }
          resolve(success);
        });
      });
      if (validPassword) {
        Logger.info("Password is valid!");
        const token = this.generateToken(user);
        return { user, token };
      } else {
        throw new Error("Invalid Password");
      }
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
  private generateToken(user: any) {
    /**
     * A JWT means JSON Web Token, so basically it's a json that is _hashed_ into a string
     */
    Logger.silly(`Sign JWT for userId: ${user._id}`);
    return jwt.sign(
      {
        _id: user._id, // We are gonna use this in the middleware 'isAuth'
        email: user.email,
        name: user.name,
        expiresIn: "20 min",
      },
      Config.jwtSecret
    );
  }
}

export default UserService;
