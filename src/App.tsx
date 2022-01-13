import "./App.scss";

import { Route, Routes, useLocation } from "react-router-dom";

import { ActionsTypes } from "./redux/reducers/ActionReducer";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import GamePage from "./components/GamePage/GamePage";
import GameSelectPage from "./components/GameSelectPage/GameSelectPage";
import HomePage from "./components/HomePage/HomePage";
import SettingsPage from "./components/SettingsPage/SettingsPage";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const App = () => {
	const { pathname } = useLocation();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({ type: ActionsTypes.LocationCount });
	}, [pathname]);

	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/settings" element={<SettingsPage />} />
			<Route path="/game" element={<GameSelectPage />} />
			<Route path="/game/:id" element={<GamePage />} />
			<Route path="*" element={<ErrorPage />} />
		</Routes>
	);
};

export default App;
