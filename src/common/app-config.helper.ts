import { IAppConfigs } from './constants';

export const fetchAppConfigs = async () => {
  const fetchUrl = `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/api/config`;
  try {
    const response: IAppConfigs = await (await fetch(fetchUrl)).json();
    return response;
  } catch (error) {
    return {};
  }
};
