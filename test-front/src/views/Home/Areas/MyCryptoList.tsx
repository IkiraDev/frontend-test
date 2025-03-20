"use client";

import { PropsWithChildren, useState } from "react";
import { useMyCryptoList } from "@/contexts/CryptoListContext";
import { Box } from "@/components/structure/Box";
import { Title } from "@/components/typography/Title";
import { Divider } from "@/components/structure/Divider";
import { SearchBar } from "@/components/inputs/searchbar";
import SelectorList from "@/components/lists/SelectorList";
import { Button } from "@/components/inputs/button";
import { Dialog } from "@/components/dialogs/dialog";
import { AddNewSymbolModal } from "./AddNewSymbolModal";

export const MyCryptoList = ({
  children,
  submitCallback,
}: PropsWithChildren<{ submitCallback?: (items: string[]) => void }>) => {
  const { cryptoList, selectCryptoList, selectedCryptoLists, removeSelectedLists } =
    useMyCryptoList();

  const list = cryptoList.map((item) => ({
    key: item.name,
    title: item.name,
    subtitle: item.symbols.length.toString(),
  }));

  const handleCellClick = (key: string) => {
    selectCryptoList(key);
  };

  return (
    <Box
      px={0}
      py={0}
      direction="column"
      gap={"8px"}
      paper={"simple"}
      radius={"2px"}
      minw={"230px"}
    >
      <Box py={0} pt={1} center="align" gap={"15px"} justify="space-between">
        <Title size={"1.2em"}>Crypto List</Title>
        <Dialog trigger={() => <Button>new</Button>} defaultValue="" defaultSelected={[]}>
          {({ handleClose }) => <AddNewSymbolModal onComplete={handleClose} />}
        </Dialog>
      </Box>
      <Divider />
      <Box py={0} height={"100%"}>
        <SelectorList
          allSelection={false}
          columns={[
            { key: "title", title: "", view: false },
            { key: "subtitle", title: "", view: false, maxw: "50px" },
          ]}
          items={list}
          selectedItems={selectedCryptoLists.map((item) => item.name)}
          maxh="50vh"
          maxw="300px"
          radius="10px"
          noDataMessage="No crypto list found."
          onCellClick={handleCellClick}
        />
      </Box>
      {!!selectedCryptoLists.length && (
        <Box>
          <Button onClick={removeSelectedLists}>Remover Selecionados</Button>
        </Box>
      )}
    </Box>
  );
};
