import React, { FC } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import { Home } from "./Home";
import { NowPlaying } from "./NowPlaying";
import { AudioProvider } from "../contexts/AudioContext";
import { AlbumPlaylist } from "./AlbumPlaylist";
import { ReactQueryDevtools } from "react-query-devtools";
import { ReactQueryCacheProvider, QueryCache } from "react-query";
import { PlaybackProvider } from "../contexts/PlaybackContext";
import { AuthProvider } from "../contexts/AuthContext";
import { SignIn } from "./SignIn";
import { PrivateRoute } from "../components/PrivateRoute";
import { UserSettings } from "./UserSettings";
import { FavoriteGenres } from "./FavoriteGenres";
import { TopAlbums } from "./TopAlbums";
import { FavoriteAlbums } from "./FavoriteAlbums";

const queryCache = new QueryCache({
  defaultConfig: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

export const App: FC<{}> = () => {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <AuthProvider>
        <Router>
          <div className="flex flex-wrap content-center justify-center h-screen scrolling-auto bg-gradient-to-r from-teal-400 to-blue-700">
            <div
              className="h-full p-6 overflow-y-auto text-white bg-gray-800 shadow-2xl rounded-xl"
              style={{ width: 375, maxHeight: 650 }}>
              <Switch>
                <PrivateRoute exact path="/">
                  <Home />
                </PrivateRoute>

                <Route exact path="/sign-in">
                  <SignIn />
                </Route>

                <PrivateRoute exact path="/user">
                  <UserSettings />
                </PrivateRoute>

                <PrivateRoute exact path="/favorite-genres">
                  <FavoriteGenres />
                </PrivateRoute>

                <PrivateRoute exact path="/favorite-albums">
                  <FavoriteAlbums />
                </PrivateRoute>

                <PrivateRoute exact path="/top-albums/:genreId">
                  <TopAlbums />
                </PrivateRoute>

                <PrivateRoute exact path="/album/:albumId/play/:trackId">
                  <PlaybackProvider>
                    <AudioProvider>
                      <NowPlaying />
                    </AudioProvider>
                  </PlaybackProvider>
                </PrivateRoute>

                <PrivateRoute exact path="/album/:albumId">
                  <PlaybackProvider>
                    <AlbumPlaylist />
                  </PlaybackProvider>
                </PrivateRoute>

                <Route>
                  <Redirect to="/" />
                </Route>
              </Switch>
            </div>
          </div>
        </Router>
      </AuthProvider>

      <ReactQueryDevtools />
    </ReactQueryCacheProvider>
  );
};
