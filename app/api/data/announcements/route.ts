import {
  getAnnouncement,
} from '@/services/MosqueDataService'

import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest,) {
  const announcement = await getAnnouncement()
  return Response.json({ announcement })
}
