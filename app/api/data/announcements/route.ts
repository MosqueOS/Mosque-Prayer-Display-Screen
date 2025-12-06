import { sheetsGetAnnouncement, isSheetsClientReady } from '@/services/GoogleSheetsService';
import {
  getAnnouncement,
} from '@/services/MosqueDataService'

import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest,) {
  try {
    let announcement = null;
    // call the sheets API if we are connected, saves having to call external API
    if (await isSheetsClientReady()) {
      announcement = await sheetsGetAnnouncement()
    } else {
      announcement = await getAnnouncement()
    }
    return Response.json({ announcement })
  } catch (error: any) {
    return Response.json({ error: error?.message ?? "Unknown error" }, { status: 400 });  }
}
