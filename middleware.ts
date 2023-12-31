import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { respBody, statCode } from './config/serverResponse';
import { apiMware } from '@/middlewares/apiMiddleware';
import { NextApiRequest, NextApiResponse } from 'next/types';

//this middleware is suggested by nextjs docs.
//then customize it as per requirement

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextApiRequest, res: NextApiResponse) {
  const reqURL = String(req.url);
  if (reqURL.includes('api')) {
    const apiMwareCheck = await apiMware(req, res);
    if (['20'].includes(String(apiMwareCheck?.status))) return res;
    else return apiMwareCheck;
  } else {
    return res.status(401).json({ ...respBody.ERROR.UNEXPECTED_ERROR });
  }
}

export const config = {
  matcher: ['/api/:path*', '/admin/:path*']
};
