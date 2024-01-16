import "./App.scss";

import { Route, Routes, useLocation } from "react-router-dom";

import { setLocationCount } from "./redux/slices/ActionSlice";
import { resizeClient } from "./redux/slices/ClientSlice";
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
	const { pathname } = useLocation();

	// On window resize, update the dimensions in global state
	useEffect(() => {
		const handleResize = () => {
			dispatch(
				resizeClient({
					height: window.innerHeight,
					width: window.innerWidth,
				}),
			);
		};

		window.addEventListener("resize", debounce(handleResize, 100));

		return () => window.removeEventListener("resize", debounce(handleResize, 100));
		// We want this to run only on mount and unmount, linter cant detect
		// this use case, so we will disable it :)
		// eslint-disable-next-line
	}, []);

	// Because router v6 does not expose history, we use this hack to track length
	useEffect(() => {
		dispatch(setLocationCount());
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
