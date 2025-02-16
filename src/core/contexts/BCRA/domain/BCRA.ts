import { PrincipalesVariables } from "./PrincipalesVariables";

export interface BCRA {
  getPrincipalesVariables(): Promise<PrincipalesVariables>;
}