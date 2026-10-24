import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Sandbox-only host allowlist extension.
// The preview proxy forwards requests with Host: <port>-<sandbox id>.$BASE44_SANDBOX_HOST_DOMAIN,
// and the sandbox id rotates whenever the environment is recreated — so we allow the whole
// wildcard domain instead of a single host. Vite additionally appends the platform-provided
// __VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS value on its own.
// Behaviour is unchanged when BASE44_PREVIEW_MODE is unset (local/production builds).
const previewMode = process.env.BASE44_PREVIEW_MODE === '1'
const sandboxHostDomain = process.env.BASE44_SANDBOX_HOST_DOMAIN

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    // Bind mounts on Linux microVMs often miss inotify events — poll instead.
    watch: { usePolling: true, interval: 300 },
    allowedHosts:
      previewMode && sandboxHostDomain ? [`.${sandboxHostDomain}`] : undefined,
  },
})
