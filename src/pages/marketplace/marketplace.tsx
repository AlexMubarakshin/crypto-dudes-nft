import React from 'react';

import { marketplaceModule } from '../../store';

import { NavigationHeader } from '../../widgets';

import { Container, Typography } from '../../shared';
import { CharacterUI, OfferUI } from '../../entities';

import EmptyPlaceholder from './empty-placeholder';

import './marketplace.css';

const MarketplacePage: React.FC = () => {
  const { loading, offers } = marketplaceModule.hooks.useMarketplace();

  return (
    <Container className="marketplace" header={<NavigationHeader />}>
      {
        (!loading && !offers.length) && (
          <EmptyPlaceholder />
        )
      }

      {
        !loading && !!offers.length && (
          <div>
            <Typography variant="h3" gutterBottom className="title">
              Offers:
            </Typography>

            <CharacterUI.CharactersGrid>
              {
                offers.map((offer) => (
                  <OfferUI.OfferCard
                    key={offer.tokenId}
                    seller={offer.seller}
                    price={offer.price}
                    index={offer.index}
                    tokenId={offer.tokenId}
                    active={offer.active}
                  />
                ))
              }
            </CharacterUI.CharactersGrid>
          </div>
        )
      }
    </Container>
  );
};

export default MarketplacePage;
