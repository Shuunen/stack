declare module '@deanc/esbuild-plugin-postcss'
declare module 'servor/servor.js'
declare module 'servor/utils/openBrowser.js'

interface packageJson {
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
  files: string[]
  name: string
  version: string
}
