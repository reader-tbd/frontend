import { useCallback } from 'react';
import { createStyles, ListItem, ListItemAvatar, makeStyles, Theme } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { MangaListItemDesc } from './MangaListItemDesc';
import { MangaImage } from '../MangaImage';
import { setCurrentManga } from '../../../redux/manga/actions';
import { Manga } from '../../../utils/apiTypes';
import { memo } from 'react';

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

export const MangaListItem = memo((manga: Manga) => {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();

  const passManga = useCallback(() => {
    dispatch(setCurrentManga(manga));
    router.push(`/detail/${manga.id}`);
  }, [router, dispatch, manga]);

  return (
    <ListItem button onClick={passManga} key={manga.id} alignItems="flex-start" className={classes.root}>
      <ListItemAvatar className={classes.avatarWrapper}>
        <MangaImage src={manga.thumbnail} className={classes.avatar} />
      </ListItemAvatar>
      <MangaListItemDesc {...manga} />
    </ListItem>
  );
});
