import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type Props = {
  content: string
  speed?: number
}

export default function TypingMarkdown({
  content,
  speed = 10,
}: Props) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    let index = 0

    setDisplayed('')

    const interval = setInterval(() => {
      index++
      setDisplayed(content.slice(0, index))

      if (index >= content.length) {
        clearInterval(interval)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [content, speed])

  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {displayed}
      </ReactMarkdown>

      <span className="animate-pulse">▋</span>
    </div>
  )
}