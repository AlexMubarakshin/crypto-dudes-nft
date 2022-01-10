import { Contract } from 'ethers';

import { RootState } from '../../store';

export const selectNftContract = (state: RootState): Nullable<Contract> => state.nft.contract;
export const selectNftContractInitializing = (state: RootState): boolean => state.nft.initializing;
export const selectNftContractInitialized = (state: RootState): boolean => state.nft.initialized;

export const selectUpgrading = (state: RootState): boolean => state.nft.upgrading;
