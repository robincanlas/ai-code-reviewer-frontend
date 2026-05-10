import { useState } from 'react'
import CodeEditor from './components/CodeEditor'
import ReviewPanel from './components/ReviewPanel'
import { streamReview } from './services/api'
import { starterCode, languages } from './constants'
import { useStreamingText } from './hooks/useStreamingText'

export default function App() {
  const [code, setCode] = useState(starterCode.typescript)
  const [language, setLanguage] = useState('typescript')
  // const [review, setReview] = useState('')
  const [loading, setLoading] = useState(false)
  const { text, pushChunk, reset } = useStreamingText()

  const handleReview = async () => {
    try {
      setLoading(true)
      reset()

      await streamReview(
        code,
        language,
        (chunk) => {
          pushChunk(chunk)
        }
      )
    } finally {
      setLoading(false)
    }
  }

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    setCode(starterCode[newLanguage as keyof typeof starterCode]);
  }

  return (
    <div className="flex h-screen flex-col bg-slate-950 text-white">
      <header className="flex h-14 items-center justify-between border-b border-slate-800 px-4">
        <h1 className="text-lg font-bold">
          AI Code Reviewer
        </h1>

        <div className="flex items-center gap-4">
          <select
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="rounded bg-slate-800 px-3 py-2 text-white"
          >
            {languages.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>

          <button
            onClick={handleReview}
            disabled={loading}
            className="rounded bg-blue-600 px-4 py-2 hover:bg-blue-500"
          >
            Review Code
          </button>
        </div>
      </header>

      <main className="flex flex-1 overflow-hidden">
        <section className="flex-1 overflow-hidden border-r border-slate-800">
          <CodeEditor
            code={code}
            language={language}
            onChange={setCode}
          />
        </section>

        <section className="w-[40%] min-w-[400px]">
          <ReviewPanel
            review={text}
            loading={loading}
          />
        </section>
      </main>
    </div>
  )
}