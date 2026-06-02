import { openDB, deleteDB, IDBPDatabase } from 'idb'

type OutboxItem = {
  id?: number
  method: string
  url: string
  body?: any
  headers?: Record<string,string>
  timestamp: number
}

const DB_NAME = 'offline-db'
const OUTBOX_STORE = 'outbox'

async function getDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(OUTBOX_STORE)) {
        db.createObjectStore(OUTBOX_STORE, { keyPath: 'id', autoIncrement: true })
      }
    },
  })
}

export async function enqueueRequest(item: Omit<OutboxItem,'id'|'timestamp'>) {
  const db = await getDB()
  const tx = db.transaction(OUTBOX_STORE, 'readwrite')
  const store = tx.objectStore(OUTBOX_STORE)
  const id = await store.add({ ...item, timestamp: Date.now() })
  await tx.done
  return id
}

export async function getAllOutbox() {
  const db = await getDB()
  return db.getAll(OUTBOX_STORE)
}

export async function clearOutboxItem(id: number) {
  const db = await getDB()
  const tx = db.transaction(OUTBOX_STORE, 'readwrite')
  await tx.objectStore(OUTBOX_STORE).delete(id)
  await tx.done
}

export async function processQueue() {
  if (!('navigator' in globalThis) || !navigator.onLine) return
  const items = await getAllOutbox()
  for (const it of items) {
    try {
      const res = await fetch(it.url, {
        method: it.method,
        headers: { 'Content-Type': 'application/json', ...(it.headers || {}) },
        body: it.body ? JSON.stringify(it.body) : undefined,
      })
      if (res && res.ok) {
        await clearOutboxItem(it.id!)
      }
    } catch (e) {
      // failed — keep in outbox
      console.warn('Sync failed for item', it, e)
    }
  }
}

export async function sendWithOffline(method: string, url: string, body?: any, headers?: Record<string,string>) {
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    await enqueueRequest({ method, url, body, headers })
    return new Response(JSON.stringify({ queued: true }), { status: 202, headers: { 'Content-Type': 'application/json' } })
  }

  return fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json', ...(headers || {}) },
    body: body ? JSON.stringify(body) : undefined,
  })
}

export default function initSync() {
  if (typeof window === 'undefined') return
  window.addEventListener('online', () => {
    processQueue().catch((e) => console.error('processQueue error', e))
  })
  // try once on init
  processQueue().catch(() => {})
}
