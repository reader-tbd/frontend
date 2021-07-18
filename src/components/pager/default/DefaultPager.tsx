import { useCallback, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
import { roundBinary } from '../../reader/utils';
import { useGetValidImageNumber, useNextChapterLink } from '../../pager/hooks';
import { ReaderImage } from '../../reader/ReaderImage';
import { Manga } from '../../../utils/apiTypes';
import { CurrentChapter } from '../../../redux/manga/reducer';
import { createStyles, makeStyles, Theme } from '@material-ui/core';

type Props = {
  manga: Manga;
  chapter: CurrentChapter;
};

const useStyles = makeStyles<Theme>((theme: Theme) => createStyles({}));

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

export const DefaultPager = ({ manga, chapter }: Props) => {
  const classes = useStyles();
  const [currentImage, setCurrentImage] = useState(0);
  const validImageNumber = useGetValidImageNumber(chapter.images);

  const nextChapterLink = useNextChapterLink(manga, chapter);

  const onChangeIndex = useCallback(
    (newIndex, prevIndex) => {
      if (!chapter.images || Math.abs(prevIndex - newIndex) === chapter.images.length - 1) return;
      const diff = roundBinary(newIndex - prevIndex);
      const newNumber = validImageNumber(currentImage + diff);
      console.log(currentImage + diff);
      console.log(chapter.images.length, nextChapterLink);
      if (newNumber !== undefined) {
        setCurrentImage(newNumber);
        window.scroll({ top: 0 });
      }
    },
    [chapter.images, currentImage, setCurrentImage]
  );

  return (
    <div className={classes.root}>
      {chapter.images ? (
        <BindKeyboardSwipeableViews hysteresis={0.5} threshold={20} index={currentImage} onChangeIndex={onChangeIndex}>
          {chapter.images.map((image, index) => {
            return <ReaderImage key={image} image={image} current={index === currentImage} />;
          })}
        </BindKeyboardSwipeableViews>
      ) : (
        ''
      )}
    </div>
  );
};
