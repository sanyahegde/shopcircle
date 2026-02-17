import { useEffect, useRef, useState } from 'react'

export function useInView(options?: { once?: boolean; threshold?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const { once = true, threshold = 0.1 } = options ?? {}

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true)
        else if (!once) setInView(false)
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [once, threshold])

  return { ref, inView }
}
