import { useCallback, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import { roundBinary } from '../pager/utils';
import { useGetValidImageNumber } from '../pager/hooks';
import { PagerImage } from './PagerImage';
import { GoNextButton } from '../reader/GoNextButton';
import { PagerProps } from '../reader/types';

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

export const DefaultPager = ({ manga, chapter, nextChapterLink }: PagerProps) => {
  /**
   * Default pager component. Pages are changed by swiping Left/Right
   */
  const [currentImage, setCurrentImage] = useState(0);
  const validImageNumber = useGetValidImageNumber(chapter.images);

  const onChangeIndex = useCallback(
    (newIndex, prevIndex) => {
      if (Math.abs(prevIndex - newIndex) === chapter.images.length - 1) return;
      const diff = roundBinary(newIndex - prevIndex);
      const newNumber = validImageNumber(currentImage + diff);

      if (newNumber !== undefined) {
        setCurrentImage(newNumber);
        window.scroll({ top: 0 });
      }
    },
    [validImageNumber, chapter.images, currentImage, setCurrentImage]
  );

  return (
    <div>
      <BindKeyboardSwipeableViews hysteresis={0.5} threshold={20} index={currentImage} onChangeIndex={onChangeIndex}>
        {chapter.images.map((image, index) => {
          return <PagerImage key={image} image={image} current={index === currentImage} />;
        })}
      </BindKeyboardSwipeableViews>
      {currentImage === chapter.images.length - 1 ? (
        nextChapterLink ? (
          <GoNextButton nextUrl={nextChapterLink} />
        ) : (
          <GoNextButton nextUrl={`/detail/${manga.id}`} exit />
        )
      ) : null}
    </div>
  );
};
