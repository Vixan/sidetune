import React, { FC } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./Home";
import { NowPlaying } from "./NowPlaying";
import { AudioProvider } from "../contexts/AudioContext";
import { AlbumPlaylist } from "./AlbumPlaylist";

export const App: FC<{}> = () => {
  return (
    <>
      <Router>
        <div className="flex flex-wrap content-center justify-center h-screen bg-gradient-to-r from-teal-400 to-blue-700">
          <div
            className="h-full p-6 overflow-hidden text-white bg-gray-800 shadow-2xl rounded-xl"
            style={{ width: 375, maxHeight: 650 }}>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/play">
                <AudioProvider>
                  <NowPlaying />
                </AudioProvider>
              </Route>
              <Route path="/album/:id">
                <AlbumPlaylist />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </>
  );
};
