"use client"

import moment from "moment-hijri"

export default function Date() {
  const englishDate = moment().format("dddd D MMMM YYYY")
  const hijriDate = moment().locale("en").format("iD iMMMM iYYYY")

  return (
    <div className="text-mosqueBrand-onPrimary text-center md:text-left">
      <p className="font-bold text-2xl md:text-5xl">{englishDate}</p>
      <p className="mt-3 md:mt-5 text-2xl md:text-4xl">{hijriDate}</p>
    </div>
  )
}
