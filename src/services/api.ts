export async function reviewCode(
  code: string,
  language: string
) {
  const response = await fetch('http://localhost:8000/review', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      language,
      code,
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to review code')
  }

  return response.json()
}

export async function streamReview(
  code: string,
  language: string,
  onChunk: (chunk: string) => void
) {
  const response = await fetch(
    'http://localhost:8000/review/stream',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code,
        language,
      }),
    }
  )

  if (!response.ok) {
    throw new Error(
      'Failed to stream review'
    )
  }

  if (!response.body) {
    throw new Error(
      'No response body'
    )
  }

  const reader =
    response.body.getReader()

  const decoder =
    new TextDecoder()

  while (true) {
    const { done, value } =
      await reader.read()

    if (done) {
      break
    }

    const chunk =
      decoder.decode(value)

    onChunk(chunk)
  }
}