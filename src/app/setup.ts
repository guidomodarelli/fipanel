import { getDolarsPricesUseCase } from '@/core/contexts/Dolar/application/getDolarsPricesUseCase';
import { DolarProvider } from '@/core/contexts/Dolar/domain/DolarProvider';
import { BluelyticsDolarProvider } from '@/core/contexts/Dolar/infrastructure/BluelyticsDolarProvider';
import { getPrimaryFinancialMetricsUseCase } from '@/core/contexts/Metrics/application/getPrimaryFinancialMetricsUseCase';
import { FinancialDataProvider } from '@/core/contexts/Metrics/domain/FinancialDataProvider';
import { BCRAFinancialDataProvider } from '@/core/contexts/Metrics/infrastructure/BCRAFinancialDataProvider';
import { Calendar } from '@/core/contexts/shared/date/domain/Calendar';
import { DayjsCalendar } from '@/core/contexts/shared/date/infrastructure/DayjsCalendar';
import { HttpService } from '@/core/contexts/shared/http/domain/HttpService';
import { FetchHttpService } from '@/core/contexts/shared/http/infrastructure/FetchHttpService';
import { Logger } from '@/core/contexts/shared/logger/domain/Logger';
import { ConsoleLogger } from '@/core/contexts/shared/logger/infrastructure/ConsoleLogger';
import { getSymbolPriceDailyUseCase } from '@/core/contexts/Symbol/application/getSymbolPriceDailyUseCase';
import { getSymbolPriceMonthlyUseCase } from '@/core/contexts/Symbol/application/getSymbolPriceMonthlyUseCase';
import { SymbolProvider } from '@/core/contexts/Symbol/domain/SymbolProvider';
import { MockSymbolProvider } from '@/core/contexts/Symbol/infrastructure/MockSymbolProvider';

export const caljs: (date?: Date) => Calendar = (date?: Date) => new DayjsCalendar(date);
export const logger: Logger = new ConsoleLogger();
const httpService: HttpService = new FetchHttpService();
const bcraService: FinancialDataProvider = new BCRAFinancialDataProvider(httpService);
const dolarService: DolarProvider = new BluelyticsDolarProvider(httpService);
const symbolService: SymbolProvider = new MockSymbolProvider();

export const getPrimaryFinancialMetrics = getPrimaryFinancialMetricsUseCase(bcraService);
export const getDolarsPrices = getDolarsPricesUseCase(dolarService);
export const getSymbolPriceMonthly = getSymbolPriceMonthlyUseCase(symbolService);
export const getSymbolPriceDaily = getSymbolPriceDailyUseCase(symbolService);
