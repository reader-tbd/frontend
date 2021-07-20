import { WebtoonImage } from './WebtoonImage';
import { useScrolledBottom } from '../../utils/hooks';
import { GoNextButton } from '../reader/GoNextButton';
import { PagerProps } from '../reader/types';

export const WebtoonPager = ({ manga, chapter, nextChapterLink }: PagerProps) => {
  /**
   * Webtoon pager. Append every other image to the bottom to form complete canvas
   */
  const scrolledBottom = useScrolledBottom();

  return (
    <div>
      {chapter.images.map((image) => {
        return <WebtoonImage key={image} image={image} />;
      })}
      {scrolledBottom ? (
        nextChapterLink ? (
          <GoNextButton nextUrl={nextChapterLink} />
        ) : (
          <GoNextButton nextUrl={`/detail/${manga.id}`} exit />
        )
      ) : null}
    </div>
  );
};
