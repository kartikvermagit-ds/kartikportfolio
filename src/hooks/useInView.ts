import { useState, useEffect, useRef } from 'react';

export function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  const rootMargin = options?.rootMargin ?? '150px 0px';
  const threshold = options?.threshold ?? 0.01;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Use IntersectionObserver to track if element is near viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        rootMargin,
        threshold,
        root: options?.root ?? null
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin, threshold, options?.root]);

  return { ref, isInView };
}
