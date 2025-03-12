import {useState} from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";

import AddItem from "./components/AddItem";
import ToDoList from "./components/ToDoList";

function App() {
	const [key, setKey] = useState("home");
	return (
		<main
			style={{
				padding: 20,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Container>
				<Tabs
					id="controlled-tab-example"
					activeKey={key}
					onSelect={(k) => setKey(k)}
					className="mb-3"
				>
					<Tab
						eventKey="home"
						title="Home"
						style={{
							border: "0.5px solid grey",
							padding: "10px 0",
							borderRadius: 5,
							flexGrow: 1,
						}}
					>
						<AddItem />
						<ToDoList />
					</Tab>
					<Tab eventKey="profile" title="Profile">
						Tab content for Profile
					</Tab>
					<Tab eventKey="contact" title="Contact" disabled>
						Tab content for Contact
					</Tab>
				</Tabs>
			</Container>
		</main>
	);
}

export default App;
