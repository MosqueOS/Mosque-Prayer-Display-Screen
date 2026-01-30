import { getMosqueData } from "@/services/MosqueDataService"
import { NextResponse } from "next/server"
import { redirect } from "next/navigation"

export async function GET(request: Request) {
  const mosqueData = await getMosqueData()
  const metadata = mosqueData.metadata
  const logo = metadata.logo_url

  if (logo?.length > 1) {
    const imageRes = await fetch(logo)

    const imageBuffer = await imageRes.arrayBuffer()

    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": imageRes.headers.get("content-type") || "image/jpeg",
        "Cache-Control": "public, max-age=3600",
      },
    })
  }

  return redirect("/mosqueos-logo/android-chrome-192x192.png")
}
