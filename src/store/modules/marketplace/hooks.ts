import { useCallback, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';

import { initializeContract, getOffers, createOffer } from './store';
import {
  selectOffersLoading,
  selectOffers,
  selectMarketplaceContractInitialized,
} from './selectors';

export const useMarketplace = () => {
  const dispatch = useAppDispatch();

  // eslint-disable-next-line max-len
  const contractInitialized = useAppSelector(selectMarketplaceContractInitialized);

  const loading = useAppSelector(selectOffersLoading);
  const offers = useAppSelector(selectOffers);

  useEffect(() => {
    if (!contractInitialized) {
      dispatch(initializeContract());
    } else {
      dispatch(getOffers());
    }
  }, [contractInitialized]);

  // eslint-disable-next-line max-len
  const setOffer = useCallback((index: number, price: number): Promise<unknown> => dispatch(createOffer({
    tokenId: index,
    price,
  })), []);

  return ({
    loading,
    offers,
    setOffer,
  });
};
