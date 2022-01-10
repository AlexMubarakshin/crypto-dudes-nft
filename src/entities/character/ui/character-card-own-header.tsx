import React from 'react';
import classnames from 'classnames/bind';
import { Button, CardMedia, Icons } from '../../../shared';

import style from './character-card-own-header.module.css';

const cx = classnames.bind(style);

type Props = {
  isEditMode?: boolean;

  levelUpDisabled?: boolean;
  legendaryLevelUpDisabled?: boolean;

  onLevelUpClick?: () => void;
  onLegendaryLevelUpClick?: () => void;

  onSettingsClick?: () => void;
};

const CharacterCardOwnHeader: React.FC<Props> = ({
  isEditMode,
  levelUpDisabled,
  legendaryLevelUpDisabled,
  onSettingsClick,
  onLevelUpClick,
  onLegendaryLevelUpClick,
}) => (
  <>
    <CardMedia />
    {
      !isEditMode && (
        <div className={cx('character-card-actions')}>
          {
            !levelUpDisabled && (
              <Button
                variant="icon"
                className={cx('level-up', 'upgrade-icon')}
                title="Level up"
                onClick={onLevelUpClick}
              >
                <Icons.UpgradeIcon fill="#FFFFFF" />
              </Button>
            )
          }

          {
            !legendaryLevelUpDisabled && (
              <Button
                variant="icon"
                className={cx('legendary-level-up', 'upgrade-icon')}
                title="Legendary level up"
                disabled={legendaryLevelUpDisabled}
                onClick={onLegendaryLevelUpClick}
              >
                <Icons.UpgradeIcon fill="#FFFFFF" />
              </Button>
            )
          }

          <Button
            variant="icon"
            className={cx('settings')}
            title="Edit info"
            onClick={onSettingsClick}
          >
            <Icons.EditIcon />
          </Button>
        </div>
      )
    }
  </>
);

export default CharacterCardOwnHeader;
