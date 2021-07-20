import { CurrentChapter, CurrentChapterImages } from '../../redux/manga/reducer';
import { Manga } from '../../utils/apiTypes';

export type PagerProps = {
  manga: Manga;
  chapter: CurrentChapter & Required<CurrentChapterImages>;
  nextChapterLink?: string;
};
export type ReaderMode = 'default' | 'webtoon';
