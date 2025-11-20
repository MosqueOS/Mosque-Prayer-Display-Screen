"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  size?: "sm" | "md" | "lg";
};

const sizeClasses: Record<NonNullable<ModalProps["size"]>, string> = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
};

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  showCloseButton = true,
  size = "md",
}: ModalProps) {
  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const content = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      aria-modal="true"
      role="dialog"
      aria-labelledby={title ? "modal-title" : undefined}
      // onClick={onClose} // click on backdrop closes
    >
      <div
        className={`w-full ${sizeClasses[size]} mx-4 rounded-2xl bg-white shadow-xl`}
        onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
      >
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 ">
            {title && (
              <h2
                id="modal-title"
                className="text-base font-semibold text-slate-900 "
              >
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                className="ml-4 inline-flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-white"
                aria-label="Close"
              >
                ✕
              </button>
            )}
          </div>
        )}

        <div className="px-2 py-4 text-sm text-slate-700">
          {children}
        </div>
      </div>
    </div>
  );

  // Use portal so it can be used anywhere in the tree
  if (typeof document === "undefined") {
    return content;
  }

  return createPortal(content, document.body);
}
