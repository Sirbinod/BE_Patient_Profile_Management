import { NextFunction, Request, Response } from "express";
import { CreatePatientDto } from "../dtos/patient.dto";
import { IPatient } from "../interfaces/patient.interface";
import patientService from "../services/patient.service";

class PatientController {
  public patientService = new patientService();

  public getpatients = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const page = req.query.page || 1;
      const limit = req.query.page || 10;

      const findAllpatientsData =
        await this.patientService.findAllPatient(page, limit);
      res.status(200).json({ data: findAllpatientsData, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };

  public getpatientById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const patientId: string = req.params.id;

    try {
      const findOnepatientData: IPatient =
        await this.patientService.findPatientById(patientId);
      res.status(200).json({ data: findOnepatientData, message: "findOne" });
    } catch (error) {
      next(error);
    }
  };

  public createpatient = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const patientData: CreatePatientDto = req.body;

    try {
      const createpatientData: IPatient =
        await this.patientService.createPatient(patientData);
      res.status(201).json({ data: createpatientData, message: "created" });
    } catch (error) {
      next(error);
    }
  };

  public updatepatient = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const patientId: string = req.params.id;
    const patientData: IPatient = req.body;

    try {
      const updatepatientData: IPatient =
        await this.patientService.updatePatient(patientId, patientData);
      res.status(200).json({ data: updatepatientData, message: "updated" });
    } catch (error) {
      next(error);
    }
  };

  public deletepatient = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const patientId: string = req.params.id;

    try {
      const deletepatientData: IPatient =
        await this.patientService.deletePatientData(patientId);
      res.status(200).json({ data: deletepatientData, message: "deleted" });
    } catch (error) {
      next(error);
    }
  };
}

export default PatientController;
