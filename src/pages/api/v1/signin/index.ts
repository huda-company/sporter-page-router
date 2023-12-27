import type { NextApiRequest, NextApiResponse } from 'next';
import { doSignin } from '@/controllers/signin';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const reqMeth: string = String(req.method);
  switch (reqMeth) {
    case 'POST': {
      await doSignin(req, res);
    }

    default: {
      return res.status(405).json({ message: 'request method not allowed' });
    }
  }
}
