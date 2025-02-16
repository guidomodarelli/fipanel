export interface BCRAPrincipalesVariablesResponse {
  results: Array<{
    idVariable: number;
    cdSerie: number;
    descripcion: string;
    fecha: string;
    valor: number;
  }>;
}
