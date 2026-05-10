import Editor from '@monaco-editor/react'

type Props = {
  code: string
  language: string
  onChange: (value: string) => void
}

export default function CodeEditor({ code, language, onChange }: Props) {
  return (
    <Editor
      height="100%"
      path={`file.${getExtension(language)}`}
      defaultLanguage={language}
      theme="vs-dark"
      value={code}
      onChange={(value) => onChange(value || '')}
      options={{
        minimap: {
          enabled: false,
        },
        fontSize: 14,
        automaticLayout: true,
        scrollBeyondLastLine: false,
        wordWrap: 'on',
      }}
    />
  )
}

function getExtension(language: string) {
  switch (language) {
    case 'typescript':
      return 'ts'

    case 'javascript':
      return 'js'

    case 'python':
      return 'py'

    case 'java':
      return 'java'

    case 'go':
      return 'go'

    case 'csharp':
      return 'cs'

    default:
      return 'txt'
  }
}