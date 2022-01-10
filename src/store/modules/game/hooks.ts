import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';

import { initializeContract, geDefaultsCharacters, getOwnedCharacters } from './store';
import {
  selectGameContract,
  selectGameContractInitialized,
  selectDefaultCharacters,
  selectOwnedCharacters,
  selectOwnedCharactersLoaded,
  selectMinting,
} from './selectors';

export const useGameContract = () => {
  const dispatch = useAppDispatch();

  const contract = useAppSelector(selectGameContract);
  const initialized = useAppSelector(selectGameContractInitialized);

  const defaultsCharacters = useAppSelector(selectDefaultCharacters);

  const ownedCharacters = useAppSelector(selectOwnedCharacters);
  const isOwnedCharactersLoaded = useAppSelector(selectOwnedCharactersLoaded);

  const isMinting = useAppSelector(selectMinting);

  useEffect(() => {
    if (!initialized) {
      dispatch(initializeContract())
        .then(() => {
          dispatch(geDefaultsCharacters());
          dispatch(getOwnedCharacters());
        });
    }
  }, [initialized]);

  return ({
    contract,
    initialized,
    defaultsCharacters,
    ownedCharacters,
    isOwnedCharactersLoaded,
    isMinting,
  });
};
