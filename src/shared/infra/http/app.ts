import cors from 'cors'
import { config } from 'dotenv-flow'
import express from 'express'

config({ silent: true })

import setupRoutes from './routes' // eslint-disable-line

const app = express()

app.use(
  cors({
    exposedHeaders: ['x-total-count', 'Content-Type', 'Content-Length'],
  })
)

app.use(express.json())

setupRoutes(app)

export { app }
