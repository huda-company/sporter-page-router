import { respBody } from '^/config/serverResponse';
import connectToDatabase from '^/mongodb/connDb';
import User from '^/mongodb/schemas/user';
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import Session from '^/mongodb/schemas/session';
import { generateToken, saveTokenSessionToDB, verifyToken } from '^/utils/auth';
import moment from 'moment';
import { sendEmail } from '^/utils/sendMail';
import { SignupVerifEmailTemplate } from '@/templates/email/EmailVerification';
import { doSignup } from '@/controllers/signup';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const reqMeth: string = String(req.method);
  switch (reqMeth) {
    case 'POST': {
      await doSignup(req, res);
    }

    default: {
      return res.status(405).json({ message: 'request method not allowed' });
    }
  }
}
