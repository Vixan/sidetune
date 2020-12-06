import React, { FC } from "react";
import { Link } from "react-router-dom";
import { TopAlbumsSection } from "../components/TopAlbumsSection";

export const Home: FC<{}> = () => {
  return (
    <>
      {/* <Link to="/play">Open player</Link> */}

      <TopAlbumsSection />
    </>
  );
};
