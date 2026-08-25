import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const GA_MEASUREMENT_ID = 'G-FKKX3Z4FXY'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

/**
 * Sends a page_view for the current route. The gtag snippet in index.html is
 * configured with send_page_view: false, so every pageview originates here —
 * including the first one, which fires after the SPA redirect script has
 * restored the real path from the 404.html query string.
 */
export function usePageTracking() {
  const location = useLocation()

  useEffect(() => {
    window.gtag?.('event', 'page_view', {
      page_path: location.pathname + location.search + location.hash,
      page_location: window.location.href,
      page_title: document.title,
    })
  }, [location])
}
