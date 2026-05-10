import { useEffect } from 'react'

export function useAutoScroll(
  ref: React.RefObject<HTMLDivElement | null>,
  dep: string
) {
  useEffect(() => {
    const el = ref.current

    if (!el) return

    el.scrollTo({
      top: el.scrollHeight,
      behavior: 'smooth',
    })
  }, [dep])
}