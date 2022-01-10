import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';

import { initializeContract } from './store';
import {
  selectNftContract,
  selectNftContractInitialized,
  selectUpgrading,
} from './selectors';

export const useNFTContract = () => {
  const dispatch = useAppDispatch();

  const contract = useAppSelector(selectNftContract);
  const initialized = useAppSelector(selectNftContractInitialized);

  const upgrading = useAppSelector(selectUpgrading);

  useEffect(() => {
    if (!initialized) {
      dispatch(initializeContract());
    }
  }, [initialized]);

  return ({
    contract,
    initialized,
    upgrading,
  });
};
