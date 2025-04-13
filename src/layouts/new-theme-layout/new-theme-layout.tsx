import { NextPage } from 'next';
import { PropsWithChildren } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import useAccount from '@/contexts/account/account-data.hook';
import theme, { colors } from '@/lib/material-ui/theme';
import InternalLayout from '../internal-layout/internal-layout';

const NewThemeLayout: NextPage<PropsWithChildren<any>> = ({ children, head }) => {
  const { account } = useAccount();

  const theme1 = createTheme(theme, {
    palette: {
      primary: {
        main: account?.primaryColor ?? colors.primaryDefault,
      },
    },
  });
  return (
    <InternalLayout head={head}>
      <div style={{ backgroundColor: '#f2f5f7', height: '100%', overflow: 'auto' }}>
        <ThemeProvider theme={theme1}>{children}</ThemeProvider>
      </div>
    </InternalLayout>
  );
};

export default NewThemeLayout;
