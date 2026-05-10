export const languages = [
  { label: 'TypeScript', value: 'typescript' },
  { label: 'JavaScript', value: 'javascript' },
  { label: 'Python', value: 'python' },
  { label: 'Java', value: 'java' },
  { label: 'Go', value: 'go' },
  { label: 'C#', value: 'csharp' }
];

export const starterCode: Record<string, string> = {
  typescript: `function sum(a: number, b: number) {
  return a + b
}`,

  javascript: `function sum(a, b) {
  return a + b
}`,

  python: `def sum(a, b):
    return a + b`,

  java: `public class Main {
    public static void main(String[] args) {

    }
}`,

  go: `package main

func main() {

}`,

  csharp: `class Program
{
    static void Main()
    {

    }
}`,
}