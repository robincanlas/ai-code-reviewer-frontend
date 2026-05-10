import { useState } from 'react'

import CodeEditor from './components/CodeEditor'
import ReviewPanel from './components/ReviewPanel'

import { reviewCode } from './services/api'

export default function App() {
  const [code, setCode] = useState(`function sum(a,b){
  return a+b
}`)

  const [review, setReview] = useState('')
  const [loading, setLoading] = useState(false)

  const handleReview = async () => {
    try {
      setLoading(true)
      setReview('')

      const result = await reviewCode(code)

      setReview(result.review)
    } catch (error) {
      console.error(error)

      setReview('Failed to review code.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen flex-col bg-slate-950 text-white">
      <header className="flex h-14 items-center justify-between border-b border-slate-800 px-4">
        <h1 className="text-lg font-bold">
          AI Code Reviewer
        </h1>

        <button
          onClick={handleReview}
          disabled={loading}
          className="rounded bg-blue-600 px-4 py-2 hover:bg-blue-500 disabled:opacity-50"
        >
          Review Code
        </button>
      </header>

      <main className="flex flex-1 overflow-hidden">
        <section className="flex-1 overflow-hidden border-r border-slate-800">
          <CodeEditor
            code={code}
            onChange={setCode}
          />
        </section>

        <section className="w-[40%] min-w-[400px]">
          <ReviewPanel
            review={review}
            loading={loading}
          />
        </section>
      </main>
    </div>
  )
}