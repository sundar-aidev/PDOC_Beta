// components/ui/modal.tsx
"use client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  confirmText?: string;
  onConfirm?: () => void;
  valueChange?: { from: number; to: number }; // NEW prop
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  confirmText = "Confirm",
  onConfirm,
  valueChange,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-2xl w-full relative">
        {/* Header Row */}
        <div className="flex justify-between items-center mb-4">
          {title && <h2 className="text-lg font-semibold">{title}</h2>}
          {valueChange && (
            <span className="text-green-600 font-bold text-sm">
              {valueChange.from}/100 → {valueChange.to}/100
            </span>
          )}
        </div>

        {/* Body */}
        <div className="text-sm text-gray-700 mb-6">{children}</div>

        {/* Actions */}
        <div className="flex justify-end space-x-3">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="secondary" onClick={onConfirm}>{confirmText}</Button>
        </div>
      </div>
    </div>
  );
}
