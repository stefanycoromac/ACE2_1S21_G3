export class Test {
  public idTest: number;
  public fechaInicio: string;
  public fechaFin: string;
  public estado: string;
  public repeticiones: number;

  constructor() {
    this.fechaInicio = new Date().toString();
    this.fechaFin = new Date().toString();
    this.repeticiones = 0;
  }
};
