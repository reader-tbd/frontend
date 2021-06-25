import React, { forwardRef, Ref } from 'react';
import { createStyles, makeStyles } from '@material-ui/core';
import { Rating, RatingProps } from '@material-ui/lab';

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  })
);

export const MangaRating = forwardRef<any, RatingProps>((props: RatingProps, ref: Ref<any>) => {
  const classes = { ...useStyles(), ...props.classes };

  return <Rating readOnly precision={0.1} className={classes.root} ref={ref} {...props} />;
});
