import { MutableRefObject, useEffect, useLayoutEffect, useState } from 'react';

export const useScrolledBottom = () => {
  const [scrolledBottom, setScrolledBottom] = useState(false);

  useEffect(() => {
    document.onscroll = () => {
      setScrolledBottom(window.window.scrollY + window.window.outerHeight >= document.body.offsetHeight);
    };
  });

  return scrolledBottom;
};

/**
 * Hook to determine element visibility
 */
export const useVisible = (rootElRef: MutableRefObject<any>) => {
  const [visible, setVisible] = useState(false);
  useLayoutEffect(() => {
    if (rootElRef && rootElRef.current) {
      const ob = new IntersectionObserver(
        ([entry]) => {
          setVisible(entry.isIntersecting);
        },
        {
          rootMargin: undefined,
        }
      );
      ob.observe(rootElRef.current);
      return () => {
        ob.unobserve(rootElRef.current);
      };
    }
  }, [rootElRef.current]);
  return visible;
};
