import { GetServerSideProps } from 'next';
import { Reader } from '../../../../components/reader/Reader';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState } from '../../../../redux/store';
import { TDispatch } from '../../../../redux/types';
import { fetchAll } from '../../../../components/reader/utils';
import { fetchChapterImages } from '../../../../redux/manga/actions';
import { CenteredProgress } from '../../../../components/CenteredProgress';
import { ReaderMode } from '../../../../components/reader/types';

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      mangaId: Number(context.query.mangaId),
      volumeNumber: Number(context.query.volumeNumber),
      chapterNumber: Number(context.query.chapterNumber),
    },
  };
};

type Props = {
  mangaId: number;
  volumeNumber: number;
  chapterNumber: number;
};

export default function Read({ mangaId, volumeNumber, chapterNumber }: Props) {
  const router = useRouter();
  const manga = useSelector((state: RootState) => state.manga.currentManga);
  const chapter = useSelector((state: RootState) => state.manga.currentChapter);
  const [mode, setMode] = useState(undefined as ReaderMode | undefined);
  const dispatch = useDispatch() as TDispatch;

  useEffect(() => {
    if (!(mangaId && volumeNumber && chapterNumber)) {
      router.push('/search');
    } else if (!chapter) {
      fetchAll(dispatch, mangaId, volumeNumber, chapterNumber);
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

  // TODO: Add possibly AppBar
  return manga && chapter && mode ? <Reader manga={manga} chapter={chapter} /> : <CenteredProgress />;
}
