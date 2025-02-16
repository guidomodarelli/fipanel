import { AxiosHttpService } from '@/core/contexts/shared/http/infrastructure/AxiosHttpService';
import { HttpService } from '@/core/contexts/shared/http/domain/HttpService';
import { getPrincipalesVariablesUseCase } from '@/core/contexts/BCRA/application/getPrincipalesVariablesUseCase';
import { HttpBCRA } from '@/core/contexts/BCRA/infrastructure/HttpBCRA';
import { getDolarsUseCase } from '@/core/contexts/Dolar/application/getDolarsUseCase';
import { HttpBluelyticsDolar } from '@/core/contexts/Dolar/infrastructure/HttpBluelyticsDolar';
import { AlphavantageSymbolService } from '@/core/contexts/Alphavantage/infrastructure/AlphavantageSymbolService';
import { getSymbolPriceMonthlyUseCase } from '@/core/contexts/Alphavantage/application/getSymbolPriceMonthlyUseCase';

const httpService: HttpService = new AxiosHttpService();
const bcraService = new HttpBCRA(httpService);
const dolarService = new HttpBluelyticsDolar(httpService);
const symbolService = new AlphavantageSymbolService(httpService);

export const getPrincipalesVariables = getPrincipalesVariablesUseCase(bcraService);
export const getDolars = getDolarsUseCase(dolarService);
export const getSymbolPriceMonthly = getSymbolPriceMonthlyUseCase(symbolService);
