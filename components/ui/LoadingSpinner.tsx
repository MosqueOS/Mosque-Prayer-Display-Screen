import React from "react";

export function LoadingSpinner() {

  return (
    <div className="flex justify-center items-center">
      <div className="h-6 w-6 animate-spin rounded-full border-4 border-gray-300 border-t-transparent"></div>
    </div>

  )
}