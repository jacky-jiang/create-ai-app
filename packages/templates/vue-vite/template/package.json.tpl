{
  "name": "{{projectName}}",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "typecheck": "vue-tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "axios": "^1.8.3",
    "pinia": "^3.0.1",
    "vue": "^3.5.13"
  },
  "devDependencies": {
    "@eslint/js": "^9.22.0",
    "@vitejs/plugin-vue": "^5.2.1",
    "@vue/eslint-config-typescript": "^14.5.0",
    "@vue/test-utils": "^2.4.6",
    "autoprefixer": "^10.4.21",
    "eslint": "^9.22.0",
    "eslint-plugin-vue": "^9.32.0",
    "jsdom": "^26.0.0",
    "postcss": "^8.5.3",
    "prettier": "^3.5.3",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.8.2",
    "vite": "^6.2.2",
    "vitest": "^3.0.9",
    "vue-tsc": "^2.2.8"
  }
}
