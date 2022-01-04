import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Contract } from 'ethers';

import { RootState } from '../../store';

import { Character, config, web3 } from '../../../shared';

import { converters } from './utils';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const compiledGameContract = require('../../../abi/CryptoFacesGame.json');

type GameStoreState = {
  contract: Nullable<Contract>;
  initialized: boolean;
  initializing: boolean;

  defaultCharacters: Character[];
  isDefaultCharactersLoading: boolean;
  isDefaultCharactersLoaded: boolean;

  ownedCharacters: Character[];
  isOwnedCharactersLoading: boolean;
  isOwnedCharactersLoaded: boolean;

  minting: boolean;
};

const initialState: GameStoreState = {
  contract: null,
  initialized: false,
  initializing: false,

  defaultCharacters: [],
  isDefaultCharactersLoading: false,
  isDefaultCharactersLoaded: false,

  ownedCharacters: [],
  isOwnedCharactersLoading: false,
  isOwnedCharactersLoaded: false,

  minting: false,
};

export const initializeContract = createAsyncThunk(
  'game/initializeContract',

  async (): Promise<Contract> => (
    web3.getContact(config.gameContactAddress, compiledGameContract.abi)
  ),
);

export const geDefaultsCharacters = createAsyncThunk(
  'game/getDefaultsCharacters',

  async (_, { getState, rejectWithValue }): Promise<any[]> => {
    const state: RootState = getState() as any;

    if (!state.game.contract) {
      return rejectWithValue('Contract not found') as any;
    }

    const contractDefaultCharacters = await state.game.contract.getDefaultCharacters();

    return contractDefaultCharacters.map(converters.contractCharacter2Frontend);
  },
);

export const getOwnedCharacters = createAsyncThunk(
  'game/getOwnedCharacters',

  async (_, { getState, rejectWithValue }): Promise<any[]> => {
    const state: RootState = getState() as any;

    if (!state.game.contract) {
      return rejectWithValue('Contract not found') as any;
    }

    const contractCharacters = await state.game.contract.getOwnedCharacters();

    return contractCharacters.map(converters.contractCharacter2Frontend);
  },
);

export const mintCharacter = createAsyncThunk(
  'game/mintCharacter',

  async (characterIndex: number, { getState, rejectWithValue }): Promise<any> => {
    const state: RootState = getState() as any;

    if (!state.game.contract) {
      return rejectWithValue('Contract not found') as any;
    }

    return state.game.contract.mintCharacterNFT(characterIndex);
  },
);

const slice = createSlice({
  name: 'game',
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

    builder.addCase(geDefaultsCharacters.pending, (state) => {
      state.isDefaultCharactersLoading = true;
    });
    builder.addCase(geDefaultsCharacters.fulfilled, (state, action) => {
      state.defaultCharacters = action.payload;
      state.isDefaultCharactersLoaded = true;
      state.isDefaultCharactersLoading = false;
    });
    builder.addCase(geDefaultsCharacters.rejected, (state) => {
      state.isDefaultCharactersLoading = false;
    });

    builder.addCase(getOwnedCharacters.pending, (state) => {
      state.isOwnedCharactersLoading = true;
    });
    builder.addCase(getOwnedCharacters.fulfilled, (state, action) => {
      state.ownedCharacters = action.payload;
      state.isOwnedCharactersLoaded = true;
      state.isOwnedCharactersLoading = false;
    });
    builder.addCase(getOwnedCharacters.rejected, (state) => {
      state.isOwnedCharactersLoading = false;
    });

    builder.addCase(mintCharacter.pending, (state) => {
      state.minting = true;
    });
    builder.addCase(mintCharacter.fulfilled, (state) => {
      state.minting = false;
    });
    builder.addCase(mintCharacter.rejected, (state) => {
      state.minting = false;
    });
  },
});

export const { actions, reducer } = slice;
