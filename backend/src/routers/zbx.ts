import express from 'express';
import tr from '@/model/transaction'

const router = express.Router();

router.get('/zbx/all', async (req: any, res: any) => 
{
  const result = await tr.query("select * from parameters", null);

  //console.log(result);

  res.json(result);
})


router.get('/zbx', async (req: any, res: any) => 
{
  const {v1, v2} = req.query;

  if(v1)
  {
    const result = await tr.query("select * from parameters where ver=?", [v1]);

  }

  if(v2)
  {

  }

  //console.log(result);

  res.json(result);
})

export default router