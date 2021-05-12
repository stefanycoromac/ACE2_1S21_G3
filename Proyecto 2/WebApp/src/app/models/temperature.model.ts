export class Temperature {
  public idTemperatura: number;
  public idUsuario: number;
  public promedio: number;
  public minima: number;
  public maxima: number;
  public fechaHora: string;

  constructor() {
    this.fechaHora = new Date().toString();
    this.promedio = 0;
    this.minima = 0;
    this.maxima = 0;
  }
};
