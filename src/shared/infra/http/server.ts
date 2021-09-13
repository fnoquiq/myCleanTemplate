import { app } from './app'

app.listen(process.env.APP_PORT, () => {
  console.log(`Server running on http://localhost:${process.env.APP_PORT}`)
})
