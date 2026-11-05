// Safe localStorage helpers — never throw (private mode, quota, bad JSON).
const PREFIX = 'biteconnect:'

export function loadState(key, fallback) {
  try {
    const raw = window.localStorage.getItem(PREFIX + key)
    return raw === null ? fallback : JSON.parse(raw)
  } catch (error) {
    console.warn(`Could not read "${key}" from storage`, error)
    return fallback
  }
}

export function saveState(key, value) {
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch (error) {
    console.warn(`Could not save "${key}" to storage`, error)
  }
}

export function clearState(key) {
  try {
    window.localStorage.removeItem(PREFIX + key)
  } catch (error) {
    console.warn(`Could not clear "${key}" from storage`, error)
  }
}
