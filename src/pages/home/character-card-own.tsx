import React from 'react';

import classnames from 'classnames/bind';

import {
  Button, Card, Character, Icons, CardAction, CardMedia,
} from '../../shared';

import CharacterCardInfo from './character-card-info';
import CharacterCardInfoEdit from './character-card-info-edit';

import style from './character-card-own.module.css';

const cx = classnames.bind(style);

const useEditForm = (initialName: string, initialDescription: string) => {
  const [name, setName] = React.useState(initialName);
  const [description, setDescription] = React.useState(initialDescription);

  const onNameChanged = (value: string) => {
    setName(value);
  };

  const onDescriptionChanged = (value: string) => {
    setDescription(value);
  };

  return ({
    isDirty: name !== initialName || description !== initialDescription,
    isValid: !!name && !!description,
    name,
    description,
    onNameChanged,
    onDescriptionChanged,
  });
};

type Props = {
  className?: string;

  upgrading?: boolean;
  onLegendaryLevelUpgradeClick: (cryptoFaceIndex: number) => void;
  onLevelUpgradeClick: (cryptoFaceIndex: number) => void;

  onInfoSaveClick: (cryptoFaceIndex: number, name: string, description: string) => void;
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
}) => {
  const [isEditMode, toggleEditMode] = React.useState(false);
  const onSettingsToggleClick = () => toggleEditMode((prev) => !prev);

  const {
    name: nameState,
    description: descriptionState,
    isDirty,
    isValid,
    onNameChanged,
    onDescriptionChanged,
  } = useEditForm(name, description);

  const saveDisabled = !(isDirty && isValid);

  const onLegendaryLevelUpgradeClickHandler = () => onLegendaryLevelUpgradeClick(cryptoFaceIndex);
  const onLevelUpgradeClickHandler = () => onLevelUpgradeClick(cryptoFaceIndex);

  const onSaveClick = () => {
    if (saveDisabled) return;

    onInfoSaveClick(cryptoFaceIndex, nameState, descriptionState);
  };

  return (
    <Card
      className={cx('character-card', className)}
      actions={(
        <>
          {
            isEditMode && (

              <CardAction>
                <Button
                  variant="outlined"
                  onClick={onSettingsToggleClick}
                >
                  Cancel
                </Button>

                <Button
                  disabled={saveDisabled}
                  onClick={onSaveClick}
                >
                  Save
                </Button>
              </CardAction>
            )
          }

          {
            !isEditMode && (
              <CardAction>
                <Button
                  disabled={hypeLevel !== 300}
                  onClick={onLegendaryLevelUpgradeClickHandler}
                >
                  Upgrade legendary level
                </Button>

                <Button
                  disabled={upgrading || hypeLevel === 300}
                  onClick={onLevelUpgradeClickHandler}
                >
                  Upgrade character
                </Button>
              </CardAction>
            )
          }
        </>
      )}
      header={(
        <>
          <CardMedia />
          {
            !isEditMode ? (
              <Button variant="text" className={cx('settings')} onClick={onSettingsToggleClick}>
                <Icons.EditIcon />
              </Button>
            ) : undefined
          }
        </>
      )}
    >
      {
        isEditMode && (
          <CharacterCardInfoEdit
            name={nameState}
            description={descriptionState}
            onNameChange={onNameChanged}
            onDescriptionChange={onDescriptionChanged}
          />
        )
      }
      {
        !isEditMode && (
          <CharacterCardInfo
            name={name}
            legendaryHypeLevel={legendaryHypeLevel}
            hypeLevel={hypeLevel}
            hypeValue={hypeValue}
            description={description}
          />
        )
      }
    </Card>
  );
};
export default OwnCharacterCard;
