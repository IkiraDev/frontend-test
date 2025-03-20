import { useState, JSX } from "react";
import styled, { css } from "styled-components";
import { Box } from "../structure/Box";
import { mobile } from "@/core/theme/breakpoints";
import { DialogContextProvider, useDialog } from "@/contexts/DialogContext";

const DialogComponent = ({
  children,
  trigger,
}: {
  children: (props: { handleClose: () => void }) => JSX.Element;
  trigger?: (handleOpen: () => void) => JSX.Element;
}) => {
  const { open: dialogStatus, handleOpen, handleClose } = useDialog();

  return (
    <>
      <Box py={0} px={0} onClick={handleOpen}>
        {trigger?.(handleOpen)}
      </Box>
      <DialogContainer open={dialogStatus}>
        <DialogBackdrop onClick={handleClose} />
        <DialogContent>
          <Box paper={"simple"} center="full" radius={"2px"}>
            {children({ handleClose })}
          </Box>
        </DialogContent>
      </DialogContainer>
    </>
  );
};

export const Dialog = (props: {
  children: (props: { handleClose: () => void }) => JSX.Element;
  open?: boolean;
  trigger?: (handleOpen: () => void) => JSX.Element;
  defaultValue?: string;
  defaultSelected?: string[];
}) => (
  <DialogContextProvider
    open={props.open}
    defaultValue={props.defaultValue}
    defaultSelected={props.defaultSelected}
  >
    <DialogComponent {...props} />
  </DialogContextProvider>
);

const DialogContainer = styled.div<{ open: boolean }>`
  display: ${(props) => (!!props.open ? "flex" : "none")};
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
`;

const DialogContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 1000;
  ${mobile(css`
    max-width: 250px;
    background-color: black;
  `)}
`;

const DialogBackdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  opacity: 1;
  backdrop-filter: blur(4px);
  z-index: 1;
`;
