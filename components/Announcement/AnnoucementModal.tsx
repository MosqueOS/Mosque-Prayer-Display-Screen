import React from 'react'

type AnnouncementModalProps = {
  isOpen: boolean;
  children: React.ReactNode;
};

export default function AnnouncementModal({
  isOpen,
  children,
}: AnnouncementModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      aria-modal="true"
      role="dialog"
    >
      <div
        className={`w-full max-w-5xl mx-4 rounded-2xl bg-white shadow-xl`}
        onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
      >
        <div className="px-2 py-4 text-sm text-slate-700">
          {children}
        </div>
      </div>
    </div>
  )
}