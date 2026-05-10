import { useRef } from 'react'
import TypingMarkdown from './TypingMarkdown'
import { useAutoScroll } from '../hooks/useAutoScroll'

type Props = {
  review: string
  loading: boolean
}

export default function ReviewPanel({
  review,
  loading,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null)
  useAutoScroll(ref, review)

  return (
    <div ref={ref} className="h-full overflow-auto bg-slate-900 p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">
          AI Review
        </h2>

        {loading && (
          <div className="animate-pulse text-sm text-slate-400">
            AI is thinking...
          </div>
        )}
      </div>

      <TypingMarkdown
        content={review}
        loading={loading}
      />
    </div>
  )
}