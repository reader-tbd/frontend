import React from 'react';
import {
  createStyles,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  makeStyles,
  Radio,
  RadioGroup,
  Theme,
  useTheme,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setPalette, setThemeType } from '../../redux/theme/actions';
import { RootState } from '../../redux/store';
import { PaletteChanger } from './PaletteChanger';
import { defaultDark, defaultLight } from '../../redux/theme/defaults';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';

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

// TODO: reset does not reset input colors

export function ChangeTheme() {
  const theme = useTheme();
  const themeState = useSelector((state: RootState) => state.theme);
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <div className={classes.root}>
      <FormControl component="fieldset">
        <FormLabel
          component="legend"
          classes={{
            root: classes.label,
            focused: classes.focusedLabel,
          }}
        >
          <h3>Тема</h3>
        </FormLabel>
        <RadioGroup name="theme" value={theme.palette.type}>
          <FormControlLabel
            value="dark"
            control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />}
            checked={theme.palette.type === 'dark'}
            onChange={() => dispatch(setThemeType('dark'))}
            label="Темная"
          />
          <FormControlLabel
            control={<Radio classes={{ root: classes.radio, checked: classes.checked }} />}
            checked={theme.palette.type === 'light'}
            onChange={() => dispatch(setThemeType('light'))}
            label="Светлая"
            value="light"
          />
        </RadioGroup>
      </FormControl>
      <Divider />
      <div>
        <h3>Палитра темной темы</h3>
        <PaletteChanger
          statePalette={themeState.darkPalette}
          defaultPalette={defaultDark}
          setStatePalette={(options: PaletteOptions) => setPalette(options, 'dark')}
        />
        <Divider style={{ width: '50%' }} />
      </div>
      <div>
        <h3>Палитра светлой темы</h3>
        <PaletteChanger
          statePalette={themeState.lightPalette}
          defaultPalette={defaultLight}
          setStatePalette={(options: PaletteOptions) => setPalette(options, 'light')}
        />
        <Divider style={{ width: '50%' }} />
      </div>
    </div>
  );
}