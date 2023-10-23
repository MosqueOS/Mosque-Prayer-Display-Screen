import { getMosqueData } from "@/services/MosqueDataService"

export async function GET(request: Request) {
  return Response.json(await getMosqueData())
}
