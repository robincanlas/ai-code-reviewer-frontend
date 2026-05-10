import Editor from '@monaco-editor/react'

type Props = {
  code: string
  onChange: (value: string) => void
}

export default function CodeEditor({ code, onChange }: Props) {
  return (
    <Editor
      height="100%"
      defaultLanguage="typescript"
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