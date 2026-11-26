"use client";

import { ConfirmDialogProps } from "@/api/types/confirm.type";
import { useEffect} from "react";



const tones = {
  danger: {
    icon: "bg-red-100 text-red-500",
    button: "bg-red-600 hover:bg-red-700",
  },
  success: {
    icon: "bg-green-100 text-green-600",
    button: "bg-green-600 hover:bg-green-700",
  },
};

export default function ConfirmDialog({
  open,
  icon,
  tone = "danger",
  title,
  description,
  cancelText,
  confirmText,
  loading = false,
  onClose,
  onConfirm,
}: ConfirmDialogProps) {
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4"
      onClick={onClose}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-2xl bg-white px-8 py-10 text-center shadow-2xl"
      >
        <span
          className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full text-4xl ${tones[tone].icon}`}
        >
          {icon}
        </span>

        <h2 id="confirm-title" className="mt-6 text-2xl font-bold text-gray-900">
          {title}
        </h2>
        <p className="mx-auto mt-3 max-w-sm text-gray-500">{description}</p>

        <div className="mt-8 flex items-center justify-center gap-3">
          {cancelText && (
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="cursor-pointer rounded-xl bg-gray-100 px-8 py-3 font-semibold text-gray-800 transition hover:bg-gray-200 disabled:opacity-60"
            >
              {cancelText}
            </button>
          )}
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={`cursor-pointer rounded-xl px-8 py-3 font-semibold text-white transition disabled:opacity-60 ${tones[tone].button}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}