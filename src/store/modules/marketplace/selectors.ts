import { Contract } from 'ethers';
import { RootState } from '../../store';
import { OfferModel } from '../../../entities';

// eslint-disable-next-line max-len
export const selectMarketplaceContract = (state: RootState): Nullable<Contract> => state.marketplace.contract;
export const selectMarketplaceContractInitializing = (state: RootState): boolean => (
  state.marketplace.initializing
);
export const selectMarketplaceContractInitialized = (state: RootState): boolean => (
  state.marketplace.initialized
);

export const selectOffers = (state: RootState): OfferModel.Offer[] => state.marketplace.offers;
export const selectOffersLoading = (state: RootState): boolean => state.marketplace.loading;
export const selectOffersLoaded = (state: RootState): boolean => state.marketplace.loaded;
