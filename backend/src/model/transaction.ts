import mysql from 'mysql2'
import * as dotenv from 'dotenv'
import logger from '@/model/log'

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

let connection: mysql.Connection;

const connect = () =>
{
  connection = mysql.createConnection({
    host: 'localhost',
    user: 'diffvers',
    password: process.env.dbpass,
    port: 3306,
    database: 'diffvers'
  });
  
  connection.on('error', (err: any) => 
  {
    logger.info('db error: ', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST')
    {
        logger.info('re-make db connection... ');
        connect();
    }
    else throw err;
  });
  
  connection.connect((err: any) => 
  {
    if(err)
    {
      logger.info('error db connection: ', err.stack);
      setTimeout(connect, 1000);
      return;
    }
    logger.info('db connection success');
  });
}

connect();


const transaction = class 
{
  begin()
  {
    return new Promise((resolve, reject) =>
    {
      const proc = () =>
      {
        connection.beginTransaction((err: any) => 
        {
          logger.info("transaction begin: ");
          
          if(err)
          {
            if(err.code === 'PROTOCOL_CONNECTION_LOST')
            {
              proc();
              return;
            }
            reject(err);
          }
          else resolve("");
        })
      }

      proc();
    });
  }

  query(statement: string)
  {
    return new Promise((resolve, reject) => 
    {
      pool.getConnection((err, conn) =>
      {
        const proc = () =>
        {
          conn.query(statement, (err: any, results: any, fields) => 
          {
            logger.info("transaction query: ", statement, fields);

            if(err)
            {
              if(err.code === 'PROTOCOL_CONNECTION_LOST')
              {
                proc();
                return;
              }
              reject(err);
            }
            else resolve(results);
          });

          pool.releaseConnection(conn);
        }

        proc();
      });
    });
  }

  commit()
  {
    return new Promise((resolve, reject) => 
    {
      const proc = () =>
      {
        connection.commit((err) => 
        {
          logger.info("transaction commit: ");
          
          if(err)
          {
            if(err.code === 'PROTOCOL_CONNECTION_LOST')
            {
              proc();
              return;
            }
            reject(err);
          }
          else resolve(err);
        });
      }

      proc();
    });
  }

  rollback(err: any)
  {
      return new Promise((resolve, reject) => 
      {
          connection.rollback(() => 
          {
              logger.info("transaction rollback: ", err);
              reject(err); 
          });
      });
  }

  async do(process: any)
  {
    try
    {
        await this.begin();

        await process();

        await this.commit();
    }
    catch(err)
    {
        await this.rollback(err);
    }
  }
}

export default new transaction();
