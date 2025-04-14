import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Typography, ouraColors } from '@/lib/dsl/dsl';
import Link from 'next/link';
import SignupForm from '@/modules/auth/components/signup-form.component';
import styles from '@/modules/auth/styles/signup.module.scss';

const SignupPage = () => {
  return (
    <div className={styles.pageContainer}>
      <Head>
        <title>Sign Up - Oura1</title>
      </Head>
      <div className={styles.leftContainer}>
        <div className={styles.header}>
          <Image src="/assets/images/oura1-logo.png" alt="Oura1 Logo" width={120} height={40} />
        </div>
        <div className={styles.imageContainer}>
          <Image src="/assets/images/auth-image.png" alt="Auth Image" width={500} height={500} />
        </div>
      </div>

      <div className={styles.rightContainer}>
        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            <div className={styles.welcomeTitle}>
              <div className={styles.brandIconTitle}>
                <Typography variant="h1-bold">Oura1</Typography>
              </div>
              <Typography variant="subtitle-regular" color={ouraColors['text-600']}>
                Create your account to get started
              </Typography>
            </div>
          </div>
          <div className={styles.formField}>
            <SignupForm />
            <Typography variant="body-medium">
              Already have an account?{' '}
              <Link href="/login" className={styles.inviteLink}>
                Log in
              </Link>
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage; 