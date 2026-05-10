export async function reviewCode(code: string) {
  const response = await fetch('http://localhost:8000/review', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      language: 'typescript',
      code,
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to review code')
  }

  return response.json()
}