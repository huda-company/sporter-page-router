import { ReactNode } from 'react';

export type AlertModalProps = {
  open: boolean;
  title: string;
  content: string | ReactNode;
  success?: boolean;
  onClose?: (param: any) => void;
};
