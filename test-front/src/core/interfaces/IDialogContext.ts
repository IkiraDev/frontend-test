export interface IDialogContext {
  open: boolean;
  handleClose: () => void;
  handleOpen: () => void;
  defaultValue: string;
  defaultSelected: string[];
}
