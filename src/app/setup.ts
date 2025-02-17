import { getDolarsPricesUseCase } from '@/core/contexts/Dolar/application/getDolarsUseCase';
import { DolarProvider } from '@/core/contexts/Dolar/domain/Dolar';
import { BluelyticsDolarProvider } from '@/core/contexts/Dolar/infrastructure/BluelyticsDolarProvider';
import { getPrimaryFinancialMetricsUseCase } from '@/core/contexts/Metrics/application/getPrimaryFinancialMetricsUseCase';
import { FinancialDataProvider } from '@/core/contexts/Metrics/domain/FinancialDataProvider';
import { BCRAFinancialDataProvider } from '@/core/contexts/Metrics/infrastructure/BCRAFinancialDataProvider';
import { HttpService } from '@/core/contexts/shared/http/domain/HttpService';
import { AxiosHttpService } from '@/core/contexts/shared/http/infrastructure/AxiosHttpService';
import { getSymbolPriceMonthlyUseCase } from '@/core/contexts/Symbol/application/getSymbolPriceMonthlyUseCase';
import { SymbolService } from '@/core/contexts/Symbol/domain/SymbolService';
import { AlphavantageSymbolService } from '@/core/contexts/Symbol/infrastructure/AlphavantageSymbolService';

const httpService: HttpService = new AxiosHttpService();
const bcraService: FinancialDataProvider = new BCRAFinancialDataProvider(httpService);
const dolarService: DolarProvider = new BluelyticsDolarProvider(httpService);
const symbolService: SymbolService = new AlphavantageSymbolService(httpService);

export const getPrimaryFinancialMetrics = getPrimaryFinancialMetricsUseCase(bcraService);
export const getDolars = getDolarsPricesUseCase(dolarService);
export const getSymbolPriceMonthly = getSymbolPriceMonthlyUseCase(symbolService);
