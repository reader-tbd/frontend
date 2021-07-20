import { useEffect, useState } from 'react';
import { Box, createStyles, Divider, makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { MangaDetailHeader } from '../../components/manga/detail/MangaDetailHeader';
import { MangaDetailDescription } from '../../components/manga/detail/MangaDetailDescription';
import { RootState } from '../../redux/store';
import { SwipeableTabs } from '../../components/SwipeableTabs';
import { fetchMangaChapters, fetchMangaDetail, pushViewedManga } from '../../redux/manga/actions';
import { Manga } from '../../utils/apiTypes';
import { unwrapResult } from '@reduxjs/toolkit';
import { TDispatch } from '../../redux/types';
import { GetServerSideProps } from 'next';
import { ChapterList } from '../../components/manga/detail/ChapterList';

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  })
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: { mangaId: Number(context.params?.id) },
  };
};
type Props = {
  mangaId: Number;
};

const fetchRetry = (
  shouldRetry: (data: any) => boolean,
  dispatchCall: () => Promise<any>,
  onSuccess?: (data: any) => any,
  maxRetries: number = 2,
  timeout: number = 2000
) => {
  /**
   * A function to retry calls if data is outdated
   * @param shouldRetry how to check if should retry
   * @param onSuccess a callback to run when data was fetched
   */
  let retryCounter = maxRetries;

  const retryIfNeeded = (data?: any) => {
    if (!data || (shouldRetry(data) && retryCounter)) {
      setTimeout(() => {
        retryCounter -= 1;
        dispatchCall().then(retryIfNeeded);
      }, timeout);
      return;
    }
    if (data && onSuccess) onSuccess(data);
  };
  dispatchCall().then(retryIfNeeded);
};

export default function Detail({ mangaId }: Props) {
  const classes = useStyles();
  const router = useRouter();
  const [chaptersLoaded, setChaptersLoaded] = useState(false);
  const manga: Manga = useSelector((state: RootState) => state.manga.current);
  const dispatch = useDispatch() as TDispatch;

  useEffect(() => {
    if (!mangaId) {
      router.push('/search');
    } else {
      if (~manga.id) {
        dispatch(pushViewedManga(manga));
      }

      fetchRetry(
        (data) => Boolean(~data.id) || !data.detailDataFresh,
        () => dispatch(fetchMangaDetail(mangaId)).then(unwrapResult),
        (data) => dispatch(pushViewedManga(data))
      );

      dispatch(fetchMangaChapters(mangaId))
        .then(unwrapResult)
        .then(() => setChaptersLoaded(true))
        .catch(() => {
          console.log('Chapters are not yet loaded, scheduled a timeout');
          setTimeout(() => {
            dispatch(fetchMangaChapters(mangaId)).then(() => setChaptersLoaded(true));
          }, 2000);
        });
    }
  }, [dispatch, manga, mangaId, router]);

  return (
    <div className={classes.root}>
      <SwipeableTabs
        panels={[
          [
            'Описание',
            <Box key={1} p={2}>
              <MangaDetailHeader {...manga} />
              <Divider />
              <MangaDetailDescription text={String(manga.description)} />
            </Box>,
          ],
          [
            'Главы',
            <Box key={2} p={2}>
              {chaptersLoaded ? <ChapterList mangaId={manga.id} chapters={manga.chapters} /> : 'Главы загружаются'}
            </Box>,
          ],
        ]}
      />
    </div>
  );
}
