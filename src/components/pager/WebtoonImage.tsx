import { useRef } from 'react';
import { PagerImage, ReaderImageProps } from './PagerImage';
import { useVisible } from '../../utils/hooks';

type Props = Omit<ReaderImageProps, 'current'>;

export const WebtoonImage = ({ image }: Props) => {
  const ref = useRef();
  const current = useVisible(ref);

  return <PagerImage image={image} current={current} persist ref={ref} />;
};
