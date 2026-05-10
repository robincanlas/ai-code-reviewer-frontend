import { useRef, useState } from 'react'

export function useStreamingText() {
  const [text, setText] = useState('')
  const bufferRef = useRef('')
  const frameRef = useRef<number | null>(null)

  function flushBuffer() {
    if (bufferRef.current.length === 0) return

    setText(prev => prev + bufferRef.current)
    bufferRef.current = ''

    frameRef.current = requestAnimationFrame(flushBuffer)
  }

  function pushChunk(chunk: string) {
    bufferRef.current += chunk

    if (frameRef.current === null) {
      frameRef.current = requestAnimationFrame(flushBuffer)
    }
  }

  function reset() {
    setText('')
    bufferRef.current = ''
  }

  return {
    text,
    pushChunk,
    reset,
  }
}