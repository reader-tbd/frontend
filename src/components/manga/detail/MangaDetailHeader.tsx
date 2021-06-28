import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { MangaImage } from '../MangaImage';
import { SoraChip } from '../../SoraChip';
import { Manga } from '../../../api/types';
import { MangaRating } from '../MangaRating';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexFlow: 'row wrap',
      padding: theme.spacing(1),
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2),
      },
    },
    avatar: {
      [theme.breakpoints.down('sm')]: {
        width: '50%',
        height: '100%',
        marginBottom: theme.spacing(2),
      },
      [theme.breakpoints.up('sm')]: {
        height: '100%',
        width: '20%',
        marginRight: theme.spacing(2),
      },
    },
    details: {
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
      [theme.breakpoints.up('sm')]: {
        width: '75%',
      },
    },
    title: {
      marginTop: 0,
      '& span': {
        fontSize: 'xx-large',
        lineHeight: '2rem',
      },
    },
    author: {
      fontSize: 'large',
      marginBottom: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
    genres: {
      display: 'flex',
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
      listStyle: 'none',
      padding: theme.spacing(0.5),
      margin: 0,
    },
    ratingContainer: {
      display: 'flex',
      flexFlow: 'row wrap',
      marginBottom: theme.spacing(1),
      '& > span': {
        alignItems: 'center',
        marginRight: theme.spacing(1),
      },
      '& p': {
        display: 'flex',
        alignItems: 'center',
        margin: 0,
        color: theme.palette.text.secondary,
      },
    },
  })
);

type Props = Manga;

export function MangaDetailHeader(props: Props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MangaImage src={props.image} variant="rounded" className={classes.avatar} />
      <div className={classes.details}>
        <h1 className={classes.title}>{props.title}</h1>
        <p className={classes.author}>{props.authors?.join(', ')}</p>
        <ul className={classes.genres}>
          {props.genres?.map((genre) => (
            <SoraChip component="li" label={genre} key={genre} />
          ))}
        </ul>
        <SoraChip component="a" target="_blank" href={props.source_url} label={props.source} clickable />
        <div className={classes.ratingContainer}>
          <MangaRating value={props.rating} />
          <p>
            {props.rating}
            /10
          </p>
        </div>
      </div>
    </div>
  );
}
