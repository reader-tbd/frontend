import { useCallback, useEffect } from 'react';
import { MangaChapterImages } from '../apiTypes';
import { VH } from '../css';

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
