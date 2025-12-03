'use client'

import { useState, useEffect } from 'react'
import { AnnouncementData } from '@/types/AnnouncementType'
import moment from 'moment'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { createAnnouncement } from '@/services/MosqueDataService'

interface AnnouncementFormProps {
  onComplete: (announcement: AnnouncementData) => void;
}

export function AnnouncementForm ({
  onComplete,
}: AnnouncementFormProps) {
  const [type, setType] = useState<'General' | 'Car'>('General')
  const [date, setDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [duration, setDuration] = useState(5)
  const [message, setMessage] = useState('')
  const [carReg, setCarReg] = useState('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // Set default date = today
  // Default start_time = 2 min from now
  useEffect(() => {
    const now = moment()

    // Date YYYY-MM-DD
    setDate(now.format('YYYY-MM-DD'))
    setStartTime(now.format('HH:mm'))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const announcement: AnnouncementData = {
      date,
      start_time: startTime,
      end_time: moment(`${date} ${startTime}`).
        add(duration, 'minutes').
        format('HH:mm'),
      message,
      car_reg_number: type === 'Car' ? carReg : null,
    }

    console.log('Submitting:', announcement)
    // Perform your API POST or upload here...

    setIsLoading(true)
    try {
      await createAnnouncement(announcement)
      console.log('Announcement added successfully')
      onComplete(announcement)
    } catch(error) {
      setError(`Error creating announcement: ${error}`)
    } finally {
        setIsLoading(false)
    }

  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 w-full max-w-lg mx-auto p-6"
    >
      {/* Type Selector */}
      <div>
        <label className="block text-sm font-medium mb-1">Announcement
          Type</label>
        <select
          className="w-full rounded-xl border border-slate-300 px-4 py-2 text-sm bg-slate-50 focus:ring-2 focus:ring-mosqueBrand-onPrimary focus:border-mosqueBrand-onPrimary outline-none"
          value={type}
          onChange={(e) => setType(e.target.value as any)}
          disabled={isLoading}
        >
          <option value="General">General</option>
          <option value="Car">Car</option>
        </select>
      </div>

      {/* Date */}
      <div>
        <label className="block text-sm font-medium mb-1">Date</label>
        <input
          type="date"
          className="w-full rounded-xl border border-slate-300 px-4 py-2 text-sm bg-slate-50 focus:ring-2 focus:ring-mosqueBrand-onPrimary outline-none"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          disabled={isLoading}
        />
      </div>

      {/* Start Time */}
      <div>
        <label className="block text-sm font-medium mb-1">Start Time</label>
        <input
          type="time"
          className="w-full rounded-xl border border-slate-300 px-4 py-2 text-sm bg-slate-50 focus:ring-2 focus:ring-mosqueBrand-onPrimary outline-none"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          disabled={isLoading}
        />
      </div>

      {/* Duration */}
      <div>
        <label className="block text-sm font-medium mb-1">Duration
          (minutes)</label>
        <input
          type="number"
          min={1}
          className="w-full rounded-xl border border-slate-300 px-4 py-2 text-sm bg-slate-50 focus:ring-2 focus:ring-mosqueBrand-onPrimary outline-none"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          disabled={isLoading}
          required
        />
      </div>

      {/* Car Reg Number (only if Car announcement) */}
      {type === 'Car' && (
        <div>
          <label className="block text-sm font-medium mb-1">Car Registration
            Number</label>
          <input
            type="text"
            placeholder=""
            className="w-full rounded-xl border border-slate-300 px-4 py-2 text-sm bg-slate-50 focus:ring-2 focus:ring-mosqueBrand-onPrimary outline-none"
            value={carReg}
            onChange={(e) => setCarReg(e.target.value)}
            disabled={isLoading}
          />
        </div>
      )}

      {/* Message */}
      <div>
        <label className="block text-sm font-medium mb-1">Message</label>
        <textarea
          rows={3}
          className="w-full rounded-xl border border-slate-300 px-4 py-2 text-sm bg-slate-50 focus:ring-2 focus:ring-mosqueBrand-onPrimary outline-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isLoading}
          required
        />
      </div>

      {error && (
        <p className="text-red-500">{error}</p>
      )}

      {isLoading ? (
        <LoadingSpinner/>
      ) : (
        <button
          type="submit"
          className="w-full rounded-xl bg-mosqueBrand-onPrimary px-4 py-3 text-sm font-semibold text-mosqueBrand-primary hover:bg-mosqueBrand-onPrimary/90 transition-all"
          disabled={isLoading}
        >
          Submit Announcement
        </button>
      )}


    </form>
  )
}
