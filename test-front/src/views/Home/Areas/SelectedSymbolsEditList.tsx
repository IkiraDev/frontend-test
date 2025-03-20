"use client";

import { Dialog } from "@/components/dialogs/dialog";
import { Box } from "@/components/structure/Box";
import { useMyCryptoList } from "@/contexts/CryptoListContext";
import { Edit } from "lucide-react";
import styled from "styled-components";
import { AddNewSymbolModal } from "./AddNewSymbolModal";

export const SelectedSymbolsEditList = () => {
  const { selectedCryptoLists } = useMyCryptoList();
  return (
    <Box py={0} gap={"1rem"}>
      {selectedCryptoLists.map((item, i) => (
        <Dialog
          key={"editable" + i + item.name}
          trigger={() => (
            <SelectedCryptoListCard key={item.name + "card" + i}>
              <p>{item.name}</p>
              <Edit />
            </SelectedCryptoListCard>
          )}
          defaultValue={item.name}
          defaultSelected={item.symbols}
        >
          {({ handleClose }) => <AddNewSymbolModal onComplete={handleClose} updateIndex={i} />}
        </Dialog>
      ))}
    </Box>
  );
};

const SelectedCryptoListCard = styled.div`
  background-color: #eee;
  padding: 10px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: ${(props) => props?.theme?.colors?.secondary};
    transform: scale(1.03);
  }
  &:active {
    background-color: ${(props) => props?.theme?.colors?.secondary};
    transform: scale(0.99);
  }
`;
