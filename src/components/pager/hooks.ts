import { useCallback, useEffect, useMemo } from 'react';
import { Manga, MangaChapter, MangaChapterImages } from '../../utils/apiTypes';
import { VH } from '../../utils/css';

export const useNextChapterLink = (manga: Manga, chapter?: MangaChapter) =>
  useMemo(() => {
    if (!manga.chapters || !chapter) return;
    const nextChapter = manga.chapters.find((chapterElement) => {
      return chapterElement.volume === chapter.volume && chapterElement.number === chapter.number + 1;
    });
    if (nextChapter) {
      return `/read/${manga.id}/${chapter.volume}/${chapter.number + 1}`;
    }
  }, [manga, chapter]);

export const useGetValidImageNumber = (images?: MangaChapterImages) =>
  useCallback((value: number) => (0 <= value && value < (images?.length || -1) ? value : undefined), [images]);

export const useUserScalable = () =>
  useEffect(() => {
    const viewport = document.getElementById('viewport');
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1, user-scalable=1');
    }

    return () => {
      if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1, user-scalable=0');
      }
    };
  }, []);

const scrollVh = (direction: 'up' | 'down' = 'down') => {
  // Scroll 80% of viewport height
  window.scroll({
    top: window.scrollY + VH() * 0.8 * (direction === 'up' ? -1 : 1),
    behavior: 'smooth',
  });
};

export const useKeyboardScroll = (images?: MangaChapterImages) => {
  const scrollKBHandler = getScrollKBHandler(images);
  useEffect(() => {
    document.removeEventListener('keydown', scrollKBHandler);
    document.addEventListener('keydown', scrollKBHandler);
    return () => {
      document.removeEventListener('keydown', scrollKBHandler);
    };
  }, [images]);
};

export const getScrollKBHandler = (images?: MangaChapterImages) => {
  return useCallback(
    function (e: KeyboardEvent): any {
      if (!['ArrowDown', 'ArrowUp'].includes(e.key) || e.repeat || !images) return;
      e.preventDefault();
      switch (e.key) {
        case 'ArrowDown':
          scrollVh('down');
          break;
        case 'ArrowUp':
          scrollVh('up');
          break;
      }
    },
    [images]
  );
};
