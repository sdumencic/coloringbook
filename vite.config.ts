import babel from '@rolldown/plugin-babel'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig, normalizePath } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  build: {
    outDir: 'build' // CRA's default build output
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      public: normalizePath(resolve(__dirname, 'public')),
      shared: normalizePath(resolve(__dirname, 'src/shared')),
      views: normalizePath(resolve(__dirname, 'src/views')),
      '@': normalizePath(resolve(__dirname, 'src'))
    }
  }
})
