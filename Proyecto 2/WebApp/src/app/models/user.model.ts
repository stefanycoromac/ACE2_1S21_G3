export class User {
  public idUsuario: number;
  public nombre: string;
  public apellido: string;
  public edad: number;
  public genero: number;
  public peso: number;
  public estatura: number;
  public tipo: number;
  public nickname?: string;
  public contrasenia?: string;

  constructor() { this.genero = 1; }

};
