import {
	BrowserRouter as Router,
	Route,
	Routes,
	useLocation,
} from "react-router-dom";
import "./App.css";
import BottomAppBar from "./components/BottomAppBar";
import ChatPage from "./components/Chat/ChatPage";
import FloatingActionButton from "./components/FloatingActionButton";
import CalendarPage from "./components/Calendar/CalendarPage";
import ProfilePage from "./components/Profile/ProfilePage";
import ChartPage from "./components/Chart/ChartPage";
import TopAppBar from "./components/Chat/TopAppBar";
import { useEffect, useState } from "react";
import { ChatPageProvider } from "./components/Chat/ChatPageContext";
import EmotionSelectPage from "./components/EmotionSelect/EmotionSelectPage";

function App() {
	const location = useLocation();

	useEffect(() => {
		const updateVh = () => {
			const viewportHeight =
				window.visualViewport?.height || window.innerHeight;
			document.documentElement.style.setProperty(
				"--vh",
				`${viewportHeight * 0.01}px`
			);
		};

		updateVh();

		if (window.visualViewport) {
			window.visualViewport.addEventListener("resize", updateVh);
		} else {
			window.addEventListener("resize", updateVh);
		}

		return () => {
			if (window.visualViewport) {
				window.visualViewport.removeEventListener("resize", updateVh);
			} else {
				window.removeEventListener("resize", updateVh);
			}
		};
	}, []);

	return (
		<div className="flex h-screen-dynamic w-screen justify-center items-center bg-gray-200 flex-col">
			<div className="relative flex flex-col h-screen-dynamic w-screen sm:max-w-[440px] sm:max-h-[940px] bg-white justify-center items-center">
				<div className="relative flex-grow w-full h-full">
					<Routes>
						<Route path="/calendar" element={<CalendarPage />} />
						<Route path="/chart" element={<ChartPage />} />
						<Route path="/profile" element={<ProfilePage />} />
					</Routes>
					<FloatingActionButton />
				</div>
				{location.pathname === "/chat" && (
					<ChatPageProvider>
						<ChatPage />
					</ChatPageProvider>
				)}
				{location.pathname === "/emotion-select" && (
					<EmotionSelectPage />
				)}
				<BottomAppBar />
			</div>
		</div>
	);
}

export default function WrappedApp() {
	return (
		<Router>
			<App />
		</Router>
	);
}
