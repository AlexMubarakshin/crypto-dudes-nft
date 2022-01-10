import React from 'react';
import { Input, TextArea } from '../../../shared';

type Props = {
  name: string;

  description: string;

  onNameChange: (name: string) => void;
  onDescriptionChange: (name: string) => void;
};

const CharacterCardInfoFormEdit: React.FC<Props> = ({
  name,

  description,

  onNameChange,
  onDescriptionChange,
}) => (
  <>
    <Input
      autoFocus
      value={name}
      onTextChange={onNameChange}
      type="text"
      placeholder="name"
    />

    <TextArea
      value={description}
      onTextChange={onDescriptionChange}
      placeholder="description"
      rows={8}
    />
  </>
);

export default CharacterCardInfoFormEdit;
