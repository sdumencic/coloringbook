import "./App.scss";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import ErrorPage from "./components/ErrorPage/ErrorPage";
import GamePage from "./components/GamePage/GamePage";
import GameSelectPage from "./components/GameSelectPage/GameSelectPage";
import HomePage from "./components/HomePage/HomePage";
import SettingsPage from "./components/SettingsPage/SettingsPage";

const App = () => {
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
