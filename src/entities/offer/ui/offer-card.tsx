import React from 'react';

import {
  Button, Card, CardActions, CardMedia, Typography,
} from '../../../shared';
import { Offer } from '../model';

type Props = {
  className?: string;
} & Offer;

const OfferCard: React.FC<Props> = ({
  className,
  price,
  tokenId,
}) => (
  <Card
    className={className}
    header={<CardMedia />}
    actions={(
      <CardActions>
        <Button disabled>
          Buy
        </Button>
      </CardActions>
    )}
  >
    <Typography>
      TokenId:
      {' '}
      <b>{tokenId}</b>
    </Typography>
    <Typography>
      Price:
      {' '}
      <b>{price}</b>
    </Typography>
  </Card>
);

export default OfferCard;
