import React, { forwardRef, Ref } from 'react';
import { Chip, ChipProps, createStyles, makeStyles, Theme, useMediaQuery, useTheme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      cursor: 'pointer',
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
      fontSize: 'large',
      borderRadius: 5,
    },
  })
);

type SoraChipProps = ChipProps<any, {component: any}>

export const SoraChip = forwardRef<any, SoraChipProps>((props: SoraChipProps, ref: Ref<any>) => {
  const classes = { ...useStyles(), ...props.classes };

  const theme = useTheme();
  const smallMedia = useMediaQuery(theme.breakpoints.down('sm'));

  return <Chip size={smallMedia ? 'small' : 'medium'} className={classes.root} ref={ref} {...props} />;
});
