import React from 'react';
import { useCallback } from 'react';
import { createStyles, ListItem, ListItemAvatar, makeStyles, Theme } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { MangaListItemDesc } from './MangaListItemDesc';
import { MangaImage } from '../MangaImage';
import { setMangaPreview } from '../../../redux/manga/actions';
import { Manga } from '../../../api/types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
      minHeight: '8rem',
    },
    avatarWrapper: {
      height: '100%',
      width: '15%',
      margin: 0,
    },
    avatar: {
      height: '100%',
      width: '100%',
    },
  })
);

type Props = {
  data: Manga;
};

export function MangaListItem(props: Props) {
  const classes = useStyles();
  const router = useRouter();
  const { data } = props;
  const dispatch = useDispatch();

  const passManga = useCallback(() => {
    dispatch(setMangaPreview(data));
    router.push(`/detail/${data.id}`);
  }, [router, data, setMangaPreview]);

  return (
    <ListItem button onClick={passManga} key={data.id} alignItems="flex-start" className={classes.root}>
      <ListItemAvatar className={classes.avatarWrapper}>
        <MangaImage src={data.thumbnail} className={classes.avatar} />
      </ListItemAvatar>
      <MangaListItemDesc {...data} />
    </ListItem>
  );
}
