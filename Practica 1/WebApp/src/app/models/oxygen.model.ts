export class Oxygen {
  public idOxigeno: number;
  public idUsuario: number;
  public medicion: number;
  public fechaHora: string;

  constructor() {
    this.fechaHora = new Date().toString();
    this.medicion = 0;
  }
};
