import React, { useCallback, useEffect, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import ForwardIcon from '@material-ui/icons/Forward';
import ExitIcon from '@material-ui/icons/ExitToApp';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { TDispatch } from '../../redux/types';
import { getNextChapter } from '../pager/hooks';
import { fetchChapterImages, setCurrentChapter } from '../../redux/manga/actions';

const useStyles = makeStyles((theme) => ({
  goNext: {
    color: theme.palette.text.primary,
    position: 'absolute',
    bottom: theme.spacing(1),
    right: theme.spacing(1),
  },
}));

type Props = {
  nextUrl: string | number;
  exit?: boolean;
};

export const GoNextButton = ({ nextUrl, exit }: Props) => {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch() as TDispatch;
  const { current: manga, chapter } = useSelector((state: RootState) => state.manga);
  const nextChapter = useMemo(() => getNextChapter(manga, chapter), [manga, chapter]);

  useEffect(() => {
    router.prefetch(String(nextUrl));
  }, [router, nextUrl]);

  const goNext = useCallback(() => {
    if (nextUrl && nextChapter) {
      router.replace(String(nextUrl)).then(() => {
        dispatch(setCurrentChapter(nextChapter));
        dispatch(fetchChapterImages(nextChapter.id));
      });
    }
  }, [nextUrl, nextChapter, router, dispatch]);

  return (
    <Fab className={classes.goNext} aria-label="goNext" variant="round" color="primary" onClick={goNext}>
      {!exit ? <ForwardIcon /> : <ExitIcon />}
    </Fab>
  );
};
