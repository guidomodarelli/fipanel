import { getDolarsUseCase } from '@/core/contexts/Dolar/application/getDolarsUseCase';
import { HttpBluelyticsDolar } from '@/core/contexts/Dolar/infrastructure/HttpBluelyticsDolar';
import { getPrimaryFinancialMetricsUseCase } from '@/core/contexts/Metrics/application/getPrimaryFinancialMetricsUseCase';
import { BCRAFinancialDataProvider } from '@/core/contexts/Metrics/infrastructure/BCRAFinancialDataProvider';
import { HttpService } from '@/core/contexts/shared/http/domain/HttpService';
import { AxiosHttpService } from '@/core/contexts/shared/http/infrastructure/AxiosHttpService';
import { getSymbolPriceMonthlyUseCase } from '@/core/contexts/Symbol/application/getSymbolPriceMonthlyUseCase';
import { AlphavantageSymbolService } from '@/core/contexts/Symbol/infrastructure/AlphavantageSymbolService';

const httpService: HttpService = new AxiosHttpService();
const bcraService = new BCRAFinancialDataProvider(httpService);
const dolarService = new HttpBluelyticsDolar(httpService);
const symbolService = new AlphavantageSymbolService(httpService);

export const getPrimaryFinancialMetrics = getPrimaryFinancialMetricsUseCase(bcraService);
export const getDolars = getDolarsUseCase(dolarService);
export const getSymbolPriceMonthly = getSymbolPriceMonthlyUseCase(symbolService);
