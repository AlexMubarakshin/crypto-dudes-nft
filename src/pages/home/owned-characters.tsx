import React from 'react';

import './owned-characters.css';

import {
  Button, CardAction, Character, Typography,
} from '../../shared';

import CharacterCard from './character-card';

type Props = {
  upgrading?: boolean;
  characters: Character[];

  onLegendaryLevelUpgradeClick: (characterIndex: number) => void;
  onLevelUpgradeClick: (characterIndex: number) => void;
};

const OwnedCharacters: React.FC<Props> = ({
  characters,
  upgrading,
  onLevelUpgradeClick,
  onLegendaryLevelUpgradeClick,
}) => (
  <div className="owned-characters">
    <Typography variant="h3" gutterBottom className="title">
      Your characters:
    </Typography>

    <div className="list">
      {
        characters.map((character) => (
          <CharacterCard
            key={character.cryptoFaceIndex}
            className="list-card"
            cryptoFaceIndex={character.cryptoFaceIndex}
            name={character.name}
            description={character.description}
            imageURI={character.imageURI}
            legendaryHypeLevel={character.legendaryHypeLevel}
            hypeLevel={character.hypeLevel}
            hypeValue={character.hypeValue}
            actions={(
              <CardAction>
                <Button
                  disabled={character.hypeLevel !== 300}
                  onClick={() => onLegendaryLevelUpgradeClick(character.cryptoFaceIndex)}
                >
                  Upgrade legendary level
                </Button>

                <Button
                  disabled={upgrading || character.hypeLevel === 300}
                  onClick={() => onLevelUpgradeClick(character.cryptoFaceIndex)}
                >
                  Upgrade character
                </Button>
              </CardAction>
            )}
          />
        ))
      }
    </div>
  </div>
);

export default OwnedCharacters;
