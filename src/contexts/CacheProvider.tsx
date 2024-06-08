import { createContext, useContext, useState, PropsWithChildren } from "react";

export interface CacheEntry {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  timestamp: number;
}

interface CacheContextProps {
  cacheData: Record<string, CacheEntry>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getCache: <T>(url: string) => T | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setCache: <T>(url: string, data: T) => void;
}

const CacheContext = createContext<CacheContextProps | undefined>(undefined);

export const CacheProvider = ({ children }: PropsWithChildren) => {
  const [cacheData, setCacheData] = useState<Record<string, CacheEntry>>({});

  const getCache = (url: string) => {
    return cacheData[url] ? cacheData[url].data : null;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setCache = (url: string, data: any) => {
    const newCacheData: CacheEntry = { data, timestamp: Date.now() };
    setCacheData((prev) => ({ ...prev, [url]: newCacheData }));
  };

  return (
    <CacheContext.Provider value={{ cacheData, getCache, setCache }}>
      {children}
    </CacheContext.Provider>
  );
};

export const useCache = () => {
  const context = useContext(CacheContext);
  if (!context) {
    throw new Error("useCache must be used within a CacheProvider");
  }
  return context;
};
