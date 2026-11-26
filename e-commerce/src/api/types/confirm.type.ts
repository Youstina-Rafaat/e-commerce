import { ReactNode } from "react";

export interface ConfirmDialogProps {
  open: boolean;
  icon: ReactNode;
  tone?: "danger" | "success";
  title: string;
  description: ReactNode;
  cancelText?: string; 
  confirmText: string;
  loading?: boolean;
  onClose: () => void; 
  onConfirm: () => void;
};