"use client";

import { useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { Button, ouraColors, Typography } from '@/lib/dsl/dsl';
import Link from 'next/link';
import { ROUTE_REFS } from '@/common/constants';
import environments from '@/common/environments';
import useConfigs from '@/contexts/app-configs/app-configs.hooks';
import { IRootState } from '@/redux/reducers';
import authLogo from '@/assets/images/auth0-logo-black-and-white 1.png';
import styles from '../styles/login.module.scss';
import LoginForm from '../components/login-form.component';

const Login = () => {
  const router = useRouter();
  // const { client } = useConfigs();
  const { loader } = useSelector((state: IRootState) => state.common);

  const loginRef = useRef<HTMLDivElement | null>(null);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    router.push(ROUTE_REFS.login);
  };

  return (
    <div className={styles.pageContainer}>
      <Head>
        <title>Oura1 login</title>
      </Head>
      <div className={styles.leftContainer}>
        <div className={styles.header}>
          <img 
            src="/images/OURA.1 - Primary Logo large canvas.png" 
            width={120} 
            height={40} 
            alt="OURA.1 Logo" 
          />
        </div>
        <div className={styles.imageContainer}>
          <img src="/images/OURA.1 - Primary Logo large canvas.png" alt="Dashboard Image" />
        </div>
      </div>

      <div className={styles.rightContainer} ref={loginRef}>
        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            {!loader ? (
              <div className={styles.welcomeTitle}>
                <div className={styles.brandIconTitle}>
                  <img 
                    src="/images/OURA.1 - Primary Logo large canvas.png" 
                    width={50} 
                    height={55} 
                    alt="OURA.1 Logo" 
                  />
                  <Typography variant="h1-bold">Oura1</Typography>
                </div>
                <Typography variant="subtitle-regular" color={ouraColors['text-600']}>
                  Log-in to your account
                </Typography>
              </div>
            ) : (
              <div className={styles.welcomeTitle}>
                <Typography variant="h1-bold" color={ouraColors['brand-900']}>
                  Welcome back!
                </Typography>
                <Typography variant="subtitle-regular" color={ouraColors['text-600']}>
                  Log-in to your account
                </Typography>
              </div>
            )}
          </div>
          <div className={styles.formField}>
            <LoginForm />
            <Typography variant="body-medium">
              {/* Optimize your retail media campaign today!{' '} */}
              <Link href={""} className={styles.inviteLink}>
                Get in touch
              </Link>
              .
            </Typography>
          </div>

          {/* <div className={styles.formFooter}>
            <Link href={client?.website ?? ''} color={ouraColors['links-blue']}>
              <Typography color={ouraColors['links-blue']}>Visit Website</Typography>
            </Link>
            <Link href={client?.termsAndCondition ?? ''} color={ouraColors['links-blue']}>
              <Typography color={ouraColors['links-blue']}>Terms & Conditions</Typography>
            </Link>
            <Link href={client?.privacyPolicy ?? ''} color={ouraColors['links-blue']}>
              <Typography color={ouraColors['links-blue']}>Privacy Policy</Typography>
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
