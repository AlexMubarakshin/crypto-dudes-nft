import React from 'react';

import classnames from 'classnames/bind';

import { Card, Character, CardMedia } from '../../shared';

import CharacterCardInfo from './character-card-info';

import style from './character-card-mint.module.css';

const cx = classnames.bind(style);

type Props = {
  className?: string;
  actions?: React.ReactElement;
  header?: React.ReactElement;
} & Character;

const CharacterCardMint: React.FC<Props> = ({
  className,

  name,
  legendaryHypeLevel,
  hypeLevel,
  hypeValue,
  description,

  actions,
  header,
}) => (
  <Card
    className={cx('character-card-mint', className)}
    actions={actions}
    header={(
      <>
        <CardMedia />
        {header}
      </>
    )}
  >
    <CharacterCardInfo
      name={name}
      legendaryHypeLevel={legendaryHypeLevel}
      hypeLevel={hypeLevel}
      hypeValue={hypeValue}
      description={description}
    />
  </Card>
);

export default CharacterCardMint;
