'use client'

import type { AnnouncementData } from '@/types/AnnouncementType'
import { useEffect, useState } from 'react'
import AnnouncementModal from '@/components/Announcement/AnnoucementModal'

export default function Announcement () {
  const [nextAnnouncement, setNextAnnouncement] = useState<AnnouncementData | null>(
    null)

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`/api/data/announcements?no_cache=${Date.now()}`).
        then((response) => response.json()).
        then(({ announcement }) => {
          setNextAnnouncement(announcement)
        }).
        catch((error) => {
          console.log(`error fetching announcements: ${error}`)
        })
    }, 10 * 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="hidden md:block">
      <AnnouncementModal
        isOpen={nextAnnouncement?.is_visible ?? false}
      >
        <div
          className=" text-white h-full w-full flex-1 flex flex-col items-center justify-center gap-10 mt-2">

          <div
            id="text-announcement"
            className={`w-full h-[50vh] max-w-xl md:max-w-full lg:max-w-6xl
          bg-mosqueBrand-onPrimary text-black rounded-2xl lg:rounded-4xl
          flex flex-col items-center justify-start p-4
        `}
          >
            {nextAnnouncement?.car_reg_number != null && nextAnnouncement.car_reg_number.length > 0 ? (
              <div
                id="car-reg-view"
                className="flex items-center justify-center bg-yellow-400 text-black border-2 border-black rounded-2xl lg:rounded-4xl
              p-4 px-2 mx-4 font-bold tracking-wider mb-6 uppercase text-center
              aspect-[10/3] w-full max-h-[30vh] max-w-xl md:max-w-xl lg:max-w-4xl"
              >
                <div className="text-5xl md:text-8xl lg:text-[10rem]">
                  {nextAnnouncement.car_reg_number}
                </div>
              </div>
              ) : (
              <div className="font-bold text-4xl md:text-5xl lg:text-7xl">
                Announcement
              </div>
            )}


            <div
              className="text-xl md:text-2xl lg:text-2xl font-semibold text-center flex flex-1 justify-center items-center">
              <p className="flex-1 font-light">
                {nextAnnouncement?.message}
              </p>
            </div>
          </div>
        </div>
      </AnnouncementModal>
    </div>
  )
}