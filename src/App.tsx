import React from "react";
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

function App() {
	const location = useLocation();
	return (
		<div className="flex h-screen w-screen justify-center items-center bg-gray-200 flex-col">
			<div className="relative flex h-full w-full sm:max-w-[500px] bg-white justify-center items-center flex-col">
				<div className="relative w-full h-full">
					<Routes>
						<Route path="/calendar" element={<CalendarPage />} />
						<Route path="/chart" element={<ChartPage />} />
						<Route path="/profile" element={<ProfilePage />} />
					</Routes>
					<FloatingActionButton />
				</div>
				{location.pathname === "/chat" && <ChatPage />}
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
