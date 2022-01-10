import React from 'react';
import { Input, Typography } from '../../../shared';

type Props = {
  value?: number;
  onPriceChange: (price: number) => void;
};

const CharacterCardInfoFormSell: React.FC<Props> = ({
  value,
  onPriceChange,
}) => {
  const onPriceChangeHandler = (price: string) => {
    onPriceChange(Number(price));
  };

  return (
    <>
      <Typography variant="body" bold>
        Set your price
      </Typography>

      <Input
        autoFocus
        value={value}
        onTextChange={onPriceChangeHandler}
        type="number"
        placeholder="Price"
      />
    </>
  );
};
export default CharacterCardInfoFormSell;
