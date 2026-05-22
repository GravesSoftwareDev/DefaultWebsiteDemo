import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { createProxyMiddleware } from 'http-proxy-middleware'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000
const API_URL = process.env.API_URL

if (API_URL) {
    const proxy = createProxyMiddleware({
        target: API_URL,
        changeOrigin: true,
    })

    app.use((req, res, next) => {
        if (
            req.path.startsWith('/endpoints') ||
            req.path.startsWith('/auth') ||
            req.path.startsWith('/media')
        ) {
            return proxy(req, res, next)
        }
        next()
    })
}

app.use(express.static(join(__dirname, 'dist')))

app.get('/{*splat}', (_req, res) => {
    res.sendFile(join(__dirname, 'dist', 'index.html'))
})

app.listen(PORT)
