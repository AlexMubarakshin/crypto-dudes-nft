import { BigNumber } from 'ethers';

import { CharacterModel } from '../../../../entities';

export const contractCharacter2Frontend = (character: any): CharacterModel.Character => ({
  cryptoFaceIndex: (character.cryptoFaceIndex as BigNumber).toNumber(),
  name: character.name,
  description: character.description,
  imageURI: character.imageURI,
  legendaryHypeLevel: (character.legendaryHypeLevel as BigNumber).toNumber(),
  hypeLevel: (character.hypeLevel as BigNumber).toNumber(),
  hypeValue: (character.hypeValue as BigNumber).toNumber(),
});
