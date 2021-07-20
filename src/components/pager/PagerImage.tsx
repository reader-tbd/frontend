import { forwardRef, Ref, useEffect, useMemo, useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import { CenteredProgress } from '../CenteredProgress';

const useStyles = makeStyles(() =>
  createStyles({
    chapterImage: {
      pointerEvents: 'none',
      height: 'auto',
      width: '100%',
    },
  })
);

export type ReaderImageProps = {
  image: string;
  current: boolean;
  persist?: boolean;
};

export const PagerImage = forwardRef(({ image, current, persist }: ReaderImageProps, ref: Ref<any>) => {
  /**
   * Component for image rendering. Will show circular progress until the image is loaded. Loading starts lazily
   * @param image Image link
   * @param current Boolean to detect if the image is currently shown to client (used to start loading)
   * @param persist Whether to not hide the image if it's not current. Persist for webtoon and hide for default pager to
   * prevent spoilers if you scroll down and then swipe next chapter
   */
  const classes = useStyles();
  const [visited, setVisited] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const shouldRender = useMemo(() => {
    if (!persist) return;
    return loaded;
  }, [persist, loaded]);

  useEffect(() => {
    if (current && !visited) {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        setLoaded(true);
      };
      setVisited(true);
    }
  }, [image, visited, current]);

  return (
    <div ref={ref}>
      {shouldRender ? <Avatar variant="square" className={classes.chapterImage} src={image} /> : <CenteredProgress />}
    </div>
  );
});
