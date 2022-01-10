import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Contract } from 'ethers';

import { OfferModel } from '../../../entities';

import { RootState } from '../../store';

import { config, web3 } from '../../../shared';

import { converters } from './utils';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const compiledMarketplaceContract = require('../../../abi/Marketplace.json');

type MarketplaceStoreState = {
  contract: Nullable<Contract>;
  initialized: boolean;
  initializing: boolean;

  offers: OfferModel.Offer[];
  loaded: boolean;
  loading: boolean;
};

const initialState: MarketplaceStoreState = {
  contract: null,
  initialized: false,
  initializing: false,

  offers: [],
  loaded: false,
  loading: false,
};

export const initializeContract = createAsyncThunk(
  'marketplace/initializeContract',

  async (): Promise<Contract> => (
    web3.getContact(config.marketplaceContactAddress, compiledMarketplaceContract.abi)
  ),
);

export const getOffers = createAsyncThunk(
  'marketplace/getOffers',

  async (_, { getState, rejectWithValue }): Promise<OfferModel.Offer[]> => {
    const state: RootState = getState() as any;

    if (!state.marketplace.contract) {
      return rejectWithValue('Contract not found') as any;
    }

    const offers = await state.marketplace.contract.getOffers();

    return offers.map(converters.contractCharacter2Frontend);
  },
);

export const createOffer = createAsyncThunk(
  'marketplace/createOffer',
  async (data: { price: number, tokenId: number }, { getState, rejectWithValue }): Promise<any> => {
    const state: RootState = getState() as any;

    if (!state.marketplace.contract) {
      return rejectWithValue('Contract not found') as any;
    }

    return state.marketplace.contract.createOffer(data.price, data.tokenId);
  },
);

const slice = createSlice({
  name: 'marketplace',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initializeContract.pending, (state) => {
      state.initializing = true;
    });
    builder.addCase(initializeContract.fulfilled, (state, action) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.contract = action.payload;
      state.initializing = false;
      state.initialized = true;
    });
    builder.addCase(initializeContract.rejected, (state) => {
      state.initializing = false;
    });

    builder.addCase(getOffers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOffers.fulfilled, (state, action) => {
      state.offers = action.payload;
      state.loading = false;
      state.loaded = true;
    });
    builder.addCase(getOffers.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { actions, reducer } = slice;
