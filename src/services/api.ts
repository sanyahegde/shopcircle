import { config } from '../config/env'

/**
 * Base fetch wrapper for backend API.
 * Use when connecting to Node.js/Express backend.
 */
export async function api<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const url = `${config.apiBaseUrl}${path}`
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  })
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`)
  }
  return res.json() as Promise<T>
}
