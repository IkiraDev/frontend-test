import { Crypto } from "../types/Crypto";
import { Pagination } from "../types/data";

export interface ICryptoListContext {
  cryptoList: CryptoList[];
  symbolList: Crypto.CryptoSymbols[];
  getSymbolList: (pagination: Pagination & { symbols?: string[] }) => Crypto.CryptoSymbols[];
  getCryptoList: (props: Pagination) => CryptoList[];
  selectedCryptoLists: CryptoList[];
  selectCryptoList: (key: string) => void;
  updateCryptoList: (list: CryptoList, updateIndex?: number) => void;
  removeSelectedLists: () => void;
}

export interface CryptoList {
  name: string;
  symbols: string[];
}
