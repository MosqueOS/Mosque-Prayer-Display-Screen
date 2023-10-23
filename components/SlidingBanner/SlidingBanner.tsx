"use client"

import { useEffect, useState } from "react"

export default function SlidingBanner({ slides }: { slides: any }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1)
    }, 10 * 1000)

    return () => clearInterval(interval)
  }, [currentSlide, slides])

  return <>{slides[currentSlide]}</>
}
