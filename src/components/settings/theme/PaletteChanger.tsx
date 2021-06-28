import React from 'react';
import { useEffect, useState } from 'react';
import { Color, ColorPicker } from 'material-ui-color';
import { Button, createStyles, makeStyles, Theme } from '@material-ui/core';
import createPalette, { PaletteOptions, SimplePaletteColorOptions } from '@material-ui/core/styles/createPalette';
import { SoraChip } from '../../SoraChip';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(1),
    },
    chipContainer: {
      display: 'flex',
      flexFlow: 'row wrap',
      '& li': {
        borderRadius: '1rem',
        marginBottom: theme.spacing(1),
        marginRight: theme.spacing(1),
      },
    },
    buttons: {
      padding: theme.spacing(1),
      '& button': {
        marginRight: theme.spacing(1),
      },
    },
  })
);

type ToneType = keyof SimplePaletteColorOptions;

type Props = {
  currentPalette: PaletteOptions;
  resetPalette: () => any;
  submitPalette: (palette: PaletteOptions) => any;
};

export function PaletteChanger({ currentPalette, resetPalette, submitPalette }: Props) {
  const classes = useStyles();

  const [paletteDraft, setPaletteDraft] = useState(createPalette(currentPalette));
  const [activeColor, setActiveColor] = useState('main' as ToneType);

  const updateDraft = (value: ToneType) => (color: Color | string) => {
    setPaletteDraft((prevState) => {
      const newState = { ...prevState };
      if (typeof color === 'string') newState.primary[value] = color;
      else newState.primary[value] = `#${color.hex}`;
      return newState;
    });
  };

  useEffect(() => {
    console.log('Resetting drafts as stored one did change');
    setPaletteDraft(createPalette(currentPalette));
  }, [currentPalette]);

  return (
    <div className={classes.root}>
      <p>Главный цвет, оттенки</p>
      <div className={classes.chipContainer}>
        <SoraChip
          onClick={() => setActiveColor('main')}
          style={{
            backgroundColor: paletteDraft.primary.main,
            color: paletteDraft.text.primary,
          }}
          label="основной"
        />
        <SoraChip
          onClick={() => setActiveColor('light')}
          style={{
            backgroundColor: paletteDraft.primary.light,
            color: paletteDraft.text.primary,
          }}
          label="светлый"
        />
        <SoraChip
          onClick={() => setActiveColor('dark')}
          style={{
            backgroundColor: paletteDraft.primary.dark,
            color: paletteDraft.text.primary,
          }}
          label="тёмный"
        />
      </div>
      <ColorPicker onChange={updateDraft(activeColor)} value={paletteDraft.primary[activeColor]} />
      <div className={classes.buttons}>
        <Button onClick={resetPalette}>Сбросить</Button>
        <Button onClick={() => submitPalette({ primary: paletteDraft.primary })}>Сохранить</Button>
      </div>
    </div>
  );
}
