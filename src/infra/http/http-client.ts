import { ApiError, type ApiErrorResponse } from "@/infra/http/api-error";

const API_URL = import.meta.env.VITE_API_URL

export const http = {
  get: async <ResponseType>(
    endPoint: string,
    searchParams?: Array<{ key: string; value: string }>,
  ): Promise<ResponseType> => {
    const finalUrl = buildUrl(endPoint, searchParams)
    const response = await fetch(finalUrl)
    const responseBody = await response.json()
    if (response.ok) {
      return responseBody as ResponseType
    }

    const {error} = responseBody as ApiErrorResponse

    throw new ApiError(error.message, error.code, response.status, error.details)
  },
  post: async <ResponseType>(
    endPoint: string,
    body: any,
  ): Promise<ResponseType> => {
    const finalUrl = buildUrl(endPoint)
    const response = await fetch(finalUrl, {
      method: 'POST',
      headers: {
        'content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    const responseBody = await response.json()
    if (response.ok) {
      return responseBody as ResponseType
    }

    const {error} = responseBody as ApiErrorResponse

    throw new ApiError(error.message, error.code, response.status, error.details)
  },


}

function buildUrl(
  endPoint: string,
  searchParams?: Array<{ key: string; value: string }>,
) {
  const finalUrl = new URL(`${API_URL}/${endPoint}`)

  if (searchParams) {
    searchParams.forEach((param) =>
      finalUrl.searchParams.append(param.key, param.value),
    )
  }

  return finalUrl.toString()
}
