import React, { FC } from "react";
import { QueryCache, ReactQueryCacheProvider } from "react-query";
import { TopAlbumsSection } from "../components/TopAlbumsSection";

const queryCache = new QueryCache({
  defaultConfig: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

export const Home: FC<{}> = () => {
  return (
    <>
      <ReactQueryCacheProvider queryCache={queryCache}>
        <TopAlbumsSection />
      </ReactQueryCacheProvider>
    </>
  );
};
