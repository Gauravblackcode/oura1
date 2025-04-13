import { WalletActionType } from 'types';

export interface IAllWallets {
  pagination: {
    pageNo: number;
    pageSize: number;
    total: number;
  };
}

export const ManageFundTypes = {
  ADD: WalletActionType.Add,
  TRANSFER: WalletActionType.Transfer,
};
export const ManageFundTitle = {
  [ManageFundTypes.ADD]: 'Increase Amount',
  [ManageFundTypes.TRANSFER]: 'Transfer Amount',
};
