import express from 'express'
import path from 'path'

const app = express()

const port = 3000

app.use(express.static(path.join(__dirname, "public")))

export default app.listen(port, "0.0.0.0", () => {
    console.log(`App is running at http://0.0.0.0:${port}`)
})
