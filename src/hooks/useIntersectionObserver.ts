import { useEffect, useRef, useState } from "react";

/** Observe whether an element is intersecting the viewport (for infinite scroll / lazy loading). */
export function useIntersectionObserver<T extends Element>(
  options: IntersectionObserverInit = { rootMargin: "200px" },
) {
  const ref = useRef<T | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.rootMargin, options.threshold]);

  return { ref, isIntersecting };
}
