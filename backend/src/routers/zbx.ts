import express from 'express';
import tr from '@/model/transaction'

const router = express.Router();

router.get('/zbx', async (req: any, res: any) => 
{
  const result = await tr.query("select * from parameters", null);

  //console.log(result);

  res.json(result);
})


export default router