"use client";

import { SearchBar } from "@/components/inputs/searchbar";
import SelectorList from "@/components/lists/SelectorList";
import { Box } from "@/components/structure/Box";
import { Title } from "@/components/typography/Title";
import { useMyCryptoList } from "@/contexts/CryptoListContext";
import { useSocket } from "@/contexts/WebsocketContext";
import { CryptoStreamEventReturn } from "@/core/interfaces/IWebsocketContext";
import { useEffect, useMemo, useRef, useState } from "react";
import styled, { css } from "styled-components";

export const MyCryptoSymbolLists = () => {
  const [symbolSearch, updateSymbolSearch] = useState("");
  const { getSymbolList, selectedCryptoLists } = useMyCryptoList();
  const { getSymbolUpdates, closeSocketUpdates } = useSocket();
  const [lastUpdates, setLastUpdates] = useState<{
    [key: string]: CryptoStreamEventReturn["data"];
  }>({});

  const handleSearchSymbols = (value: string) => updateSymbolSearch(value);

  const selectedCryptoSymbols = selectedCryptoLists.reduce<string[]>(
    (a, b) => [...a, ...b.symbols],
    []
  );

  const listUpdated = useMemo(() => {
    if (!selectedCryptoLists.length) return [];

    return getSymbolList({
      page: 0,
      size: 1000,
      search: symbolSearch?.toLowerCase(),
      symbols: selectedCryptoSymbols,
    }).map((item) => ({
      key: item.symbol,
      title: item.symbol,
      subtitle: item.baseAsset,
      icon: item.symbol,
      lastPrice: `${lastUpdates[item.symbol]?.c || "Waiting data..."}`,
      bidPrice: `${lastUpdates[item.symbol]?.b || "Waiting data..."}`,
      askPrice: `${lastUpdates[item.symbol]?.a || "Waiting data..."}`,
      priceChange: `${lastUpdates[item.symbol]?.P || 0}`,
    }));
  }, [lastUpdates, selectedCryptoLists, symbolSearch]);

  const updateSymbolEvent = (ev: CryptoStreamEventReturn) => {
    if (!ev?.stream) return;
    setLastUpdates((prevUpdates) => ({
      ...prevUpdates,
      [ev.data.s]: ev.data,
    }));
  };

  useEffect(() => {
    if (!selectedCryptoSymbols.length) return closeSocketUpdates();
    getSymbolUpdates(selectedCryptoSymbols, updateSymbolEvent);
  }, [selectedCryptoLists]);

  const columns = [
    { key: "title", title: "Symbol" },
    { key: "lastPrice", title: "Last Price" },
    { key: "bidPrice", title: "Bid Price" },
    { key: "askPrice", title: "Ask Price" },
    {
      key: "priceChange",
      title: "Price Change (%)",
      render: PriceChangePercentCards,
    },
  ];

  return (
    <Box radius={"2px"} px={2} py={0} paper={null} direction="column" gap="1em">
      <SearchBar onSearch={handleSearchSymbols} placeholder="Search..." />
      <SelectorList
        allSelection={false}
        columns={columns}
        items={listUpdated}
        maxh="75vh"
        maxw="300px"
        selectable={false}
        mobile={{
          td: { "font-size": "0.5em", gap: "0px", "min-width": "51px" },
          tr: { "flex-direction": "row", gap: "0px" },
          th: { "flex-direction": "row", "font-size": "0.6em", gap: "0px" },
          table: {},
        }}
        noDataMessage="No data found. Please select one of your lists or create and select a new list to view real time data."
      />
    </Box>
  );
};

const PriceChangePercentCards = (data: string | number) =>
  +data > 0 ? (
    <GreenChip>
      <p>{data}%</p>
    </GreenChip>
  ) : +data === 0 ? (
    <GreyChip>
      <p>{data}%</p>
    </GreyChip>
  ) : (
    <RedChip>
      <p>{data}%</p>
    </RedChip>
  );

const ChipPattern = css({
  width: "100%",
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const GreyChip = styled.span`
  ${ChipPattern}
  p {
    border-radius: 10px;
    background-color: #ccc;
    color: #444;
    padding: 2px;
    width: 100px;
  }
`;

const GreenChip = styled.span`
  ${ChipPattern}

  p {
    border-radius: 10px;
    background-color: #afa;
    color: #484;
    padding: 2px;
    width: 100px;
  }
`;

const RedChip = styled.span`
  ${ChipPattern}
  p {
    border-radius: 10px;
    background-color: #faa;
    color: #844;
    padding: 2px;
    width: 100px;
  }
`;
