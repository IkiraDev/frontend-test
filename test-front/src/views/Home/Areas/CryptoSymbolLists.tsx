"use client";

import { SearchBar } from "@/components/inputs/searchbar";
import SelectorList from "@/components/lists/SelectorList";
import { Box } from "@/components/structure/Box";
import { Divider } from "@/components/structure/Divider";
import { Title } from "@/components/typography/Title";
import { useMyCryptoList } from "@/contexts/CryptoListContext";
import { useDialog } from "@/contexts/DialogContext";
import { PropsWithChildren, useEffect, useState } from "react";

export const CryptoSymbolLists = ({
  children,
  submitCallback,
  onSelect,
  selected,
}: PropsWithChildren<{
  submitCallback?: (items: string[]) => void;
  onSelect?: (data: string[]) => void;
  selected?: string[];
}>) => {
  const [symbolSearch, updateSymbolSearch] = useState("");
  const { defaultSelected } = useDialog();
  const [selectedItems, setSelectedItems] = useState<string[]>(defaultSelected || []);
  const { getSymbolList } = useMyCryptoList();

  const handleSearchSymbols = (value: string) => updateSymbolSearch(value);

  const handleAdd = () => submitCallback?.(selectedItems);

  const list = getSymbolList({ page: 0, size: 100, search: symbolSearch }).map((item) => ({
    key: item.symbol,
    title: item.symbol,
    subtitle: item.baseAsset,
    icon: item.symbol,
  }));

  const handleUpdateSelectItems = (items: string[]) => {
    setSelectedItems(items);
    onSelect?.(items);
  };

  useEffect(() => {
    if (!selected) return;
    setSelectedItems(selected);
  }, [selected]);

  return (
    <Box px={1} py={1} direction="column" gap={"8px"} radius={"2px"}>
      <Divider />
      <SearchBar onSearch={handleSearchSymbols} placeholder="Search..." />
      <SelectorList
        columns={[{ key: "title", title: "Symbol" }]}
        selectedItems={selected}
        items={list}
        maxh="50vh"
        maxw="300px"
        radius="10px"
        updateSelectedItems={handleUpdateSelectItems}
      />
      {children && <div onClick={handleAdd}>{children}</div>}
    </Box>
  );
};
