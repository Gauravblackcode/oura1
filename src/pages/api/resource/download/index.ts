import { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from 'cookies-next';
import { ACCESS_TOKEN_COOKIE, REDIRECT_URI_COOKIE } from '@/common/constants';
import environments from '@/common/environments';
import ROUTES from '@/common/routes';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const accessToken = req.cookies[ACCESS_TOKEN_COOKIE];
  if (accessToken) {
    res
      .status(200)
      .redirect(
        `${environments.BASE_PATH ?? ''}${ROUTES.ENCRYPTED_DOWNLOAD}?${new URLSearchParams(
          req.query as any,
        ).toString()}`,
      );
  } else {
    setCookie(REDIRECT_URI_COOKIE, JSON.stringify(req.query), { req, res });
    res.status(200).redirect(`${environments.BASE_PATH ?? ''}${ROUTES.AUTH.LOGIN}`);
  }
}
