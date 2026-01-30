import { getMosqueData } from "@/services/MosqueDataService"

export async function GET(request: Request) {
  const mosqueData = await getMosqueData()
  const metadata = mosqueData.metadata
  const masjidName = metadata.name
  const logo = metadata.logo_url
  const id = masjidName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
  const short_name = metadata.short_name ?? masjidName.substring(0, 15)
  const primaryColor = process.env.THEME_COLOR_PRIMARY ?? "#0C5A4B"

  return Response.json({
    id: id,
    name: masjidName,
    short_name: short_name,
    icons: [
      {
        src: `/logo`,
        sizes: "192x192",
        type: "image/jpeg",
      },
      {
        src: `/logo`,
        sizes: "256x256",
        type: "image/jpeg",
      },
      {
        src: `/logo`,
        sizes: "180x180",
        type: "image/jpeg",
      },
    ],
    theme_color: primaryColor,
    background_color: primaryColor,
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
  })
}
