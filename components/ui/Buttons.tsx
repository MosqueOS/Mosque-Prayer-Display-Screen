import React from "react";


export function PrimaryButton ({
  //@ts-ignore
  onClick,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {

  return (
    <button
      type="submit"
      className="mt-6 w-full px-4 py-3 rounded-xl transition-all
      bg-mosqueBrand-primary text-mosqueBrand-onPrimary font-semibold
      hover:bg-mosqueBrand-primary/90 active:bg-mosqueBrand-primary/80
      disabled:bg-mosqueBrand-primary/40
      focus:outline-none focus:ring-2 focus:bg-mosqueBrand-primary
      focus:ring-offset-2 focus:ring-offset-mosqueBrand-primary"
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}