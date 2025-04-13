import React, { PropsWithChildren, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Button from '@/components/button/button.component';
import useUser from '@/contexts/user-data/user-data.hook';
import UsersService from '@/services/users/users.service';
import logger from '@/common/logger';
import useOnboarding from '@/contexts/onboarding/onboarding.hook';
import useAlert from '@/contexts/alert/alert.hook';
import { ScrollTextIcon } from '@/lib/icons';
import useConfigs from '@/contexts/app-configs/app-configs.hooks';
import { AlertVariant } from '@/contexts/alert/alert.provider';
import { clearLocalStorage } from '@/common/helpers';
import ROUTES from '@/common/routes';
import styles from './auth-prerequisite-boundary.module.scss';

const AuthPrerequisiteBoundary: React.FC<PropsWithChildren> = ({ children }) => {
  const { termsAndConditionsUrl } = useConfigs();
  const { user, isAdvertiser, refetchUser } = useUser();
  const { isFirstLogin, hasAcceptedTerms, isTutorialShown } = useOnboarding();
  const { showAlert } = useAlert();
  const router = useRouter();
  const userService = new UsersService();
  const [isTermsDialogVisible, setIsTermsDialogVisible] = useState<boolean>(false);

  const policyAction = async (type: 'accept' | 'reject') => {
    try {
      if (user?.id) {
        const { data } = await userService.acceptTermsAndConditionsAdvanced(user?.id, type === 'accept');
        if (type === 'accept') {
          if (data.acceptTermsAndConditionsUserAdvanced) {
            showAlert('Successfully accepted Terms and Condition', AlertVariant.SUCCESS);
            await refetchUser();
          }
        } else if (type === 'reject') {
          clearLocalStorage();
          router.replace(ROUTES.AUTH.LOGOUT);
        }
      }
    } catch (error) {
      logger.error(error);
      showAlert('Something went wrong while accepting Terms and Condition');
    } finally {
      setIsTermsDialogVisible(false);
    }
  };

  useEffect(() => {
    if (user && isAdvertiser && !hasAcceptedTerms) {
      if (isFirstLogin) {
        if (isTutorialShown) {
          setIsTermsDialogVisible(true);
        }
        return;
      }
      setIsTermsDialogVisible(true);
    }
  }, [isFirstLogin, user, isAdvertiser, isTutorialShown, hasAcceptedTerms]);

  return (
    <div>
      <Dialog
        open={isTermsDialogVisible}
        slotProps={{
          backdrop: {
            classes: {
              root: styles.backdrop_container,
            },
          },
        }}
      >
        <DialogTitle>
          <div className={styles.dialog_container_class}>
            <ScrollTextIcon className={styles.icon} />
            <span> Terms of Service </span>
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <iframe
              title="terms policy"
              style={{
                width: '100%',
              }}
              width="1000"
              height="400"
              src={termsAndConditionsUrl}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions className={styles.policy_action_class}>
          <Button className={styles.decline_button} onClick={() => policyAction('reject')} title="Decline" />
          <Button className={styles.accept_button} onClick={() => policyAction('accept')} autoFocus title="Accept" />
        </DialogActions>
      </Dialog>
      {children}
    </div>
  );
};

export default AuthPrerequisiteBoundary;
