import { useCallback, useRef } from "react";

interface UseInfiniteScrollProps {
  loading: boolean;
  hasMore: boolean;
  setPage: any;
}

const useInfiniteScroll = ({
  loading,
  hasMore,
  setPage,
}: UseInfiniteScrollProps) => {
  const observer = useRef<IntersectionObserver>();

  const lastElementRef = useCallback(
    (node: any) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage: any) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );
  return lastElementRef;
};

export default useInfiniteScroll;
