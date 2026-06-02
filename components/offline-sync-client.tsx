"use client"
import { useEffect } from 'react'
import initSync, { processQueue } from '@/lib/sync'

export default function OfflineSyncClient() {
  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then((reg) => {
        // if there's a waiting worker, tell it to skip waiting
        if (reg.waiting) reg.waiting.postMessage({ type: 'SKIP_WAITING' })
      }).catch((e) => console.warn('SW registration failed', e))
    }

    initSync()

    const onOnline = () => {
      processQueue().catch((e) => console.error(e))
    }

    window.addEventListener('online', onOnline)
    return () => window.removeEventListener('online', onOnline)
  }, [])

  return null
}
