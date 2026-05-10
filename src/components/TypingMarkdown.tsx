import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {
  oneDark,
} from 'react-syntax-highlighter/dist/esm/styles/prism'

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
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code(props) {
            const { children, className } = props

            const match = /language-(\\w+)/.exec(className || '')

            const language = match?.[1]

            const code = String(children).replace(/\\n$/, '')

            if (!language) {
              return (
                <code className="rounded bg-slate-800 px-1 py-0.5">
                  {code}
                </code>
              )
            }

            return (
              <SyntaxHighlighter
                language={language}
                style={oneDark}
                PreTag="div"
              >
                {code}
              </SyntaxHighlighter>
            )
          },
        }}
      >
        {displayed}
      </ReactMarkdown>

      <span className="animate-pulse">▋</span>
    </div>
  )
}