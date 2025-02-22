import { getDolarsPricesUseCase } from '@/core/contexts/Dolar/application/getDolarsPricesUseCase';
import type { DolarProvider } from '@/core/contexts/Dolar/domain/DolarProvider';
import { BluelyticsDolarProvider } from '@/core/contexts/Dolar/infrastructure/BluelyticsDolarProvider';
import { getPrimaryFinancialMetricsUseCase } from '@/core/contexts/Metrics/application/getPrimaryFinancialMetricsUseCase';
import type { FinancialDataProvider } from '@/core/contexts/Metrics/domain/FinancialDataProvider';
import { BCRAFinancialDataProvider } from '@/core/contexts/Metrics/infrastructure/BCRAFinancialDataProvider';
import { getSymbolPriceDailyUseCase } from '@/core/contexts/Symbol/application/getSymbolPriceDailyUseCase';
import { getSymbolPriceMonthlyUseCase } from '@/core/contexts/Symbol/application/getSymbolPriceMonthlyUseCase';
import type { SymbolProvider } from '@/core/contexts/Symbol/domain/SymbolProvider';
import { AlphavantageSymbolProvider } from '@/core/contexts/Symbol/infrastructure/AlphavantageSymbolProvider';
import type { Calendar } from '@/core/contexts/shared/date/domain/Calendar';
import { DayjsCalendar } from '@/core/contexts/shared/date/infrastructure/DayjsCalendar';
import type { HttpService } from '@/core/contexts/shared/http/domain/HttpService';
import { FetchHttpService } from '@/core/contexts/shared/http/infrastructure/FetchHttpService';
import { ConsoleLogger } from '@/core/contexts/shared/logger/infrastructure/ConsoleLogger';
import { NoopLogger } from '@/core/contexts/shared/logger/infrastructure/NoopLogger';

export const caljs: (date?: Date) => Calendar = (date?: Date) => new DayjsCalendar(date);
export const createLogger = (InitialContext: Function, status: 'enabled' | 'disabled') => {
  return status === 'enabled' ? ConsoleLogger.create([InitialContext.name]) : NoopLogger;
};
const httpService: HttpService = new FetchHttpService();
const bcraService: FinancialDataProvider = new BCRAFinancialDataProvider(httpService);
const dolarService: DolarProvider = new BluelyticsDolarProvider(httpService);
const symbolService: SymbolProvider = new AlphavantageSymbolProvider(
  createLogger(AlphavantageSymbolProvider, 'disabled'),
  httpService,
);

export const getPrimaryFinancialMetrics = getPrimaryFinancialMetricsUseCase(bcraService);
export const getDolarsPrices = getDolarsPricesUseCase(dolarService);
export const getSymbolPriceMonthly = getSymbolPriceMonthlyUseCase(symbolService);
export const getSymbolPriceDaily = getSymbolPriceDailyUseCase(symbolService);
