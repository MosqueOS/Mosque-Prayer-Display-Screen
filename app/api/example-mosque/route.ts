import EXAMPLE_MOSQUE_API_RESPONSE from "./example-mosque-api-response.json"

export async function GET(request: Request) {
  return Response.json(EXAMPLE_MOSQUE_API_RESPONSE)
}
