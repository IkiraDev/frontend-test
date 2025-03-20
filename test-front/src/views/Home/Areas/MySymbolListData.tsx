"use client";

import { Box } from "@/components/structure/Box";
import { MyCryptoSymbolLists } from "./MyCryptoSymbolLists";
import { Title } from "@/components/typography/Title";
import { Divider } from "@/components/structure/Divider";
import { SelectedSymbolsEditList } from "./SelectedSymbolsEditList";

export const MySymbolListData = () => {
  return (
    <Box
      py={2}
      px={0}
      width={"100%"}
      direction="column"
      paper={"simple"}
      radius={"2px"}
      gap={"10px"}
    >
      <Box py={"6px"} px={2}>
        <Title size={"1.3em"}>Real Time Trade List</Title>
      </Box>
      <Divider />
      <SelectedSymbolsEditList />
      <MyCryptoSymbolLists />
    </Box>
  );
};
