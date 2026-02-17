/**
 * App config. Replace with real env vars when deploying.
 * Backend API base URL for Node.js/Express server.
 */
export const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000',
} as const
