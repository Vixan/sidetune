import React, { FC, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./Home";
import { NowPlaying } from "./NowPlaying";
import { AudioProvider } from "../contexts/AudioContext";

export const App: FC<{}> = () => {
  console.log("App render");

  return (
    <>
      <Router>
        <div
          className="h-screen bg-gradient-to-r from-teal-400 to-blue-700 
    flex justify-center content-center flex-wrap">
          <div
            className="h-full bg-gray-800 rounded-xl text-white p-4 shadow-2xl"
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
            </Switch>
          </div>
        </div>
      </Router>
    </>
  );
};
