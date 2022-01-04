import React from 'react';

import classnames from 'classnames/bind';

import { Card, Character, Typography } from '../../shared';

import style from './character-card.module.css';

const cx = classnames.bind(style);

type Props = {
  className?: string;
  actions?: React.ReactElement;
} & Character;

const CharacterCard: React.FC<Props> = ({
  className,

  name,
  legendaryHypeLevel,
  hypeLevel,
  hypeValue,
  description,

  actions,
}) => (
  <Card
    className={cx('character-card', className)}
    actions={actions}
  >
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
    <Typography>{description}</Typography>
  </Card>
);

export default CharacterCard;
