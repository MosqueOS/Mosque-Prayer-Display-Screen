"use client";

import moment from "moment-hijri";

export default function Date() {
  const englishDate = moment().format("dddd Do MMMM YYYY");
  const hijriDate = moment().locale("en").format("iDo iMMMM iYYYY");

  return (
    <div className="text-white text-center">
      <p className="text-2xl font-medium">{englishDate}</p>
      <p className="text-2xl mt-3">{hijriDate}</p>
    </div>
  );
}
