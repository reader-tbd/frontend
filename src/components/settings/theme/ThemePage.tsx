import { createStyles, makeStyles, PaletteType, Theme } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setPalette, setThemeType } from '../../../redux/theme/actions';
import { RootState } from '../../../redux/store';
import { PaletteChanger } from './PaletteChanger';
import { defaultDark, defaultLight } from '../../../redux/theme/defaults';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';
import { ChangeThemeRadio } from './ChangeThemeRadio';
import { SettingPart } from '../SettingPart';
import { useCallback } from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    label: { color: `${theme.palette.text.primary} !important` },
    focusedLabel: { color: `${theme.palette.text.primary} !important` },
    radio: {
      '&$checked': {
        color: theme.palette.primary.main,
        '&:hover': {
          backgroundColor: 'transparent',
        },
      },
    },
    checked: {},
    chipContainer: {
      display: 'flex',
      flexFlow: 'row wrap',
      '& li': {
        borderRadius: '1rem',
        marginBottom: theme.spacing(1),
        marginRight: theme.spacing(1),
      },
    },
  })
);

export function ThemePage() {
  const statePalettes = useSelector((state: RootState) => state.theme.palettes);
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <div className={classes.root}>
      <SettingPart title="Сменить тему">
        <ChangeThemeRadio callback={(type: PaletteType) => dispatch(setThemeType(type))} />
      </SettingPart>

      <SettingPart title="Палитра темной темы">
        <PaletteChanger
          currentPalette={statePalettes.dark}
          resetPalette={useCallback(() => dispatch(setPalette('dark', defaultDark)), [dispatch])}
          submitPalette={useCallback((options: PaletteOptions) => dispatch(setPalette('dark', options)), [dispatch])}
        />
      </SettingPart>

      <SettingPart title="Палитра светлой темы" noDivier>
        <PaletteChanger
          currentPalette={statePalettes.light}
          resetPalette={useCallback(() => dispatch(setPalette('light', defaultLight)), [dispatch])}
          submitPalette={useCallback((options: PaletteOptions) => dispatch(setPalette('light', options)), [dispatch])}
        />
      </SettingPart>
    </div>
  );
}
