import type { HttpService } from '../../shared/http/domain/HttpService';
import type { FinancialDataProvider } from '../domain/FinancialDataProvider';
import type { FinancialIndicators } from '../domain/FinancialIndicators';
import type { VariableData } from '../domain/VariableData';
import type { BCRAVariablesApiResponse } from './BCRAVariablesApiResponse';

const TASA_POLITICA_MONETARIA = 6;
const IPC_MENSUAL = 27;
const IPC_INTERANUAL = 28;
const IPC_REM = 29;

export class BCRAFinancialDataProvider implements FinancialDataProvider {
  constructor(private readonly httpService: HttpService) {}

  private responseToVariables(response: BCRAVariablesApiResponse): VariableData[] {
    return response.results.map((variable) => {
      return {
        id: variable.idVariable,
        series_code: variable.cdSerie,
        description: variable.descripcion,
        date: variable.fecha,
        value: variable.valor,
      } as VariableData;
    });
  }

  async getPrimaryFinancialMetrics(): Promise<FinancialIndicators> {
    const response: BCRAVariablesApiResponse = await this.httpService.get(
      'https://api.bcra.gob.ar/estadisticas/v2.0/PrincipalesVariables',
    );
    const variables = this.responseToVariables(response);
    return {
      TASA_POLITICA_MONETARIA: variables.find((variable) => variable.id === TASA_POLITICA_MONETARIA),
      IPC_MENSUAL: variables.find((variable) => variable.id === IPC_MENSUAL),
      IPC_INTERANUAL: variables.find((variable) => variable.id === IPC_INTERANUAL),
      IPC_REM: variables.find((variable) => variable.id === IPC_REM),
    };
  }
}
