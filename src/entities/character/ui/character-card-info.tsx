import React from 'react';

import { Typography } from '../../../shared';

import './character-card-info.css';

type Props = {
  name: string;

  legendaryHypeLevel: number;
  hypeLevel: number;
  hypeValue: number;
  description: string;
};

const CharacterCardInfo: React.FC<Props> = ({
  name,

  legendaryHypeLevel,
  hypeLevel,
  hypeValue,
  description,
}) => (
  <>
    <Typography><b>{name}</b></Typography>
    <Typography>
      Legendary hype level:
      {' '}
      <b>{legendaryHypeLevel}</b>
    </Typography>
    <Typography>
      Hype level:
      {' '}
      <b>{hypeLevel}</b>
    </Typography>
    <Typography>
      Hype value:
      {' '}
      <b>{hypeValue}</b>
    </Typography>
    <Typography className="character-description">{description}</Typography>
  </>
);

export default CharacterCardInfo;
