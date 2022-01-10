import { Contract } from 'ethers';

import { RootState } from '../../store';

import { CharacterModel } from '../../../entities';

export const selectGameContract = (state: RootState): Nullable<Contract> => state.game.contract;
export const selectGameContractInitializing = (state: RootState): boolean => (
  state.game.initializing
);
export const selectGameContractInitialized = (state: RootState): boolean => (
  state.game.initialized
);

export const selectDefaultCharacters = (state: RootState): CharacterModel.Character[] => (
  state.game.defaultCharacters
);
export const selectDefaultCharactersLoading = (state: RootState): boolean => (
  state.game.isDefaultCharactersLoading
);
export const selectDefaultCharactersLoaded = (state: RootState): boolean => (
  state.game.isDefaultCharactersLoaded
);

export const selectOwnedCharacters = (state: RootState): CharacterModel.Character[] => (
  state.game.ownedCharacters
);
export const selectOwnedCharactersLoading = (state: RootState): boolean => (
  state.game.isOwnedCharactersLoading
);
export const selectOwnedCharactersLoaded = (state: RootState): boolean => (
  state.game.isOwnedCharactersLoaded
);

export const selectMinting = (state: RootState): boolean => state.game.minting;
