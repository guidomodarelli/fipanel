export interface BCRAVariableData {
  idVariable: number;
  cdSerie: number;
  descripcion: string;
  fecha: string;
  valor: number;
}

export interface BCRAVariablesApiResponse {
  results: BCRAVariableData[];
}
