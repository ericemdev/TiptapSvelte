import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [svelte()],
  optimizeDeps: {
    include: [
      'lowlight',
      'highlight.js',
      '@tiptap/core',
      '@tiptap/starter-kit',
      '@tiptap/extension-code',
      '@tiptap/extension-code-block-lowlight'
    ],
    exclude: ['@tiptap/pm']
  },
  build: {
    outDir: './docs',
    rollupOptions: {
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`
      },
      external: [
        // Add any external dependencies if needed
      ]
    },
    commonjsOptions: {
      include: [/lowlight/, /node_modules/]
    }
  },
  ssr: {
    noExternal: ['@tiptap/core']
  }
})