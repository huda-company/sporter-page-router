import { Copy } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { AlertModalProps } from './types';
import { FC } from 'react';
import React from 'react';

const AlertModal: FC<AlertModalProps> = ({ open, title, content, onClose }) => {
  const [show, setShow] = React.useState(false);
  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle>
              <u>{title}</u>
            </DialogTitle>
            <DialogDescription>{content}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start"></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AlertModal;
