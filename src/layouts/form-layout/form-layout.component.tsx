import React, { PropsWithChildren, RefObject } from 'react';
import { carterColors, StepperBreadcrumb, Typography } from 'shyftlabs-dsl';
import { useRouter } from 'next/router';
import { Form } from 'formik';
import { ChevronLeftIcon } from '@/lib/icons';
import { LabelToolTip } from '@/components/tooltip';
import styles from './form-layout.module.scss';
import ProgressPanel, { IProgressPanel } from './progress-panel/progress-panel.component';

interface IFormLayout {
  stepsConfig?: { steps: string[]; activeStep: number };
  backTitle?: string;
  pageTitle?: string;
  progressConfigs?: IProgressPanel;
  onBackClick?: () => void;
  ActionComponent?: React.ComponentType;
  layoutRef?: RefObject<HTMLDivElement>;
}

export const FormLayout: React.FC<PropsWithChildren<IFormLayout>> = props => {
  const router = useRouter();
  const {
    layoutRef,
    children,
    onBackClick = router.back,
    backTitle,
    pageTitle,
    stepsConfig,
    progressConfigs,
    ActionComponent,
  } = props;
  return (
    <Form ref={layoutRef as any} className={styles.container}>
      <div className={styles.header_container}>
        <div className={styles.title_container}>
          <button className={styles.back_actions} type="button" onClick={onBackClick}>
            <div className={styles.back_button}>
              <ChevronLeftIcon size={20} />
            </div>
            <Typography fontWeight="Medium" color={carterColors['brand-600']} trimLength={20}>
              {backTitle}
            </Typography>
          </button>
          <Typography variant="body-large-semibold" color={carterColors['text-900']}>
            <LabelToolTip
              buttonProps={{
                style: { color: carterColors['links-blue'] },
              }}
              label={pageTitle || 'Untitled'}
            />
          </Typography>
          <div className={styles.actions_container}>{ActionComponent ? <ActionComponent /> : null}</div>
        </div>
        {Number(stepsConfig?.steps.length) > 0 && (
          <div className={styles.steps_container}>
            <StepperBreadcrumb {...stepsConfig} />
          </div>
        )}
      </div>
      <div className={styles.body_container}>
        {progressConfigs?.title && (
          <ProgressPanel hasStepsAbove={Number(stepsConfig?.steps.length) > 0} {...progressConfigs} />
        )}
        {children}
      </div>
    </Form>
  );
};
