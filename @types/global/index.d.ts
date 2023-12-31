import 'next';

type JWTSession = {
  id: string;
  shop: string;
  shopFull: string;
  ownerEmail: string;
  ownerName: string;
  iat: number;
  exp: number;
};

interface NextApiRequestCustom<T> {
  query: T['query'];
  body: T['body'];
  cookies: Partial<{
    [key: string]: string;
  }>;
  session?: JWTSession;
  redis?: Redis;
}

declare module 'next' {
  interface NextApiRequest<T = any> extends NextApiRequest {
    body: T;
  }
}
