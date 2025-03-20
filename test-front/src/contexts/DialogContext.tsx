import { IDialogContext } from "@/core/interfaces/IDialogContext";
import { createContext, PropsWithChildren, useContext, useState } from "react";

const initialValue: IDialogContext = {
  open: false,
  handleClose: () => null,
  handleOpen: () => null,
  defaultValue: "",
  defaultSelected: [],
};

export const DialogContext = createContext<IDialogContext>(initialValue);

export const DialogContextProvider = ({
  children,
  open,
  defaultValue = "",
  defaultSelected = [],
}: PropsWithChildren<{ open?: boolean; defaultValue?: string; defaultSelected?: string[] }>) => {
  const [dialogStatus, updateDialogStatus] = useState<boolean>(open || false);

  const handleClose = () => updateDialogStatus(false);

  const handleOpen = () => updateDialogStatus(true);

  return (
    <DialogContext.Provider
      value={{ open: dialogStatus, handleClose, handleOpen, defaultValue, defaultSelected }}
    >
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = () => useContext(DialogContext);
