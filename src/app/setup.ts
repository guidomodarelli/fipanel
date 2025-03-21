import { getDolarsPricesUseCase } from '@/core/contexts/Dolar/application/getDolarsPricesUseCase';
import type { DolarProvider } from '@/core/contexts/Dolar/domain/DolarProvider';
import { BluelyticsDolarProvider } from '@/core/contexts/Dolar/infrastructure/BluelyticsDolarProvider';
import { getPrimaryFinancialMetricsUseCase } from '@/core/contexts/Metrics/application/getPrimaryFinancialMetricsUseCase';
import type { FinancialDataProvider } from '@/core/contexts/Metrics/domain/FinancialDataProvider';
import { BCRAFinancialDataProvider } from '@/core/contexts/Metrics/infrastructure/BCRAFinancialDataProvider';
import type { RssReader } from '@/core/contexts/RSS-Reader/domain/RssReader';
import { XmlParserRssReader } from '@/core/contexts/RSS-Reader/infrastructure/XmlParserRssReader';
import { getSymbolPriceDailyUseCase } from '@/core/contexts/Symbol/application/getSymbolPriceDailyUseCase';
import { getSymbolPriceMonthlyUseCase } from '@/core/contexts/Symbol/application/getSymbolPriceMonthlyUseCase';
import type { SymbolProvider } from '@/core/contexts/Symbol/domain/SymbolProvider';
import { MockSymbolProvider } from '@/core/contexts/Symbol/infrastructure/MockSymbolProvider';
import type { HttpService } from '@/core/contexts/shared/http/domain/HttpService';
import { FetchHttpService } from '@/core/contexts/shared/http/infrastructure/FetchHttpService';
import { LoggerFactory } from '@/core/contexts/shared/logger/domain/LoggerFactory';
import { NoopLogger } from '@/core/contexts/shared/logger/domain/NoopLogger';
import { ConsoleLogger } from '@/core/contexts/shared/logger/infrastructure/ConsoleLogger';
import type { XmlParser } from '@/core/contexts/shared/xml-parser/domain/XmlParser';
import { FastXmlParser } from '@/core/contexts/shared/xml-parser/infrastructure/FastXmlParser';
import { isDev } from '@/utils/node-env';

export const createLogger = LoggerFactory(isDev ? new ConsoleLogger() : new NoopLogger());
const httpService: HttpService = new FetchHttpService();
const bcraService: FinancialDataProvider = new BCRAFinancialDataProvider(httpService);
const dolarService: DolarProvider = new BluelyticsDolarProvider(httpService);
const symbolService: SymbolProvider = new MockSymbolProvider();
const xmlParser: XmlParser = new FastXmlParser();
export const rssReader: RssReader = new XmlParserRssReader(xmlParser, httpService);

export const getPrimaryFinancialMetrics = getPrimaryFinancialMetricsUseCase(bcraService);
export const getDolarsPrices = getDolarsPricesUseCase(dolarService);
export const getSymbolPriceMonthly = getSymbolPriceMonthlyUseCase(symbolService);
export const getSymbolPriceDaily = getSymbolPriceDailyUseCase(symbolService);
