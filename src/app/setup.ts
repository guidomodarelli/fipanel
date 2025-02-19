import { getDolarsPricesUseCase } from '@/core/contexts/Dolar/application/getDolarsPricesUseCase';
import { DolarProvider } from '@/core/contexts/Dolar/domain/DolarProvider';
import { BluelyticsDolarProvider } from '@/core/contexts/Dolar/infrastructure/BluelyticsDolarProvider';
import { getPrimaryFinancialMetricsUseCase } from '@/core/contexts/Metrics/application/getPrimaryFinancialMetricsUseCase';
import { FinancialDataProvider } from '@/core/contexts/Metrics/domain/FinancialDataProvider';
import { BCRAFinancialDataProvider } from '@/core/contexts/Metrics/infrastructure/BCRAFinancialDataProvider';
import { HttpService } from '@/core/contexts/shared/http/domain/HttpService';
import { FetchHttpService } from '@/core/contexts/shared/http/infrastructure/FetchHttpService';
import { getSymbolPriceDailyUseCase } from '@/core/contexts/Symbol/application/getSymbolPriceDailyUseCase';
import { getSymbolPriceMonthlyUseCase } from '@/core/contexts/Symbol/application/getSymbolPriceMonthlyUseCase';
import { SymbolProvider } from '@/core/contexts/Symbol/domain/SymbolProvider';
import { MockSymbolProvider } from '@/core/contexts/Symbol/infrastructure/MockSymbolProvider';

const httpService: HttpService = new FetchHttpService();
const bcraService: FinancialDataProvider = new BCRAFinancialDataProvider(httpService);
const dolarService: DolarProvider = new BluelyticsDolarProvider(httpService);
const symbolService: SymbolProvider = new MockSymbolProvider();

export const getPrimaryFinancialMetrics = getPrimaryFinancialMetricsUseCase(bcraService);
export const getDolarsPrices = getDolarsPricesUseCase(dolarService);
export const getSymbolPriceMonthly = getSymbolPriceMonthlyUseCase(symbolService);
export const getSymbolPriceDaily = getSymbolPriceDailyUseCase(symbolService);
