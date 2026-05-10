import TypingMarkdown from './TypingMarkdown'

type Props = {
  review: string
  loading: boolean
}

export default function ReviewPanel({ review, loading }: Props) {
  return (
    <div className="h-full overflow-auto bg-slate-900 p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">
          AI Review
        </h2>

        {loading && (
          <div className="text-sm text-slate-400 animate-pulse">
            Reviewing...
          </div>
        )}
      </div>

      <TypingMarkdown content={review} />
    </div>
  )
}