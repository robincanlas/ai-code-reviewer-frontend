import { useCallback, useRef, useState } from 'react'

export function useStreamingText() {
  const [text, setText] = useState('')

  const bufferRef = useRef('')
  const rafRef = useRef<number | null>(null)

  const isFlushingRef = useRef(false)

  const flush = useCallback(() => {
    if (isFlushingRef.current) return

    isFlushingRef.current = true

    const run = () => {
      if (bufferRef.current.length > 0) {
        const words = bufferRef.current.split(' ')
        setText(prev => prev + words.join(' '))
        bufferRef.current = ''
      }

      rafRef.current = requestAnimationFrame(run)
    }

    rafRef.current = requestAnimationFrame(run)
  }, [])

  const pushChunk = useCallback((chunk: string) => {
    bufferRef.current += chunk

    if (!rafRef.current) {
      flush()
    }
  }, [flush])

  const reset = useCallback(() => {
    setText('')

    bufferRef.current = ''

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }

    isFlushingRef.current = false
  }, [])

  return {
    text,
    pushChunk,
    reset,
  }
}