import React from 'react';

import {
  gameModule, nftModule, useAppDispatch, useAppSelector,
} from '../../store';

import {
  Container, Loader,
} from '../../shared';

import { NavigationHeader } from '../../widgets';

import MintSuggestion from './mint-suggestion';
import OwnedCharacters from './owned-characters';

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();

  const gameContract = useAppSelector(gameModule.selectGameContract);
  const gameContractInitialized = useAppSelector(gameModule.selectGameContractInitialized);

  const nftContract = useAppSelector(nftModule.selectNftContract);
  const nftContractInitialized = useAppSelector(nftModule.selectNftContractInitialized);

  const defaultsCharacters = useAppSelector(gameModule.selectDefaultCharacters);

  const ownedCharacters = useAppSelector(gameModule.selectOwnedCharacters);
  const isOwnedCharactersLoaded = useAppSelector(gameModule.selectOwnedCharactersLoaded);

  const isMinting = useAppSelector(gameModule.selectMinting);
  const upgrading = useAppSelector(nftModule.selectUpgrading);

  const isContractInitialized = gameContractInitialized && nftContractInitialized;

  React.useEffect(() => {
    const promises: Promise<unknown>[] = [];
    promises.push(dispatch(nftModule.initializeContract()));
    promises.push(dispatch(gameModule.initializeContract()));

    Promise.all(promises).then(() => {
      dispatch(gameModule.geDefaultsCharacters());
      dispatch(gameModule.getOwnedCharacters());
    });
  }, []);

  React.useEffect(() => {
    if (gameContract) {
      gameContract.on('CharacterNFTMinted', (...args: any[]) => {
        console.log({ CharacterNFTMinted: args });

        dispatch(gameModule.getOwnedCharacters());
      });
    }
  }, [gameContract]);

  React.useEffect(() => {
    if (nftContract) {
      nftContract.on('LevelUpdated', (...args: any[]) => {
        console.log({ LevelUpdate: args });

        dispatch(gameModule.getOwnedCharacters());
      });

      nftContract.on('LegendaryLevelUpdated', (...args: any[]) => {
        console.log({ LegendaryLevelUpdated: args });

        dispatch(gameModule.getOwnedCharacters());
      });
    }
  }, [nftContract]);

  const onMintClick = (characterIndex: number) => {
    dispatch(gameModule.mintCharacter(characterIndex));
  };

  const onOwnCharacterLevelUpClick = React.useCallback((characterIndex: number) => {
    dispatch(nftModule.upgradeFace(characterIndex));
  }, []);

  const onOwnCharacterLegendaryLevelUpClick = React.useCallback((characterIndex: number) => {
    dispatch(nftModule.upgradeLegendaryLevel(characterIndex));
  }, []);

  // eslint-disable-next-line max-len
  const onOwnCharacterInfoSave = React.useCallback((characterIndex: number, name: string, description: string) => {
    console.log({ characterIndex, name, description }); // TODO: Call edit action
  }, []);

  return (
    <Container header={<NavigationHeader />}>
      {
        isContractInitialized && (
          <>
            {
              isOwnedCharactersLoaded && !ownedCharacters.length && (
                <MintSuggestion
                  minting={isMinting}
                  characters={defaultsCharacters}
                  onMintClick={onMintClick}
                />
              )
            }

            {
              isOwnedCharactersLoaded && !!ownedCharacters.length && (
                <OwnedCharacters
                  upgrading={upgrading}
                  characters={ownedCharacters}
                  onLevelUpgradeClick={onOwnCharacterLevelUpClick}
                  onLegendaryLevelUpgradeClick={onOwnCharacterLegendaryLevelUpClick}
                  onInfoSaveClick={onOwnCharacterInfoSave}
                />
              )
            }
          </>
        )
      }

      {
        !isContractInitialized && (
          <Loader />
        )
      }
    </Container>
  );
};

export default HomePage;
