import { CreatePatientDto } from "../dtos/patient.dto";
import HttpException from "../exceptions/HttpException";
import { IPatient } from "../interfaces/patient.interface";
import patientModel from "../models/patient.model";

class PatientService {
  public patient = patientModel;

  public async findAllPatient(page:any, limit:any): Promise<{patients:IPatient[], paginations:any}> {
    const patients = await this.patient.find().limit(limit |10)
    .skip(limit * (page-1))
    .sort({
        name: 'asc'
    });
    const total = await this.patient.count()
    const paginations = {
      page:page,
      limit:limit,
      total:total
    }

    return { patients, paginations};
  }

  public async findPatientById(patientId: string): Promise<IPatient> {
    const patient = await this.patient.findById(patientId);
    if (patient) return patient;
    throw new HttpException(409, "You're not patient");
  }

  public async createPatient(patientData: CreatePatientDto): Promise<IPatient> {
    if (await this.patient.findOne({ email: patientData.email })) {
      throw new HttpException(
        400,
        `patient with email ${patientData.email} already exists`
      );
    }
    const patient = await this.patient.create(patientData);

    return patient;
  }

  public async updatePatient(
    patientId: string,
    patientData: IPatient
  ): Promise<IPatient> {
    const patient = await this.patient.findByIdAndUpdate(
      patientId,
      patientData
    );
    if (patient) return patient;
    throw new HttpException(409, "You're not patient");
  }

  public async deletePatientData(patientId: string): Promise<IPatient> {
    const patient = await this.patient.findByIdAndDelete(patientId);
    if (patient) return patient;
    throw new HttpException(409, "You're not patient");
  }
}

export default PatientService;
