const localStorageFallback = {}
const sessionStorageFallback = {}

function storageServiceFor(storage: Storage, fallback: any) {
  let storageAvailable = false
  try {
    const x = 'storageTest'
    storage.setItem(x, x)
    storage.removeItem(x)
    storageAvailable = true
  } catch (e) {
    storageAvailable = false
  }

  return {
    setItem(key: string, value: string): void {
      if (storageAvailable) {
        storage.setItem(key, value)
      } else {
        fallback[key] = value
      }
    },
    getItem(key: string): any {
      return storageAvailable ? storage.getItem(key) : fallback[key]
    },
    removeItem(key: string) {
      if (storageAvailable) {
        storage.removeItem(key)
      } else {
        fallback[key] = null
      }
    },
    clear() {
      if (storageAvailable) {
        storage.clear()
      } else {
        Object.keys(fallback).forEach((key) => {
          delete fallback[key]
        })
      }
    },
  }
}
export const storageService: StorageService = storageServiceFor(localStorage, localStorageFallback)
export const sessionStorageService: StorageService = storageServiceFor(sessionStorage, sessionStorageFallback)

export default storageService

export type StorageService = ReturnType<typeof storageServiceFor>
