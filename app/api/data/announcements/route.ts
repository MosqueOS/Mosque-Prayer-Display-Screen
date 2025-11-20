import {
  getAnnouncement,
} from '@/services/MosqueDataService'

import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest,) {
  try {
    const announcement = await getAnnouncement()
    return Response.json({ announcement })
  } catch (error) {
    let message = "Unknown error";

    if (error instanceof Error) {
      message = error.message;
    }

    return Response.json({ error: message }, { status: 400 });  }
}
