import { config } from 'dotenv-flow'
import express from 'express'

config()

const app = express()

app.use(express.json())

export { app }
