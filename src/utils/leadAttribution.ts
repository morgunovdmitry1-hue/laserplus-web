const storageKey = 'lp-lead-attribution-v1'
const fields = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'yclid'] as const

interface LeadAttribution {
  landing_path: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string
  yclid?: string
}

export function rememberLeadAttribution(): LeadAttribution {
  const url = new URL(window.location.href)
  const attribution: LeadAttribution = { landing_path: url.pathname.slice(0, 200) }
  for (const field of fields) {
    const value = url.searchParams.get(field)?.trim()
    if (value) attribution[field] = value.slice(0, 120)
  }

  try {
    const previous = window.sessionStorage.getItem(storageKey)
    if (previous && !fields.some(field => attribution[field])) {
      const parsed: unknown = JSON.parse(previous)
      if (parsed && typeof parsed === 'object' && 'landing_path' in parsed && typeof parsed.landing_path === 'string') {
        return parsed as LeadAttribution
      }
    }
    window.sessionStorage.setItem(storageKey, JSON.stringify(attribution))
  } catch {
    // Browsers may disable storage. The current page is still available for attribution.
  }
  return attribution
}
