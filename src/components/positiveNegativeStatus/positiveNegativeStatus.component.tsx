import React from 'react';
import { WalletHistoryType } from 'types';
import { fundType, numericHelper } from '@/common/helpers';
import { AlertTriangleIcon, ClockIcon } from '@/lib/icons';
import styles from '../status-chip/status-chip.module.scss';
import { Oura1Tooltip } from '../tooltip';

type IProps = {
  value: string;
  variant: string;
  activityType: WalletHistoryType;
};

const NegativePositiveHandler: React.FC<IProps> = (props: IProps) => {
  const { value, activityType, variant } = props;
  const isPending = activityType === WalletHistoryType.WalletFundsAllocatedWithLegalContractPending;
  const isDenied = [
    WalletHistoryType.WalletFundsAllocatedWithLegalContractDenied,
    WalletHistoryType.WalletFundsDenied,
  ].includes(activityType);
  const isPaymentFailed = activityType === WalletHistoryType.WalletAddFundsWithCreditCardFailed;
  return (
    <div className={styles[variant.toLowerCase()]} data-denied={isDenied} data-pending={isPending}>
      <p className={Number(value) < 0 ? styles.debit : styles[variant]}>
        {!!value && !isDenied && (variant === fundType.debit || Number(value) < 0 ? '-' : '+')}
        {numericHelper(Math.abs(Number(value)), { append: '$', trimTo: 5, includeZero: true })}
      </p>
      {(isPending || isDenied || isPaymentFailed) && (
        <Oura1Tooltip
          title={isPending ? 'Pending Approval' : isPaymentFailed ? 'Credit Card Payment Failed' : 'Approval Denied'}
        >
          <span className={styles.clock_svg}>
            {isPending ? <ClockIcon size={18} /> : <AlertTriangleIcon size={18} />}
          </span>
        </Oura1Tooltip>
      )}
    </div>
  );
};

export default NegativePositiveHandler;
