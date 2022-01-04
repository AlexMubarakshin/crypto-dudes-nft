import { BigNumber } from 'ethers';

import { Character } from '../../../../shared';

export const contractCharacter2Frontend = (character: any): Character => ({
  cryptoFaceIndex: (character.cryptoFaceIndex as BigNumber).toNumber(),
  name: character.name,
  description: character.description,
  imageURI: character.imageURI,
  legendaryHypeLevel: (character.legendaryHypeLevel as BigNumber).toNumber(),
  hypeLevel: (character.hypeLevel as BigNumber).toNumber(),
  hypeValue: (character.hypeValue as BigNumber).toNumber(),
});
