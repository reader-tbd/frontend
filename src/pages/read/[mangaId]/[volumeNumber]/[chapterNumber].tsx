import { GetServerSideProps } from 'next';
import { Reader } from '../../../../components/reader/Reader';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState } from '../../../../redux/store';
import { TDispatch } from '../../../../redux/types';
import { fetchAll, fetchChapterImages } from '../../../../redux/manga/actions';
import { CenteredProgress } from '../../../../components/CenteredProgress';
import { ReaderMode } from '../../../../components/reader/types';
import { CurrentChapter, CurrentChapterImages } from '../../../../redux/manga/reducer';
import Slide from '@material-ui/core/Slide';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { AppBar, createStyles, IconButton, makeStyles, Theme, Toolbar, Typography } from '@material-ui/core';

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      mangaId: Number(context.query.mangaId),
      volumeNumber: Number(context.query.volumeNumber),
      chapterNumber: Number(context.query.chapterNumber),
    },
  };
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      // TODO: DRY (src/components/Header.tsx 10:6)
      backgroundColor: theme.palette.type === 'dark' ? theme.palette.grey['800'] : theme.palette.primary.main,
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(0.5, 1),
      },
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1, 1),
      },
    },
  })
);

type Props = {
  mangaId: number;
  volumeNumber: number;
  chapterNumber: number;
};

export default function Read({ mangaId, volumeNumber, chapterNumber }: Props) {
  const classes = useStyles();
  const router = useRouter();
  const { current: manga, chapter } = useSelector((state: RootState) => state.manga);
  const [mode, setMode] = useState(undefined as ReaderMode | undefined);
  const [showHeader, setShowHeader] = useState(false);
  const dispatch = useDispatch() as TDispatch;

  useEffect(() => {
    router.prefetch(`/detail/${manga.id}/?tab=1`);
    if (!(mangaId && volumeNumber && chapterNumber)) {
      router.push('/search');
    } else if (!manga || !chapter) {
      dispatch(fetchAll({ mangaId, volumeNumber, chapterNumber }));
    } else if (chapter && !chapter?.images) {
      dispatch(fetchChapterImages(chapter.id));
    }
  }, []);

  useEffect(() => {
    if (chapter?.images?.length) {
      const img = new Image();
      img.src = chapter.images[0];
      img.onload = () => {
        const ratio = img.naturalHeight / img.naturalWidth;
        if (ratio > 2) {
          setMode('webtoon');
        } else {
          setMode('default');
        }
      };
    }
  }, [chapter?.images]);

  // Current chapter.number may differ from chapterNumber in case of replacing route
  return manga && chapter && chapter.number === chapterNumber && chapter.images !== undefined ? (
    <>
      <Slide appear={false} direction="down" in={!showHeader}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton onClick={() => router.push(`/detail/${manga.id}/?tab=1`)}>
              <ArrowBackIcon />
            </IconButton>
            <Typography color="textPrimary">{chapter.title}</Typography>
          </Toolbar>
        </AppBar>
      </Slide>
      <Reader
        onClick={() => setShowHeader(!showHeader)}
        manga={manga}
        chapter={chapter as CurrentChapter & Required<CurrentChapterImages>}
        mode={mode}
      />
    </>
  ) : (
    <CenteredProgress />
  );
}
