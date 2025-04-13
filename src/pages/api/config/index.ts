// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Buffer } from 'buffer';
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  AppConfigDataClient,
  GetLatestConfigurationCommand,
  GetLatestConfigurationCommandInput,
  StartConfigurationSessionCommand,
} from '@aws-sdk/client-appconfigdata';
import { App, cert, initializeApp } from 'firebase-admin/app';
import { getRemoteConfig, RemoteConfig, ServerConfig, ServerTemplate } from 'firebase-admin/remote-config';

import { merge } from 'lodash';
import { CloudENV } from '@/models/infra.model';
import logger from '@/common/logger';
import {  IAppConfigs } from '@/common/constants';
import localAppConfig from './local-configs.json';

let firebaseApp: App | null = null;

const appConfigClient = new AppConfigDataClient({
  region: process.env.AWS_REGION || 'DEFAULT_REGION',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

const getConfigurationToken = async (): Promise<GetLatestConfigurationCommandInput> => {
  const input = {
    ApplicationIdentifier: process.env.AWS_APP_CONFIG_APPLICATION_ID,
    EnvironmentIdentifier: process.env.AWS_APP_CONFIG_ENVIRONMENT_ID || '',
    ConfigurationProfileIdentifier: process.env.AWS_APP_CONFIG_CONFIGURATION || '',
  };
  const params = {
    Application: process.env.AWS_APP_CONFIG_APPLICATION_ID || '',
    Environment: process.env.AWS_APP_CONFIG_ENVIRONMENT_ID || '',
    Configuration: process.env.AWS_APP_CONFIG_CONFIGURATION || '',
    ConfigurationToken: '', // Add the ConfigurationToken property here
  };
  const command = new StartConfigurationSessionCommand(input);
  const response = await appConfigClient
    .send(command)
    .then(res => {
      params.ConfigurationToken = res?.InitialConfigurationToken || '';
      return params;
    })
    .catch(err => {
      logger.error('Error getting configuration from AppConfig');
      logger.error(err);
      return null;
    });
  return response as GetLatestConfigurationCommandInput;
};

const getAwsAppConfig = async () => {
  try {
    //Getting app config from AWS
    const params = await getConfigurationToken();
    if (!params) {
      return {};
    }
    const command = new GetLatestConfigurationCommand(params);

    const configs = await appConfigClient.send(command).then(response => {
      if (response.Configuration) {
        return JSON.parse(Buffer.from(response.Configuration).toString('utf8'));
      }
      return {};
    });
    return configs;
  } catch (err) {
    logger.error('Error while getting configuration from AWS AppConfig');
    logger.error(err);
    return {};
  }
};

//helper for getting firebase remote config
const getFirebaseRemoteConfig = async () => {
  const appConfig: IAppConfigs = {  };
  try {
    if (!firebaseApp) {
      const encodedString = process.env.GCP_APP_CREDENTIAL;
      const credentials = JSON.parse(Buffer.from(encodedString as string, 'base64').toString('ascii'));
      firebaseApp = initializeApp({
        credential: cert({
          projectId: credentials.project_id,
          privateKey: credentials.private_key,
          clientEmail: credentials.client_email,
        }),
      });
    }

    const remoteConfig: RemoteConfig = getRemoteConfig(firebaseApp);

    const firebaseDefaultValues: any = {
    };

    const template: ServerTemplate = await remoteConfig.getServerTemplate({
      defaultConfig: {
        //Defining default params
        ...firebaseDefaultValues,
      },
    });

    await template.load();
    const configData: ServerConfig = template.evaluate();


  } catch (err) {
    logger.error('Error while getting configuration from Firebase remote config');
    logger.error(err);
  } finally {
    return appConfig;
  }
};

export default async function handler(_: NextApiRequest, res: NextApiResponse<Record<string, any>>) {
  let configs = {};

  switch (process.env.CLOUD_ENV?.toLowerCase()) {
    case CloudENV.AWS:
      const awsAppConfigs = await getAwsAppConfig();
      configs = merge(configs, awsAppConfigs);
      break;
    case CloudENV.GCP:
      //Getting app config from GCP (Firebase)
      const gcpAppConfigs = await getFirebaseRemoteConfig();
      configs = merge(configs, gcpAppConfigs);

    case CloudENV.AZURE:
    //Getting app config from Azure
    default:
      configs = merge(configs, localAppConfig);
  }
  res.status(200).json(configs);
}
