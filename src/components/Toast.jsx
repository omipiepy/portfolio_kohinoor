const listeners = new Set()

export function showToast(message) {
  listeners.forEach((fn) => fn(message))
  setTimeout(() => listeners.forEach((fn) => fn(null)), 3000)
}

export function addToastListener(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}
