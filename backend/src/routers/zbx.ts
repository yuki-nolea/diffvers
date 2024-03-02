import express from 'express';
import tr from '@/model/transaction'
import { ZbxParam } from '@/model/zbx-param';
import {sys_logger, err_logger, con_logger} from '@/model/logger'

const router = express.Router();

router.get('/zbx/all', async (req: any, res: any) => 
{
  const result = await tr.query("select * from parameters");

  //console.log(result);

  res.json(result);
})


router.get('/zbx', async (req: any, res: any) => 
{
  const {v1, v2} = req.query;
  
  const v1_params = [] as ZbxParam[];

  if(v1)
  {
    const results = await tr.query("select * from parameters where ver=?") as Array<any>;
  
    for(const item of results) {
      v1_params.push(new ZbxParam(item as ZbxParam))
      con_logger.log(JSON.stringify(v1_params[v1_params.length-1]))
    }
  }

  if(v2)
  {

  }

  //console.log(result);

  res.json(v1_params);
})

router.get('/zbx/notice/all', async (req: any, res: any) => 
{
  const result = await tr.query("select * from notices");

  //console.log(result);

  res.json(result);
})

export default router