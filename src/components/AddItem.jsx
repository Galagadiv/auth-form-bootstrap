import {useState} from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

export default function AddItem() {
	const [note, setNote] = useState({
		id: null,
		title: "",
		desc: "",
	});

	const handleSaveNote = async (e) => {
		e.preventDefault();
		try {
			const newNote = {...note, id: Date.now()};
			const response = await axios.post(
				"http://localhost:5000/submit",
				newNote
			);
			alert(response.data.message);
			console.log(`new note ${Date.now()}`);
			setNote({
				id: null,
				title: "",
				desc: "",
			});
		} catch (error) {
			alert(error.messege);
		}
	};

	return (
		<Container>
			<Form onSubmit={handleSaveNote}>
				<Form.Group controlId="noteTitleID">
					<Form.Label style={{margin: 0}}>Note title</Form.Label>
					<Form.Control
						value={note.title}
						onChange={(e) =>
							setNote((prev) => ({...prev, title: e.target.value}))
						}
						type="text"
						placeholder="Enter note title"
					/>
				</Form.Group>

				<Form.Group className="my-2" controlId="noteID">
					<Form.Label style={{margin: 0}}>Note</Form.Label>
					<Form.Control
						as="textarea"
						type="text"
						value={note.desc}
						onChange={(e) =>
							setNote((prev) => ({...prev, desc: e.target.value}))
						}
						placeholder="Enter your notes"
						style={{resize: "none"}}
						rows={4}
					></Form.Control>
				</Form.Group>
				<div className="d-grid mb-3">
					<Button variant="primary" size="lg" type="submit">
						Add new Note
					</Button>
				</div>
			</Form>
		</Container>
	);
}
