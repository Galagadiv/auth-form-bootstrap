import {useState, useEffect} from "react";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import axios from "axios";

export default function ToDoList() {
	const [list, setList] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:5000/data")
			.then((response) => setList(response.data))
			.catch((error) => console.error("Error fetching data:", error));
	}, []);

	return (
		<Container>
			<ListGroup>
				{list.map((el) => (
					<ListGroup.Item
						key={el.id}
						className="d-flex justify-content-between mb-2"
					>
						<div
							style={{
								height: "100%",
								flexDirection: "column",
								justifyContent: "space-between",
								width: "90dvh",
								whiteSpace: "nowrap",
								overflow: "hidden",
								textOverflow: "ellipsis",
							}}
							className="d-flex"
						>
							<h3 style={{padding: 0, margin: 0}}>{el.title}</h3>
							<p style={{padding: 0, margin: 0}}>{el.desc}</p>
						</div>
						<ButtonGroup>
							<Button variant="warning" className="w-50 p-3 text-center">
								Edit
							</Button>
							<Button variant="danger" className="w-50 p-3 text-center">
								Del
							</Button>
						</ButtonGroup>
					</ListGroup.Item>
				))}
			</ListGroup>
		</Container>
	);
}
