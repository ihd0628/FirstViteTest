import { useState, useEffect, useCallback } from "react";
import { useCache } from "../contexts/CacheProvider";

interface Props {
  url: string;
  options?: RequestInit;
  refresh?: boolean;
  noCache?: boolean;
}

const useFetchWithCache = <T>({
  url,
  options,
  refresh = false,
  noCache = false,
}: Props) => {
  const { getCache, setCache, cacheData } = useCache();
  const [data, setData] = useState<T | null>(getCache<T>(url));
  const [loading, setLoading] = useState<boolean>(!getCache<T>(url));
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result: T = await response.json();
      if (!noCache) setCache(url, result);
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [url, options, setCache]);

  useEffect(() => {
    if (!getCache<T>(url) || refresh || noCache) {
      fetchData();
    } else {
      setData(getCache<T>(url));
    }
  }, [url, options, refresh, fetchData, getCache]);

  useEffect(() => {
    if (!noCache) {
      {
        setData(getCache<T>(url));
      }
    }
  }, [cacheData, url, getCache]);

  return { data, loading, error, refresh: fetchData };
};

export default useFetchWithCache;
