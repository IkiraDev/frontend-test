"use client";

import { Box } from "@/components/structure/Box";
import { CryptoListProvider } from "@/contexts/CryptoListContext";
import { Crypto } from "@/core/types/Crypto";
import { MySymbolListData } from "./Areas/MySymbolListData";
import { ThemeContextProvider } from "@/contexts/ThemeContext";
import { MyCryptoList } from "./Areas/MyCryptoList";
import { WebsocketProvider } from "@/contexts/WebsocketContext";

export const SymbolListView = ({ list }: { list: Crypto.CryptoSymbols[] }) => {
  return (
    <WebsocketProvider>
      <ThemeContextProvider>
        <CryptoListProvider list={list}>
          <Box
            p={0}
            py={0}
            px={0}
            gap={"10px"}
            width={"100vw"}
            mobile={{ "flex-direction": "column" }}
          >
            <MyCryptoList />
            <MySymbolListData />
          </Box>
        </CryptoListProvider>
      </ThemeContextProvider>
    </WebsocketProvider>
  );
};
