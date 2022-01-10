import { BigNumber } from 'ethers';

import { OfferModel } from '../../../../entities';

export const contractCharacter2Frontend = (offer: any): OfferModel.Offer => ({
  seller: offer.seller,
  price: (offer.price as BigNumber).toString(),
  index: offer.index,
  tokenId: (offer.tokenId as BigNumber).toNumber(),
  active: offer.active,
});
