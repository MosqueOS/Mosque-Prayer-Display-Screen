"use client"

import {
  dtHijriNowLocaleCustomFormat,
  dtNowLocaleCustomFormat,
} from "@/lib/datetimeUtils"

export default function Date() {
  const englishDate = dtNowLocaleCustomFormat("dddd D MMMM YYYY")
  const hijriDate = dtHijriNowLocaleCustomFormat("iD iMMMM iYYYY")

  return (
    <div className="text-mosqueBrand-onPrimary text-center md:text-left">
      <p className="font-bold text-2xl md:text-5xl 2k:text-6xl 4k:text-8xl">
        {englishDate}
      </p>
      <p className="mt-3 md:mt-5 2k:mt-[2vh] text-2xl md:text-4xl 2k:text-5xl 4k:text-7xl">
        {hijriDate}
      </p>
    </div>
  )
}
