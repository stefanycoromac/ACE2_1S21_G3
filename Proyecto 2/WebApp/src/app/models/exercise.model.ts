export class Exercise {
  public idSesion: number;
  public estado: string;
  public fechaInicio: Date;
  public fechaFin: Date;
  public noPasos: number;
  public metaPasos: number;
  public metaCalorias: number;
  public caloriasQuemadas: number;


  constructor() {
    this.fechaInicio = new Date();
    this.fechaFin = new Date();
    this.noPasos = 0;
    this.metaPasos = 0;
    this.metaCalorias = 0;
    this.caloriasQuemadas = 0;
  }
};
