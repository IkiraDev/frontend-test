"use client";

import { Button } from "@/components/inputs/button";
import { Input } from "@/components/inputs/Input";
import { Box } from "@/components/structure/Box";
import { Title } from "@/components/typography/Title";
import { CryptoSymbolLists } from "./CryptoSymbolLists";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useMyCryptoList } from "@/contexts/CryptoListContext";
import { useDialog } from "@/contexts/DialogContext";

export const AddNewSymbolModal = ({
  onComplete,
  updateIndex,
}: {
  onComplete: () => void;
  updateIndex?: number;
}) => {
  const [selectedSymbols, updateSelectedSymbols] = useState<string[]>([]);
  const { updateCryptoList, cryptoList } = useMyCryptoList();
  const { open, defaultSelected, defaultValue } = useDialog();
  const [name, setName] = useState(!updateIndex ? "" : defaultValue);

  const handleUpdateList = () => {
    if (name.length < 3) return toast.error("List name need to be at least 3 length");
    if (updateIndex! >= 0) return updateCryptoList({ name, symbols: selectedSymbols }, updateIndex);
    if (cryptoList.find((item) => item.name.toLowerCase().trim() === name.toLowerCase().trim()))
      return toast.error("This name is already in use.");
    updateCryptoList({ name, symbols: selectedSymbols });
  };

  const clearData = () => {
    updateSelectedSymbols([]);
    setName("");
    onComplete?.();
  };

  const handleComplete = () => {
    handleUpdateList();
    clearData();
    onComplete?.();
  };

  useEffect(() => {
    if (!open) return;
    if (!(updateIndex! >= 0)) {
      setName("");
      updateSelectedSymbols([]);
      return;
    }
    setName(defaultValue);
    updateSelectedSymbols(defaultSelected);
  }, [defaultValue, defaultSelected, open]);

  return (
    <Box direction={"column"} gap={"1rem"} minw={"350px"} width={"30vw"}>
      <Title>{!!defaultValue ? `Update List: ${defaultValue}` : "New List"}</Title>
      <Box direction="column" py={0} px={0} gap={"1rem"}>
        <Input value={name} onInput={setName} placeholder="Enter the list name" />
        <CryptoSymbolLists selected={selectedSymbols} onSelect={updateSelectedSymbols} />
      </Box>
      <Box py={0} px={0} gap={"1rem"} justify="space-between">
        <Button onClick={onComplete}>Cancel</Button>
        <Button onClick={handleComplete}>{defaultValue ? "Update" : "Create"}</Button>
      </Box>
    </Box>
  );
};
