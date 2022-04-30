import { useRef, useEffect } from 'react'

export const useDelay = (delay = 100) => {
  const ref = useRef()
  useEffect(() => {
    return () => {
      if (ref.current) clearTimeout(ref.current)
    }
  }, [])
  return (callback) => {
    if (ref.current) {
      clearTimeout(ref.current)
    }
    ref.current = setTimeout(callback, delay)
  }
}
