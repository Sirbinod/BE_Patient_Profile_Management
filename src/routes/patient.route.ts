import { Router } from "express";
import PatientController from "../controllers/patient.controller";
import { CreatePatientDto } from "../dtos/patient.dto";
import Route from "../interfaces/routes.interface";
import validationMiddleware from "../middlewares/validation.middleware";
import validationJsonResponseMiddleware from "../middlewares/validationJsonResponse.middleware";
import verifyToken from "../middlewares/auth";

class PatientRoute implements Route {
  public path = "/patient";
  public router = Router();
  public patientController = new PatientController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      verifyToken,
      this.patientController.getpatients
    );
    this.router.get(
      `${this.path}/:id`,
      verifyToken,
      this.patientController.getpatientById
    );
    this.router.post(
      `${this.path}`,
      verifyToken,
      validationJsonResponseMiddleware(CreatePatientDto),
      this.patientController.createpatient
    );
    this.router.put(
      `${this.path}/:id`,
      verifyToken,
      validationMiddleware(CreatePatientDto, true),
      this.patientController.updatepatient
    );
    this.router.delete(
      `${this.path}/:id`,
      verifyToken,
      this.patientController.deletepatient
    );
  }
}

export default PatientRoute;
