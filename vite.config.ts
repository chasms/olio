import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import devtoolsJson from 'vite-plugin-devtools-json';
import tsconfigPaths from 'vite-tsconfig-paths';

// Provide a lightweight process.env shim so legacy code referencing process.env.* doesn't crash.
// Only include explicitly whitelisted vars to avoid leaking real environment.
const envShim: Record<string, string | undefined> = {
  NODE_ENV: process.env.NODE_ENV,
};

export default defineConfig({
  plugins: [react(), tsconfigPaths(), devtoolsJson()],
  define: {
    // Replace occurrences of process.env.* at build time
    'process.env': envShim,
  },
});
