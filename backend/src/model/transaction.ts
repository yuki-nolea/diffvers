import mysql from 'mysql2'
import * as dotenv from 'dotenv'

dotenv.config();

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
    console.log('db error: ', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST')
    {
        console.log('re-make db connection... ');
        connect();
    }
    else throw err;
  });
  
  connection.connect((err: any) => 
  {
    if(err)
    {
      console.log('error db connection: ', err.stack);
      setTimeout(connect, 1000);
      return;
    }
    console.log('db connection success');
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
          console.log("transaction begin: ");
          
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

  query(statement: string, params: any)
  {
    return new Promise((resolve, reject) => 
    {
      const proc = () =>
      {
        connection.query(statement, params, (err: any, results: any) => 
        {
          console.log("transaction query: ", statement, params);

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
      }

      proc();
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
          console.log("transaction commit: ");
          
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
              console.log("transaction rollback: ", err);
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
