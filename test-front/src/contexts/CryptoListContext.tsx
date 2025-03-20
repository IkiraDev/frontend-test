import { CryptoList, ICryptoListContext } from "@/core/interfaces/ICryptoListContext";
import { Crypto } from "@/core/types/Crypto";
import { Pagination } from "@/core/types/data";
import { filterData } from "@/core/utils/filtersFunctions";

import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { useSocket } from "./WebsocketContext";

const initialValue: ICryptoListContext = {
  cryptoList: [],
  symbolList: [],
  getSymbolList: () => [],
  getCryptoList: () => [],
  selectedCryptoLists: [],
  selectCryptoList: () => null,
  updateCryptoList: () => null,
  removeSelectedLists: () => null,
};

export const CryptoListContext = createContext<ICryptoListContext>(initialValue);

export const CryptoListProvider = ({
  children,
  list,
}: PropsWithChildren<{ list: Crypto.CryptoSymbols[] }>) => {
  const [cryptoList, setCryptoList] = useState<CryptoList[]>([]);
  const [selectedCryptoLists, setCryptoListSelected] = useState<CryptoList[]>([]);
  const { getSymbolUpdates } = useSocket();

  const selectCryptoList = (key: string) => {
    const cryptoListItem = cryptoList.find((item) => item.name === key);
    const includesInList = selectedCryptoLists.find((item) => item.name === key);
    if (!cryptoListItem) return;

    setCryptoListSelected((last) =>
      !!includesInList
        ? last.filter((item) => item.name !== cryptoListItem.name)
        : [...last, cryptoListItem]
    );
  };

  const getSymbolList = (pagination: Pagination & { symbols?: string[] }) =>
    filterData(pagination, list, ["symbol", "quoteAsset", "baseAsset"]).filter((item) =>
      pagination?.symbols?.length ? pagination?.symbols?.includes(item.symbol) : item
    );

  const getCryptoList = (pagination: Pagination) => filterData(pagination, cryptoList, ["name"]);

  const updateCryptoList = (list: CryptoList, updateIndex: number = -1) => {
    if (updateIndex >= 0) {
      const toUpdate = cryptoList.map((item, index) => (index === updateIndex ? list : item));
      const selecteds = selectedCryptoLists.map((item, index) =>
        index === updateIndex ? list : item
      );
      const selectedCryptoSymbols = toUpdate.reduce<string[]>((a, b) => [...a, ...b.symbols], []);
      setCryptoList(toUpdate);
      setCryptoListSelected(selecteds);
      getSymbolUpdates(selectedCryptoSymbols);
      return;
    }
    const newList = Array.from(cryptoList);
    newList.push(list);
    setCryptoList(newList);
  };

  const removeSelectedLists = () => {
    setCryptoList(
      cryptoList.filter((item) => !selectedCryptoLists.map((item) => item.name).includes(item.name))
    );
    setCryptoListSelected([]);
  };

  return (
    <CryptoListContext.Provider
      value={{
        cryptoList,
        symbolList: list,
        getSymbolList,
        getCryptoList,
        selectCryptoList,
        selectedCryptoLists,
        updateCryptoList,
        removeSelectedLists,
      }}
    >
      {children}
    </CryptoListContext.Provider>
  );
};

export const useMyCryptoList = () => useContext(CryptoListContext);
