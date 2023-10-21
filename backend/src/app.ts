import express from 'express'
import path from 'path'

import zbxRouter from '@/routers/zbx'

const app = express()

const port = 3000
//const port = 80

app.use(express.static(path.join(__dirname, "public")))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept")
  next();
})

app.use(zbxRouter);

app.get('/test', (req: any, res: any) => {
  res.json({id: 1, name: "aaaaa"});
})


export default app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`)
})
