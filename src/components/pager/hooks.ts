import { useCallback, useEffect, useMemo } from 'react';
import { Manga, MangaChapter, MangaChapterImages } from '../../utils/apiTypes';
import { getKeyboardScrollHandler } from './utils';

/**
 * Use keyUp/Down listener which scrolls image up/down
 */
export const useKeyboardScroll = (images?: MangaChapterImages) => {
  const scrollKBHandler = getKeyboardScrollHandler(images);
  useEffect(() => {
    // bindKeyboard is messing stuff up
    document.removeEventListener('keydown', scrollKBHandler);
    document.addEventListener('keydown', scrollKBHandler);
    return () => {
      document.removeEventListener('keydown', scrollKBHandler);
    };
  });
};

/**
 * Get memoized chapter which comes after the current. (All chapters are sorted by volume and number)
 * Either return the chapter with the same volume and chapter number higher
 * Or the first chapter with volume more than the current
 */
export const getNextChapter = (manga: Manga, chapter?: MangaChapter) => {
  if (!manga.chapters || !chapter) return;
  let nextChapter;
  const sameVolumeChapters = manga.chapters.filter(
    (chapterElement) => chapterElement.volume === chapter.volume && chapterElement.number > chapter.number
  );

  if (sameVolumeChapters.length) {
    nextChapter = sameVolumeChapters.sort((a, b) => a.number - b.number)[0];
  } else {
    const nextVolumeChapters = manga.chapters.filter((chapterElement) => chapterElement.volume > chapter.volume);
    if (nextVolumeChapters.length) {
      nextChapter = nextVolumeChapters.sort((a, b) => a.volume - b.volume || a.number - b.number)[0];
    }
  }

  return nextChapter;
};

/**
 * Return memoized value for next chapter link
 */
export const useNextChapterLink = (manga: Manga, chapter?: MangaChapter) =>
  useMemo(() => {
    const nextChapter = getNextChapter(manga, chapter);
    if (nextChapter) {
      return `/read/${manga.id}/${nextChapter.volume}/${nextChapter.number}`;
    }
  }, [manga, chapter]);

/**
 * Return memoized callback of function which detects if the value is a valid image number for given image list
 */
export const useGetValidImageNumber = (images?: MangaChapterImages) => {
  return useCallback((value: number) => (0 <= value && value < (images?.length || -1) ? value : undefined), [images]);
};
