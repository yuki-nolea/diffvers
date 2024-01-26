import express from 'express'
import path from 'path'
import https from 'https'
import fs from 'fs'

import zbxRouter from '@/routers/zbx'
import {sys_logger, err_logger, con_logger} from '@/model/logger'

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

const server = https.createServer(
  {
    key: fs.readFileSync('/opt/bitnami/letsencrypt/certificates/hirasyain.link.key'),
    cert: fs.readFileSync('/opt/bitnami/letsencrypt/certificates/hirasyain.link.crt'),
  },
  app
);

export default app.listen(port, () => {
  con_logger.info(`App is running at http://localhost:${port}`)
})
