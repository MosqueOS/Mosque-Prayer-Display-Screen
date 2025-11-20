import {
  getAnnouncement,
} from '@/services/MosqueDataService'

import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest,) {
  try {
    const announcement = await getAnnouncement()
    return Response.json({ announcement })
  } catch (error: any) {
    return Response.json({ error: error?.message ?? "Unknown error" }, { status: 400 });  }
}
