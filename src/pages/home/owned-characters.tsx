import React from 'react';

import './owned-characters.css';

import { Typography } from '../../shared';
import { CharacterModel, CharacterUI } from '../../entities';

type Props = {
  upgrading?: boolean;
  characters: CharacterModel.Character[];

  onLegendaryLevelUpgradeClick: (characterIndex: number) => void;
  onLevelUpgradeClick: (characterIndex: number) => void;
  onInfoSaveClick: (characterIndex: number, name: string, description: string) => Promise<unknown>;
  onSellClick: (characterIndex: number, price: number) => Promise<unknown>;
};

const OwnedCharacters: React.FC<Props> = ({
  characters,
  upgrading,
  onLevelUpgradeClick,
  onLegendaryLevelUpgradeClick,
  onInfoSaveClick,
  onSellClick,
}) => (
  <div className="owned-characters">
    <Typography variant="h3" gutterBottom className="title">
      Your characters:
    </Typography>

    <CharacterUI.CharactersGrid>
      {
        characters.map((character) => (
          <CharacterUI.CharacterCardOwn
            key={character.cryptoFaceIndex}
            className="list-card"
            cryptoFaceIndex={character.cryptoFaceIndex}
            name={character.name}
            description={character.description}
            imageURI={character.imageURI}
            legendaryHypeLevel={character.legendaryHypeLevel}
            hypeLevel={character.hypeLevel}
            hypeValue={character.hypeValue}
            upgrading={upgrading}
            onLevelUpgradeClick={onLevelUpgradeClick}
            onLegendaryLevelUpgradeClick={onLegendaryLevelUpgradeClick}
            onInfoSaveClick={onInfoSaveClick}
            onSellClick={onSellClick}
          />
        ))
      }
    </CharacterUI.CharactersGrid>
  </div>
);

export default OwnedCharacters;
