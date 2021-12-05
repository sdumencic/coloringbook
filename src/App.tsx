import "./App.scss";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ClientTypes } from "./redux/reducers/ClientReducer";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import GamePage from "./components/GamePage/GamePage";
import GameSelectPage from "./components/GameSelectPage/GameSelectPage";
import HomePage from "./components/HomePage/HomePage";
import SettingsPage from "./components/SettingsPage/SettingsPage";
import { debounce } from "./util/misc";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const App = () => {
  const dispatch = useDispatch();

  // On window resize, update the dimensions in global state
  useEffect(() => {
    const handleResize = () => {
      dispatch({
        type: ClientTypes.Resize,
        payload: {
          height: window.innerHeight,
          width: window.innerWidth,
        },
      });
    };

    window.addEventListener("resize", debounce(handleResize, 100));

    return () =>
      window.removeEventListener("resize", debounce(handleResize, 100));
    // We want this to run only on mount and unmount, linter cant detect
    // this use case, so we will disable it :)
    // eslint-disable-next-line
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/game" element={<GameSelectPage />} />
        <Route path="/game/:id" element={<GamePage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
