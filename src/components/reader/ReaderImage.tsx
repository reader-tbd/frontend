import { useEffect, useMemo, useState } from 'react';
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

type Props = {
  image: string;
  current: boolean;
};

export const ReaderImage = ({ image, current }: Props) => {
  const classes = useStyles();
  const [visited, setVisited] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const shouldRender = useMemo(() => {
    return current && visited && loaded;
  }, [visited, loaded, current]);

  useEffect(() => {
    if (current && !visited) {
      console.log('Start loading');
      const img = new Image();
      img.src = image;
      img.onload = () => {
        setLoaded(true);
      };
      setVisited(true);
    }
  }, [current]);

  return shouldRender ? <Avatar variant="square" className={classes.chapterImage} src={image} /> : <CenteredProgress />;
};
