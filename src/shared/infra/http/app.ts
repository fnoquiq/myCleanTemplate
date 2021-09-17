import { config } from 'dotenv-flow'
import express from 'express'

config({ silent: true })

import setupRoutes from './routes' // eslint-disable-line

const app = express()

app.use(express.json())

setupRoutes(app)

export { app }
