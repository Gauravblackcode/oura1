// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  status: string;
  build: string | undefined;
  version: string | undefined;
};

export default function handler(_: NextApiRequest, res: NextApiResponse<Data>) {
  res
    .status(200)
    .json({ status: 'ACTIVE', build: process.env.NEXT_PUBLIC_BUILD_TAG, version: process.env.npm_package_version });
}
