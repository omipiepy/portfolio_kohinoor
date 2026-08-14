// Frontend helper for the contact form API.
// The endpoint is served by the serverless function in /api/contact.js (Vercel).
// Override with VITE_CONTACT_API_URL if you host the API elsewhere.

const API_URL = import.meta.env.VITE_CONTACT_API_URL || '/api/contact'

export async function submitContactMessage({ name, email, subject, message }) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      email,
      subject,
      message,
      createdAt: new Date().toISOString(),
    }),
  })

  if (!response.ok) {
    let detail = ''
    try {
      detail = (await response.json()).error || ''
    } catch {
      // ignore parse errors
    }
    throw new Error(detail || `Request failed (${response.status})`)
  }

  return response.json()
}
