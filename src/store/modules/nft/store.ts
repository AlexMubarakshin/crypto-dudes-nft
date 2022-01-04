import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Contract } from 'ethers';
import { RootState } from '../../store';
import { config, web3 } from '../../../shared';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const compiledNFTContract = require('../../../abi/CryptoFacesNFT.json');

type NftStoreState = {
  contract: Nullable<Contract>;
  initialized: boolean;
  initializing: boolean;
  upgrading: boolean;
};

const initialState: NftStoreState = {
  contract: null,
  initialized: false,
  initializing: false,
  upgrading: false,
};

export const initializeContract = createAsyncThunk(
  'nft/initializeContract',

  async (): Promise<Contract> => web3.getContact(config.nftContactAddress, compiledNFTContract.abi),
);

export const upgradeFace = createAsyncThunk(
  'game/upgradeFace',

  async (characterIndex: number, { getState, rejectWithValue }): Promise<any> => {
    const state: RootState = getState() as any;

    if (!state.nft.contract) {
      return rejectWithValue('Contract not found') as any;
    }

    return state.nft.contract.upgradeFace(characterIndex);
  },
);

export const upgradeLegendaryLevel = createAsyncThunk(
  'game/upgradeLegendaryLevel',

  async (characterIndex: number, { getState, rejectWithValue }): Promise<any> => {
    const state: RootState = getState() as any;

    if (!state.nft.contract) {
      return rejectWithValue('Contract not found') as any;
    }

    return state.nft.contract.upgradeLegendaryLevel(characterIndex);
  },
);

const slice = createSlice({
  name: 'nft',
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

    builder.addCase(upgradeFace.pending, (state) => {
      state.upgrading = true;
    });
    builder.addCase(upgradeFace.fulfilled, (state) => {
      state.upgrading = false;
    });
    builder.addCase(upgradeFace.rejected, (state) => {
      state.upgrading = false;
    });
  },
});

export const selectNftContract = (state: RootState): Nullable<Contract> => state.nft.contract;
export const selectNftContractInitializing = (state: RootState): boolean => state.nft.initializing;
export const selectNftContractInitialized = (state: RootState): boolean => state.nft.initialized;

export const selectUpgrading = (state: RootState): boolean => state.nft.upgrading;

export const { actions, reducer } = slice;
