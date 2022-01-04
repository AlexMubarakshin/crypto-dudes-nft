import React from 'react';

import './mint-suggestion.css';

import {
  Button, CardAction, Character, Typography,
} from '../../shared';

import CharacterCard from './character-card';

type Props = {
  characters: Character[];

  minting?: boolean;
  onMintClick: (characterIndex: number) => void;
};

const MintSuggestion: React.FC<Props> = ({ characters, minting, onMintClick }) => (
  <div className="mint-suggestion">
    <Typography variant="h3" gutterBottom className="title">
      Mint your character
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
                <Button disabled={minting} onClick={() => onMintClick(character.cryptoFaceIndex)}>
                  Mint
                </Button>
              </CardAction>
            )}
          />
        ))
      }
    </div>
  </div>
);

export default MintSuggestion;
