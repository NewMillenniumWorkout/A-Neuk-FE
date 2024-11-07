import React from "react";
import "./App.css";
import BottomAppBar from "./components/BottomAppBar";
import ChatPage from "./components/Chat/ChatPage";

function App() {
	return (
		<div className="flex h-screen w-screen justify-center items-center bg-gray-200 flex-col">
			<div className="flex h-full w-full sm:max-w-[500px] bg-white justify-center items-center flex-col">
				<div className="flex-grow">
					<ChatPage />
				</div>
				<BottomAppBar />
			</div>
		</div>
	);
}

export default App;
