"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./alertDialog";

interface ErrorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  confirmText?: string;
}

const ErrorDialog: React.FC<ErrorDialogProps> = ({
  isOpen,
  onClose,
  title = "오류",
  message,
  confirmText = "확인",
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-white rounded-lg shadow-xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-600 font-sansKR-SemiBold">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-700 font-sansKR-Regular">
            {message}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogAction
          onClick={onClose}
          className="bg-red-600 hover:bg-red-700 text-white font-sansKR-SemiBold"
        >
          {confirmText}
        </AlertDialogAction>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ErrorDialog; 