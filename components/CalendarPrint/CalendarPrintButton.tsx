"use client"

import React from 'react'
import { Button } from '@/components/ui/button'

export default function CalendarPrintButton() {
  return (
    <Button onClick={() => window.print()}>Print or Download Calendar</Button>
  )
}