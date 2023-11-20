import mysql from 'mysql2'
import * as dotenv from 'dotenv'
import {sys_logger, err_logger} from '@/model/logger'

dotenv.config();

const pool = mysql.createPool({
  host: 'localhost',
  user: 'diffvers',
  database: 'diffvers',
  password: process.env.dbpass,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});


const transaction = class 
{
  query(statement: string)
  {
    return new Promise((resolve, reject) => 
    {
      pool.getConnection((err, conn) =>
      {
        sys_logger.info('db connection was succeeded');

        conn.query(statement, (err: any, results: any, fields) => 
        {
          sys_logger.info("transaction query: ", statement, fields);

          if(err)
          {
            reject(err);
          }
          else resolve(results);
        });

        pool.releaseConnection(conn);
      });
    });
  }
}

export default new transaction();
