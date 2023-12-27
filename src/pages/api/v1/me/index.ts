import { respBody } from '^/config/serverResponse';
import connectToDatabase from '^/mongodb/connDb';
import User from '^/mongodb/schemas/user';
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import Session from '^/mongodb/schemas/session';
import { generateToken, saveTokenSessionToDB, verifyToken } from '^/utils/auth';
import { me } from '@/controllers/me';
import { NextRequest, NextResponse } from 'next/server';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const reqMeth: string = String(req.method);
  switch (reqMeth) {
    case 'GET': {
      await me(req, res);
    }

    default: {
      return res.status(405).json({ ...respBody.ERROR.METHOD_NOT_ALLLOWED });
    }
  }
}
