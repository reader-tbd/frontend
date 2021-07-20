import { useRef } from 'react';
import { PagerImage, ReaderImageProps } from './PagerImage';
import { useVisible } from '../../utils/hooks';

type Props = Omit<ReaderImageProps, 'current' | 'persist'>;

export const WebtoonImage = ({ image, ...props }: Props) => {
  const ref = useRef();
  const current = useVisible(ref);

  return <PagerImage image={image} current={current} persist {...props} ref={ref} />;
};
