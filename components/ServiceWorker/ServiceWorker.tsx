"use client"
import { useEffect } from "react"

export default function ServiceWorker() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js", { scope: "/" })
        .then((registration) => console.log("scope is: ", registration.scope))
    }
  }, [])

  return <></>
}
