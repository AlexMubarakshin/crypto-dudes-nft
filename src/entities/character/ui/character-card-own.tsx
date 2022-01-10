import React from 'react';

import classnames from 'classnames/bind';

import { Character } from '../model';

import {
  Button, Card, CardActions,
} from '../../../shared';

import CharacterCardInfo from './character-card-info';
import CharacterCardInfoEditForm from './character-card-info-form-edit';
import CharacterCardInfoFormSell from './character-card-info-form-sell';

import CharacterCardOwnHeader from './character-card-own-header';

type CardMode = 'default' | 'edit' | 'sell';

const useEditForm = (initialName: string, initialDescription: string) => {
  const [name, setName] = React.useState(initialName);
  const [description, setDescription] = React.useState(initialDescription);

  const onNameChanged = (value: string) => {
    setName(value);
  };

  const onDescriptionChanged = (value: string) => {
    setDescription(value);
  };

  const isDirty = name !== initialName || description !== initialDescription;
  const isValid = !!name && !!description;

  return ({
    saveDisabled: !(isDirty && isValid),

    name,
    description,
    onNameChanged,
    onDescriptionChanged,
  });
};

const useSellForm = () => {
  const [price, setPrice] = React.useState<number | undefined>();

  const onPriceChanged = (value: number) => {
    setPrice(value);
  };

  const isValid = !!price;

  return ({
    isValid,
    saveDisabled: !isValid,
    price,
    onPriceChanged,
  });
};

type Props = {
  className?: string;

  upgrading?: boolean;
  onLegendaryLevelUpgradeClick: (cryptoFaceIndex: number) => void;
  onLevelUpgradeClick: (cryptoFaceIndex: number) => void;

  onInfoSaveClick: (cryptoFaceIndex: number, name: string, description: string) => Promise<unknown>;
  onSellClick: (cryptoFaceIndex: number, price: number) => Promise<unknown>;
} & Character;

const OwnCharacterCard: React.FC<Props> = ({
  className,

  name,
  cryptoFaceIndex,
  legendaryHypeLevel,
  hypeLevel,
  hypeValue,
  description,
  upgrading,
  onLegendaryLevelUpgradeClick,
  onLevelUpgradeClick,
  onInfoSaveClick,
  onSellClick,
}) => {
  const [mode, changeMode] = React.useState<CardMode>('default');

  const onSettingsToggleClick = () => changeMode((prev) => (prev === 'edit' ? 'default' : 'edit'));

  const onSellToggleClick = () => changeMode((prev) => (prev === 'sell' ? 'default' : 'sell'));

  const resetCardMode = () => changeMode('default');

  const isEditMode = mode === 'edit';
  const isSellMode = mode === 'sell';

  const {
    name: nameState,
    description: descriptionState,
    saveDisabled: editSaveDisabled,
    onNameChanged,
    onDescriptionChanged,
  } = useEditForm(name, description);

  const { price, saveDisabled: sellButtonDisabled, onPriceChanged } = useSellForm();

  const onLegendaryLevelUpgradeClickHandler = () => onLegendaryLevelUpgradeClick(cryptoFaceIndex);
  const onLevelUpgradeClickHandler = () => onLevelUpgradeClick(cryptoFaceIndex);

  const onSaveInfoClick = () => {
    if (editSaveDisabled) return;

    onInfoSaveClick(cryptoFaceIndex, nameState, descriptionState).finally(resetCardMode);
  };

  const onConfirmSellClick = () => {
    if (sellButtonDisabled || !price) return;

    onSellClick(cryptoFaceIndex, price).finally(resetCardMode);
  };

  return (
    <Card
      className={classnames('character-card', className)}
      actions={(
        <CardActions>
          {
            isEditMode && (
              <>
                <Button
                  variant="outlined"
                  onClick={onSettingsToggleClick}
                >
                  Cancel
                </Button>

                <Button
                  disabled={editSaveDisabled}
                  onClick={onSaveInfoClick}
                >
                  Save
                </Button>
              </>
            )
          }

          {
            isSellMode && (
              <>
                <Button
                  variant="outlined"
                  onClick={onSellToggleClick}
                >
                  Cancel
                </Button>

                <Button
                  disabled={sellButtonDisabled}
                  onClick={onConfirmSellClick}
                >
                  Sell
                </Button>
              </>
            )
          }

          {
            !isEditMode && !isSellMode && (
              <Button onClick={onSellToggleClick}>
                Sell
              </Button>
            )
          }
        </CardActions>
      )}
      header={(
        <CharacterCardOwnHeader
          isEditMode={isEditMode}
          onSettingsClick={onSettingsToggleClick}
          levelUpDisabled={upgrading || hypeLevel === 300}
          legendaryLevelUpDisabled={hypeLevel !== 300}
          onLevelUpClick={onLevelUpgradeClickHandler}
          onLegendaryLevelUpClick={onLegendaryLevelUpgradeClickHandler}
        />
      )}
    >

      {
        !isEditMode && !isSellMode && (
          <CharacterCardInfo
            name={name}
            legendaryHypeLevel={legendaryHypeLevel}
            hypeLevel={hypeLevel}
            hypeValue={hypeValue}
            description={description}
          />
        )
      }

      {
        isEditMode && (
          <CharacterCardInfoEditForm
            name={nameState}
            description={descriptionState}
            onNameChange={onNameChanged}
            onDescriptionChange={onDescriptionChanged}
          />
        )
      }

      {
        isSellMode && (
          <CharacterCardInfoFormSell
            value={price}
            onPriceChange={onPriceChanged}
          />
        )
      }
    </Card>
  );
};
export default OwnCharacterCard;
