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


/*
export default app.listen(port, () => {
  con_logger.info(`App is running at http://localhost:${port}`)
})
*/
/*
    key: fs.readFileSync('/opt/bitnami/letsencrypt/certificates/hirasyain.link.key'),
    cert: fs.readFileSync('/opt/bitnami/letsencrypt/certificates/hirasyain.link.crt'),
*/
/*
    key: fs.readFileSync('/home/ume/code/certificates/hirasyain.link.key'),
    cert: fs.readFileSync('/home/ume/code/certificates/hirasyain.link.crt'),
    ca: fs.readFileSync('/home/ume/code/certificates/hirasyain.link.issuer.crt'),
*/
export default https.createServer(
  {
    key: fs.readFileSync('/opt/bitnami/letsencrypt/certificates/hirasyain.link.key'),
    cert: fs.readFileSync('/opt/bitnami/letsencrypt/certificates/hirasyain.link.crt'),
    ca: fs.readFileSync('/opt/bitnami/letsencrypt/certificates/hirasyain.link.issuer.crt'),
  },
  app
).listen(port, () => {
  con_logger.info(`App is running at http://localhost:${port}`)
});
