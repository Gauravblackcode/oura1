import '@/styles/globals.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import 'reactflow/dist/style.css';
import { ReactFlowProvider } from 'reactflow';
import React, { useEffect } from 'react';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { StyledEngineProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SWRConfig } from 'swr';
import { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { useRouter } from 'next/router';
import { setCollectorUrl } from '@snowplow/browser-tracker';
import createEmotionCache from '@/common/emotion-cache';
import { useStore } from '@/redux/store';
import ToastMessage from '@/components/toast-store-message/toast-store-message.component';
import DialogProvider from '@/contexts/dialog/dialog.provider';
import SnowAnalyticsService from '@/services/analytics/snow-analytics.service';
import { trackPageView } from '@/lib/snowplow/index';
import ErrorBoundary from '@/components/error-boundary/error-boundary.component';
import environments from '@/common/environments';
import Oura1Dialog from '@/components/dialog/dialog-v2.component';
import Oura1Alert from '@/components/alert/alert.container';
import { getFirstWordAfterSlash } from '@/common/helpers';
import { setAppConfigs, showLoader } from '@/redux/actions';
import { fetchAppConfigs } from '@/common/app-config.helper';
import { IAppConfigs } from '@/common/constants';
import AlertProvider from '../contexts/alert/alert.provider';
import MainLayout from '../layouts/main-layout/main-layout';
import DataLoader from '../components/data-loader/data-loader.component';
import { NextPageWithLayout } from '../types/common';

const clientSideEmotionCache = createEmotionCache();

interface Props extends AppProps {
  Component: NextPageWithLayout;
  emotionCache: EmotionCache;
}

const App = (props: Props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout || (page => page);
  const store = useStore(pageProps.initialReduxState);

  useEffect(() => {
    async function getConfig() {
      const config = await fetchAppConfigs();
      setAppConfigs(config as IAppConfigs);
      if (typeof window !== 'undefined') {
        (window as any).__APP_CONFIG__ = config;
        showLoader(false);
      }
    }
    getConfig();
  }, []);

  useEffect(() => {
    if (environments.TRACKINGS_ENABLED) {
      new SnowAnalyticsService().initializeTrackers();
    }
    /* Enforcing http protocol for snowplow events */
    if (environments.SNOWPLOW_URL) {
      setCollectorUrl(environments.SNOWPLOW_URL, ['cdp_front_end']);
    }
  }, []);

  const router = useRouter();

  useEffect(() => {
    if (router.pathname.length > 0) {
      trackPageView({ title: getFirstWordAfterSlash(router.pathname) });
    }
  }, [router.pathname]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <CacheProvider value={emotionCache}>
        <Provider store={store}>
          <StyledEngineProvider injectFirst>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <AlertProvider>
                <DialogProvider>
                  <SWRConfig
                    value={{
                      revalidateOnFocus: false,
                      revalidateOnMount: true,
                    }}
                  >
                    <ErrorBoundary>
                      <MainLayout>
                        <NextNProgress color="#0a2c45" />
                        <ReactFlowProvider>{getLayout(<Component {...pageProps} />)}</ReactFlowProvider>
                        <DataLoader />
                        <ToastMessage />
                      </MainLayout>
                      <Oura1Dialog />
                      <Oura1Alert />
                    </ErrorBoundary>
                  </SWRConfig>
                </DialogProvider>
              </AlertProvider>
            </LocalizationProvider>
          </StyledEngineProvider>
        </Provider>
      </CacheProvider>
    </>
  );
};

export default App;
