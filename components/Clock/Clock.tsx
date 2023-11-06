"use client"

import moment from "moment"
import { useEffect, useState } from "react"

export default function Clock({ darkMode = false }: { darkMode?: boolean }) {
  const format = "h:mm A"
  const [time, setTime] = useState(moment().format(format))

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment().format(format))
    }, 1000)

    return () => clearInterval(interval)
  }, [format])

  return (
    <div
      className={`${
        !darkMode ? "bg-white" : ""
      } p-7 text-center md:text-left md:w-fit`}
    >
      <time
        className={`text-5xl md:text-8xl font-bold ${
          !darkMode ? "text-mosqueThemeColor" : "text-gray-500"
        }`}
      >
        {time}
      </time>
    </div>
  )
}
