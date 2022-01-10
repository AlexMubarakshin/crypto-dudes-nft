import React from 'react';

import './mint-suggestion.css';

import { CharacterModel, CharacterUI } from '../../entities';

import {
  Button, CardActions, Typography,
} from '../../shared';

type Props = {
  characters: CharacterModel.Character[];

  minting?: boolean;
  onMintClick: (characterIndex: number) => void;
};

const MintSuggestion: React.FC<Props> = ({ characters, minting, onMintClick }) => (
  <div className="mint-suggestion">
    <Typography variant="h3" gutterBottom className="title">
      Mint your character
    </Typography>

    <CharacterUI.CharactersGrid>
      {
        characters.map((character) => (
          <CharacterUI.CharacterCardMint
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
              <CardActions>
                <Button disabled={minting} onClick={() => onMintClick(character.cryptoFaceIndex)}>
                  Mint
                </Button>
              </CardActions>
            )}
          />
        ))
      }
    </CharacterUI.CharactersGrid>
  </div>
);

export default MintSuggestion;
