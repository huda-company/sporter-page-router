import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { authOptions } from '^/lib/NextAuthConf';

export const authOptionsConf = authOptions;

export default NextAuth(authOptionsConf);
