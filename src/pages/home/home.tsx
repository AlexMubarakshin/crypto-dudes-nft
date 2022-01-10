import React from 'react';

import {
  gameModule, nftModule, marketplaceModule, useAppDispatch,
} from '../../store';

import {
  Container, Loader,
} from '../../shared';

import { NavigationHeader } from '../../widgets';

import MintSuggestion from './mint-suggestion';
import OwnedCharacters from './owned-characters';

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();

  const {
    contract: gameContract,
    initialized: gameContractInitialized,
    defaultsCharacters,
    ownedCharacters,
    isOwnedCharactersLoaded,
    isMinting,
  } = gameModule.hooks.useGameContract();

  const {
    contract: nftContract,
    initialized: nftContractInitialized,
    upgrading,
  } = nftModule.hooks.useNFTContract();

  const { setOffer } = marketplaceModule.hooks.useMarketplace();

  const isContractInitialized = gameContractInitialized && nftContractInitialized;

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

      nftContract.on('InfoUpdated', (...args: any[]) => {
        console.log({ InfoUpdated: args });

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
  const onOwnCharacterInfoSave = React.useCallback((characterIndex: number, name: string, description: string) => dispatch(nftModule.updateCharacterInfo({
    characterIndex,
    name,
    description,
  })), []);

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
                  onSellClick={setOffer}
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
