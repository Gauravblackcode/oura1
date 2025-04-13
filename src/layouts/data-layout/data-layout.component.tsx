import { PropsWithChildren } from 'react';
import Head from 'next/head';
import AccountDataProvider from '@/contexts/account/account-data.provider';
import UserDataProvider from '@/contexts/user-data/user-data.provider';

interface IDataLayout {
  title?: string;
}

const DataLayout: React.FC<PropsWithChildren<IDataLayout>> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <UserDataProvider>
        <AccountDataProvider>{children}</AccountDataProvider>
      </UserDataProvider>
    </>
  );
};

export default DataLayout;
