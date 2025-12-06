"use client"

import type { AnnouncementData } from "@/types/AnnouncementType"
import { useEffect, useState } from "react"
import { PrimaryButton } from '@/components/ui/Buttons'
import { Modal } from '@/components/ui/Modal'
import { AnnouncementForm } from '@/components/Admin/Announcement/AnnoucementForm'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export default function AddAnnouncement() {
  const [isAddAnnouncementModalOpen, setIsAddAnnouncementModalOpen] = useState<boolean>(false)
  const [currentAnnouncement, setCurrentAnnouncement] = useState<AnnouncementData | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string|null>(null)

  useEffect(() => {
    setIsLoading(true)
    fetch(`/api/data/announcements?no_cache=${Date.now()}`).
      then((response) => response.json()).
      then(({ announcement, error }) => {
        if (error) {
          setError(error)
        } else {
          setCurrentAnnouncement(announcement)
        }
      }).
      catch((error) => {
        setError(`Error fetching announcement: ${error}`)
      })
      .finally(() => setIsLoading(false))
  }, [])


  return (

    <>
      <div
        className="max-w-full rounded-xl border border-gray-200 shadow p-4 bg-white">
        <div className="flex items-center gap-4 mb-2">
          <h3 className="text-lg font-semibold">Announcement</h3>
          <span className={`text-xs  text-white px-2 py-1 rounded ${currentAnnouncement?.is_visible ? 'bg-green-600' : 'bg-slate-500'}`}>
            {currentAnnouncement?.is_visible ? 'Showing' : 'Not Showing'}
          </span>
        </div>
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <AnnouncementDetails announcement={currentAnnouncement}/>
        )}

        <PrimaryButton
          onClick={() => setIsAddAnnouncementModalOpen(true)}
          disabled={isLoading}
        >
          Add Announcement
        </PrimaryButton>
      </div>


      <Modal
        isOpen={isAddAnnouncementModalOpen}
        onClose={() => setIsAddAnnouncementModalOpen(false)}
        title={"Add Announcement"}
      >

        <AnnouncementForm
          onComplete={(announcement) => {
            setCurrentAnnouncement(announcement)
            setIsAddAnnouncementModalOpen(false)
          }}
        />

      </Modal>
    </>
  )

}

function AnnouncementDetails({ announcement } : {announcement: AnnouncementData | null}) {
  if (announcement?.date == null) {
    return (
      <div className="flex flex-row flex-wrap">
        <p>No announcement set.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      {/*<p className="font-semibold text-black">Current Announcement</p>*/}
      <div className="flex flex-row flex-wrap gap-x-6 gap-y-1">
        <div className="flex flex-col gap-0">
          <p className="font-semibold">Date</p>
          <p className="font-light">{announcement.date}</p>
        </div>
        <div className="flex flex-col gap-0">
          <p className="font-semibold">Start Time</p>
          <p className="font-light">{announcement.start_time}</p>
        </div>
        <div className="flex flex-col gap-0">
          <p className="font-semibold">End Time</p>
          <p className="font-light">{announcement.end_time}</p>
        </div>
        <div className="flex flex-col gap-0">
          <p className="font-semibold">Car Reg</p>
          <p className="font-light">{announcement.car_reg_number}</p>
        </div>
        <div className="flex flex-col gap-0 flex-1 min-w-full">
          <p className="font-semibold">Message</p>
          <p className="font-light">{announcement.message}</p>
        </div>
      </div>
    </div>
  )
}