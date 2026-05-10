import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {
  Prism as SyntaxHighlighter,
} from 'react-syntax-highlighter'
import {
  oneDark,
} from 'react-syntax-highlighter/dist/esm/styles/prism'

type Props = {
  content: string
  loading?: boolean
}

export default function TypingMarkdown({
  content,
  loading,
}: Props) {
  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code(props) {
            const {
              children,
              className,
            } = props

            const match =
              /language-(\w+)/.exec(
                className || ''
              )

            const language =
              match?.[1]

            const code = String(
              children
            ).replace(/\n$/, '')

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
        {content}
      </ReactMarkdown>

      {loading && (
        <span className="cursor">▋</span>
      )}
    </div>
  )
}