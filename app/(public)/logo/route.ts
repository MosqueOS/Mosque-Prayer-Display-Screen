import { getMosqueData } from "@/services/MosqueDataService"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const mosqueData = await getMosqueData()
  const metadata = mosqueData.metadata
  const masjidName = metadata.name
  const logo = metadata.logo_url
  const id = masjidName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")

  const imageRes = await fetch(logo)

  const imageBuffer = await imageRes.arrayBuffer()

  return new NextResponse(imageBuffer, {
    headers: {
      "Content-Type": imageRes.headers.get("content-type") || "image/jpeg",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
