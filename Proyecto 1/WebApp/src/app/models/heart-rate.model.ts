export class HeartRate {
  public idRitmo: number;
  public idUsuario: number;
  public medicion: number;
  public fechaHora: string;


  constructor() {
    this.fechaHora = new Date().toString();
    this.medicion = 0;
  }
};
