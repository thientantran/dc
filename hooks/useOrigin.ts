import { useEffect, useState } from 'react'

export default function useOrigin() {
  const [mouted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : ''

  if (!mouted) return ''
  return origin
}
