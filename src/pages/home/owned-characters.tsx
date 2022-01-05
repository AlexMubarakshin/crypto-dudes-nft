import React from 'react';

import './owned-characters.css';

import { Character, Typography } from '../../shared';

import OwnCharacterCard from './character-card-own';

type Props = {
  upgrading?: boolean;
  characters: Character[];

  onLegendaryLevelUpgradeClick: (characterIndex: number) => void;
  onLevelUpgradeClick: (characterIndex: number) => void;
  onInfoSaveClick: (characterIndex: number, name: string, description: string) => void;
};

const OwnedCharacters: React.FC<Props> = ({
  characters,
  upgrading,
  onLevelUpgradeClick,
  onLegendaryLevelUpgradeClick,
  onInfoSaveClick,
}) => (
  <div className="owned-characters">
    <Typography variant="h3" gutterBottom className="title">
      Your characters:
    </Typography>

    <div className="list">
      {
        characters.map((character) => (
          <OwnCharacterCard
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
          />
        ))
      }
    </div>
  </div>
);

export default OwnedCharacters;
