import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./page/Home/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUp from "./page/SignUp/SignUp";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/sign-up" element={<SignUp />} />
				<Route path="/sign-in" element={<div>Sign In Page</div>} />
			</Routes>
		</Router>
	);
}

export default App;
